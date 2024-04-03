

class GameManager
{
  // ---------------------------------------------------------------------------
  static _Loaded = false;

  // ---------------------------------------------------------------------------
  async Create()
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
    if(!GameManager._Loaded) {
      await RES.LoadResources(TEXTURES_TO_LOAD);
      GameManager._Loaded = true;
    }

    this._CreateSockets();
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
  _CreateSockets()
  {
    const conn_str = NET.ClientConnectionString();
    this._socket = io(conn_str);

    this._socket.on(NET.Messages.Connected.MSG_NAME, ()=>{
      console.log("connected");
    });

    this._socket.on(NET.Messages.MatchStarted.MSG_NAME, (data)=>{
      const game_scene = new GameScene(data, this._socket);
      Application.SceneManager.PushScene(game_scene);
    });
  }
}
