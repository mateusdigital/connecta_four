
let socket = null;

// -----------------------------------------------------------------------------
const CanvasContainer = document.getElementById("canvasContainer");
const ApplicationOptions = {
  canvasContainer: canvasContainer,
  background: "#FFFFFF",
  // backgroundAlpha: 0,
  // resizeTo: window
  width: DESIGN_WIDTH,
  height: DESIGN_HEIGHT
};

// -----------------------------------------------------------------------------
function GameLoop()
{
}



document.addEventListener("DOMContentLoaded", async () => {
  await Application.Create(ApplicationOptions);
  await RES.LoadResources(TEXTURES_TO_LOAD);
  RND.Seed();

  const socket = io("ws://localhost:5000");
  socket.on("connect", ()=>{
    console.log("connected");
  });

  socket.on("match-start", (data)=>{
    gMatch = new Match(data);

    const game_scene = new GameScene(data, socket)
    Application.SceneManager.PushScene(game_scene);
  })



  const menu_scene = new MenuScene();
  Application.SceneManager.PushScene(menu_scene);
  Application.Start(GameLoop);


});