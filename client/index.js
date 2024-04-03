
RND.Seed();

const root = document.getElementById("content");


// -----------------------------------------------------------------------------
function MountMenuView()
{
  m.mount(root, {
    view: function() {
      return m(MenuView);
    }
  });
}

// -----------------------------------------------------------------------------
function MountLoadingView(options)
{
  m.mount(root, {
    view: function() {
      return m(new LoadingView(options));
    }
  });
}

// -----------------------------------------------------------------------------
function MountGameView(options)
{
  m.mount(root, {
    oncreate: function(vnode) {
      _GameManager = new GameManager(options);
      _GameManager.Create();
    },

    view: function() {
      return m(new GameView(options));
    }
  });
}

let _GameManager = null;


//
// Entry Point
//

// -----------------------------------------------------------------------------
MountMenuView();



//   const menu_scene = new MenuScene();
//   Application.SceneManager.PushScene(menu_scene);
//   Application.Start(GameLoop);
// });