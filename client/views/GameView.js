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
const _Portrait = {
  view: function (vnode) {
    const attrs = vnode.attrs || {};

    //
    const position    = attrs.position   || "left";
    const player_data = attrs.playerData || null;

    let stat_class = "portraitStatsContainer";
    if(position == "right") {
      stat_class += " portraitStatsContainerRight";
    }

    const stats = m("div", { class: stat_class }, [
      m("span", { class: "portraitNameKey" },  `#${player_data.playerIndex}`),
      m("span", { class: "portraitNameValue" }, `${player_data.playerName}`)
    ]);

    const img_src = GetAvatarLoadUrlWithIndex(player_data.playerAvatarIndex);
    const img = m("div", { class: "portraitImageContainer"}, [
      m("img", { src: img_src })
    ]);


    return m("div", { class: "portraitContainer" }, [
      ((position == "left") ? stats : img),
      ((position == "left") ? img : stats),
    ]);
  }
};

// -----------------------------------------------------------------------------
class GameView
{
  // ---------------------------------------------------------------------------
  view()
  {
    return m("div", {class: "mainContainer"}, [
      m("div", { id: "background", class: "background" }),
      m("div", { id: "portraitsContainer", class: "portraitsContainer" }, [
        m(_Portrait, {
          playerData: GAME_MANAGER.match_data.playerData,
          position: "left"
        }),
        m("div", { class: "vs"}, "vs"),
        m(_Portrait, {
          playerData: GAME_MANAGER.match_data.opponentData,
          position: "right"
        }),
      ]),
      m("div", { id: "canvasContainer", class: "canvasContainer" }),
    ])
  }
};
