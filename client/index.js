
const root = document.getElementById("content");

var Portrait = {
  view: function (vnode) {
    var options = vnode.attrs || {};

    var name     = options.name || "Unknown";
    var imageSrc = options.imageSrc || "default.png";
    var position = options.position || "left";

    var statsClass = "portraitStatsContainer";
    if(position == "right") {
      statsClass += " portraitStatsContainerRight";
    }

    var stats = m("div", { class: statsClass }, [
      m("span", { class: "portraitNameKey" }, "#1"),
      m("span", { class: "portraitNameValue" }, "Mateus Mesquita")
    ]);

    var img = m("div", { class: "portraitImageContainer"}, [
      m("img", { src: "assets/characters/characters_0001.png" })
    ]);

    return m("div", { class: "portraitContainer" }, [
      ((position == "left") ? stats : img),
      ((position == "left") ? img : stats),
    ]);
  }
}

m.mount(root, {
  view: function () {
    return m("div", {class: "mainContainer"}, [
      m("div", { id: "background", class: "background" }),
      m("div", { id: "portraitsContainer", class: "portraitsContainer" }, [
        m(Portrait, { position: "left" }),
        m("div", { class: "vs"}, "vs"),
        m(Portrait, { position: "right"}),
      ]),
      m("div", { id: "canvasContainer", class: "canvasContainer" }),
    ])
  }
})


// -----------------------------------------------------------------------------
const CanvasContainer    = document.getElementById("canvasContainer");
const PortraitsContainer = document.getElementById("portraitsContainer");

const potraits_container_height = PortraitsContainer.clientHeight;
const window_height             = window.innerHeight;

const computed_style = window.getComputedStyle(CanvasContainer);

const _top    = parseFloat(computed_style.paddingTop);
const _right  = parseFloat(computed_style.paddingRight);
const _bottom = parseFloat(computed_style.paddingBottom);
const _left   = parseFloat(computed_style.paddingLeft);

const canvas_desired_height = window_height - potraits_container_height - _top -_bottom;

const ApplicationOptions = {
  canvasContainer: canvasContainer,
  background: "#e4f2f8",
  // backgroundAlpha: 0,
  // resizeTo: window
  width:  DESIGN_WIDTH,
  height: canvas_desired_height
};

// -----------------------------------------------------------------------------
function GameLoop()
{
  // Empty...
}

//
// Entry Point
//

// -----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", async () => {
  await Application.Create(ApplicationOptions);
  await RES.LoadResources(TEXTURES_TO_LOAD);

  const socket = io("ws://localhost:5000");
  socket.on("connect", ()=> {
    console.log("connected");
  });

  socket.on(NET.Messages.MatchStarted.MSG_NAME, (data)=>{
    gMatch = new Match(data);

    const game_scene = new GameScene(data, socket)
    Application.SceneManager.PushScene(game_scene);
  })



  const menu_scene = new MenuScene();
  Application.SceneManager.PushScene(menu_scene);
  Application.Start(GameLoop);


});