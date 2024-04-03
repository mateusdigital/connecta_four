class GameManager
{
  // ---------------------------------------------------------------------------
  Create()
  {
    this._resources_loaded = false;

    this._root_element = document.getElementById("content");

    this.game_options = {
      player_name:         DEFAULT_PLAYER_NAME,
      player_avatar_index: DEFAULT_AVATAR_INDEX,
      game_mode_index:     DEFAULT_GAME_MODE_INDEX
    }

    this._socket    = null;
    this.match_data = null;
  }

  //
  // Menu Methods
  //

  // ---------------------------------------------------------------------------
  StartMenu()
  {
    m.mount(this._root_element, {
      view: function() {
        return m(new MenuView());
      }
    });;
  }

  // ---------------------------------------------------------------------------
  EndMenu()
  {
    this.StartLoading();
  }

  //
  // Loading Methods
  //

  // -----------------------------------------------------------------------------
  async StartLoading()
  {
    m.mount(this._root_element, {
      oncreate: (vnode) => {
        // Load Resources
        this._game_is_ready_promise = new Promise((resolve, reject) => {

          if(!this._resources_loaded) {
            Debug.Log("Loading resources");

            RES.LoadResourcesWithCallback(
              ()=> {
                Debug.Log("Resources Loaded");
                this._resources_loaded = true;

                if(this.match_data) {
                  Debug.Log("Match data also loaded - resoving");
                  resolve();
                }
              },
              TEXTURES_TO_LOAD
            );
          }

          this._CreateSockets(resolve, reject);
        }).then(()=>{
          this.StartGame();
        })
      },

      view: function() {
        return m(new LoadingView());
      }
    });
  }

  //
  // Game Methods
  //

  // ---------------------------------------------------------------------------
  StartGame()
  {
    const player_avatar_index   = this.match_data.playerData.playerAvatarIndex;
    let   opponent_avatar_index = this.match_data.opponentData.playerAvatarIndex;

    while(player_avatar_index == opponent_avatar_index) {
       opponent_avatar_index = Clamp(
        player_avatar_index + RND.Int(AVATAR_INDEX_MIN, AVATAR_INDEX_MAX),
        AVATAR_INDEX_MIN,
        AVATAR_INDEX_MAX
      );
      this.match_data.opponentData.playerAvatarIndex = opponent_avatar_index;
    }

    m.mount(this._root_element, {
      oncreate: (vnode)=>{
        this._OnMatchStarted();
      },

      view: function() {
        return m(new GameView());
      }
    });
  }

  //
  // Helper Methods
  //
  // ---------------------------------------------------------------------------
  async _OnMatchStarted()
  {
      this._canvasContainer    = document.getElementById("canvasContainer");
      this._portraitsContainer = document.getElementById("portraitsContainer");

      const app_options = {
        canvasContainer: canvasContainer,
        background: "#e4f2f8",
        width:  DESIGN_WIDTH,
        height: this._CalculateCanvasSize()
      };

      await Application.Create(app_options);

      Debug.Log("Match Data", this.match_data);
      const game_scene = new GameScene(this.match_data, this._socket);
      Application.SceneManager.PushScene(game_scene);
  }

  // ---------------------------------------------------------------------------
  _CalculateCanvasSize()
  {
    const potraits_container_height = this._portraitsContainer.clientHeight;
    const window_height             = window.innerHeight;

    const computed_style = window.getComputedStyle(this._canvasContainer);

    const _top    = parseFloat(computed_style.paddingTop);
    const _right  = parseFloat(computed_style.paddingRight);
    const _bottom = parseFloat(computed_style.paddingBottom);
    const _left   = parseFloat(computed_style.paddingLeft);

    const canvas_desired_height = window_height - potraits_container_height - _top -_bottom;
    return canvas_desired_height;
  }

  // ---------------------------------------------------------------------------
  _CreateSockets(resolve, reject)
  {
    Debug.Log("Creating sockets");

    // Create the sockets.
    const conn_str = NET.ClientConnectionString();
    this._socket = io(conn_str);

    // Add the listeners.
    // Connected
    this._socket.on(NET.Messages.Connected.MSG_NAME, ()=>{
      Debug.Log("Socket connected");
    });

    // Match Start
    this._socket.on(NET.Messages.MatchStarted.MSG_NAME, (data)=>{
      Debug.Log("Match Started received");
      this.match_data = data;
      if(this._resources_loaded) {
        Debug.Log("Resources also loaded - resolving...");
        resolve();
      }
    });

    // Other Player Disconnect
    this._socket.on(NET.Messages.OtherPlayerDisconnected.MSG_NAME, ()=>{
      Debug.Log("Other player disconnected");
      this._CleanUp();
      this.StartMenu();
    })

    // Emit that we joined
    NET.SendMessage(
      this._socket,
      new NET.Messages.PlayerJoin(
        this.game_options.player_avatar_index,
        this.game_options.player_name,
        this.game_options.game_mode_index
      ),
    );
  }


  // ---------------------------------------------------------------------------
  _CleanUp()
  {
    this._socket    = null;
    this.match_data = null;
  }
}

// -----------------------------------------------------------------------------
const GAME_MANAGER = new GameManager();
