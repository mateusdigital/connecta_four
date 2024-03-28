
const socket = io("ws://localhost:5000");
socket.on("connect", ()=>{
  console.log("connected");
});


// -----------------------------------------------------------------------------
let CanvasContainer = null;
let PixiApp = null;
const CharacterSpritesNames = [];


// -----------------------------------------------------------------------------
async function _InitPixi() {
    PixiApp = new PIXI.Application();
    await PixiApp.init({ background: '#FF00FF', resizeTo: window });

    CanvasContainer = document.getElementById("canvasContainer");
    CanvasContainer.appendChild(PixiApp.canvas);
}


function gameLoop()
{
  Context.clearRect(0, 0, GameCanvas.width, GameCanvas.height);

  Context.drawImage(CharacterSpritesNames[0], 0, 0);
  document.requestAnimationFrame(gameLoop);
}



document.addEventListener("DOMContentLoaded", async () => {
  await _InitPixi();
  await RES_LoadResources(TEXTURES_TO_LOAD);

  let sprite = Sprite_Create(ASSETS_CHARACTERS_CHARACTERS_0001);
  PixiApp.stage.addChild(sprite);
});