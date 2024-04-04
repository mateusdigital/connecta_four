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
class _Portrait
{
  view(vnode)
  {
    const attrs = vnode.attrs || {};
    const player_data = attrs.playerData;
    const position    = attrs.position;

    //
    const stats = m("div",  [
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
    return <div class="gameContainer">
      <div id="portraitsContainer" class="portraitsContainer">
        <_Portrait
          class="portraitStatsContainer"
          playerData={ GAME_MANAGER.match_data.playerData }
          position="left"
          >
        </_Portrait>

        <div class="vs">vs</div>

        <_Portrait
          class="portraitStatsContainer portraitStatsContainerRight"
          playerData={ GAME_MANAGER.match_data.opponentData }
          position="right"
          >
        </_Portrait>
      </div>

      <div id="canvasContainer" class="canvasContainer"> </div>
    </div>
  }
};
