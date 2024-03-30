//~---------------------------------------------------------------------------//
//                               *       +                                    //
//                         '                  |                               //
//                     ()    .-.,="``"=.    - o -                             //
//                           '=/_       \     |                               //
//                        *   |  '=._    |                                    //
//                             \     `=./`,        '                          //
//                          .   '=.__.=' `='      *                           //
//                 +                         +                                //
//                      O      *        '       .                             //
//                                                                            //
//  File      : GameView.js                                                   //
//  Project   : connecta-four - client                                        //
//  Date      : 2024-03-30                                                    //
//  License   : See project's COPYING.TXT for full info.                      //
//  Author    : mateus.digital <hello@mateus.digital>                         //
//  Copyright : mateus.digital - 2024                                         //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//---------------------------------------------------------------------------~//

// -----------------------------------------------------------------------------
const Portrait = {
  view: function (vnode) {
    const options = vnode.attrs || {};

    const name     = options.name     || "Unknown";
    const imageSrc = options.imageSrc || "default.png";
    const position = options.position || "left";

    let statsClass = "portraitStatsContainer";
    if(position == "right") {
      statsClass += " portraitStatsContainerRight";
    }

    const stats = m("div", { class: statsClass }, [
      m("span", { class: "portraitNameKey" }, "#1"),
      m("span", { class: "portraitNameValue" }, "Mateus Mesquita")
    ]);

    const img = m("div", { class: "portraitImageContainer"}, [
      m("img", { src: "assets/characters/characters_0001.png" })
    ]);

    return m("div", { class: "portraitContainer" }, [
      ((position == "left") ? stats : img),
      ((position == "left") ? img : stats),
    ]);
  }
};

// -----------------------------------------------------------------------------
const GameView = {
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
};
