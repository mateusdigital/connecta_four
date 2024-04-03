
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
//  File      : MenuView.js                                                   //
//  Project   : connecta-four - client                                        //
//  Date      : 2024-04-02                                                    //
//  License   : See project's COPYING.TXT for full info.                      //
//  Author    : mateus.digital <hello@mateus.digital>                         //
//  Copyright : mateus.digital - 2024                                         //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//---------------------------------------------------------------------------~//


// -----------------------------------------------------------------------------
class LoadingView
{
  // ---------------------------------------------------------------------------
  constructor(options)
  {
    this.options = options;
    console.log(this.options);
    //
    const image_index = options.playerAvatarIndex;
    this._avatarImgSrc = `assets/characters/characters_000${image_index}.png`;
    //
    this._playerName = options.playerName || DEFAULT_PLAYER_NAME;
    //
    this._gameMode = GAME_MODE_STRS[options.gameModeIndex];
  }

  // ---------------------------------------------------------------------------
  view() {
    return m("div", { "class": "loadingContainer" },
      m("div", { "class": "loadingContentContainer" },
        [
          // -------------------------------------------------------------------
          m("div", { "class": "portraitImageContainer" },
            m("img", { "src": this._avatarImgSrc })
          ),

          // -------------------------------------------------------------------
          m("div", { "class": "loadingStatsContainer" },
            [
              m("div", { "class": "loadingPlayerStatsContainer" },
                [
                  m("span", { "class": "loadingPlayerName" }, this._playerName),
                  m("span", { "class": "loadingPlayerMode" }, this._gameMode),
                ]
              ),

              m("div", { "class": "loadingStateContainer" },
                m("span", { "class": "loadingState" },
                  "Loading..."
                )
              )
            ]
          )
        ]
      )
    )
  }
};
