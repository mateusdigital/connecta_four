
RND.Seed();

const root = document.getElementById("content");
m.mount(root, {
  view: function() {
    return m(MenuView);
  }
});


// // -----------------------------------------------------------------------------
// const CanvasContainer    = document.getElementById("canvasContainer");
// const PortraitsContainer = document.getElementById("portraitsContainer");

// const potraits_container_height = PortraitsContainer.clientHeight;
// const window_height             = window.innerHeight;

// const computed_style = window.getComputedStyle(CanvasContainer);

// const _top    = parseFloat(computed_style.paddingTop);
// const _right  = parseFloat(computed_style.paddingRight);
// const _bottom = parseFloat(computed_style.paddingBottom);
// const _left   = parseFloat(computed_style.paddingLeft);

// const canvas_desired_height = window_height - potraits_container_height - _top -_bottom;

// const ApplicationOptions = {
//   canvasContainer: canvasContainer,
//   background: "#e4f2f8",
//   // backgroundAlpha: 0,
//   // resizeTo: window
//   width:  DESIGN_WIDTH,
//   height: canvas_desired_height
// };

// // -----------------------------------------------------------------------------
// function GameLoop()
// {
//   // Empty...
// }

// //
// // Entry Point
// //

// // -----------------------------------------------------------------------------
// document.addEventListener("DOMContentLoaded", async () => {
//   await Application.Create(ApplicationOptions);
//   await RES.LoadResources(TEXTURES_TO_LOAD);

//   const socket = io("ws://localhost:5000");
//   socket.on("connect", ()=> {
//     console.log("connected");
//   });

//   socket.on(NET.Messages.MatchStarted.MSG_NAME, (data)=>{
//     gMatch = new Match(data);

//     const game_scene = new GameScene(data, socket)
//     Application.SceneManager.PushScene(game_scene);
//   })



//   const menu_scene = new MenuScene();
//   Application.SceneManager.PushScene(menu_scene);
//   Application.Start(GameLoop);
// });