
const socket = io("ws://localhost:5000");
socket.on("connect", ()=>{
  console.log("connected");
});


// -----------------------------------------------------------------------------
const CanvasContainer = document.getElementById("canvasContainer");
const ApplicationOptions = {
  canvasContainer: canvasContainer,
  background: '#FF00FF',
  resizeTo: window
};

// -----------------------------------------------------------------------------
function GameLoop()
{
}



document.addEventListener("DOMContentLoaded", async () => {
  await Application.Create(ApplicationOptions);
  await RES.LoadResources(TEXTURES_TO_LOAD);
  RND.Seed();

  Application.SceneManager.PushScene(new GameScene());
  Application.Start(GameLoop);

  // PixiApp.stage.addChild(sprite);
});