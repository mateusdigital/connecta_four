
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
  constructor()
  {
    const opt = GAME_MANAGER.game_options;

    //
    this._avatar_img_src = GetAvatarLoadUrlWithIndex(opt.player_avatar_index || DEFAULT_AVATAR_INDEX);
    this._player_name    = opt.player_name || DEFAULT_PLAYER_NAME;
    this._game_mode      = GAME_MODE_STRS[opt.game_mode_index || DEFAULT_GAME_MODE_INDEX];
  }

  // ---------------------------------------------------------------------------
  view()
  {
    return m("div", { "class": "loadingContainer" },
      m("div", { "class": "loadingContentContainer" },
        [
          // -------------------------------------------------------------------
          m("div", { "class": "portraitImageContainer" },
            m("img", { "src": this._avatar_img_src })
          ),

          // -------------------------------------------------------------------
          m("div", { "class": "loadingStatsContainer" },
            [
              m("div", { "class": "loadingPlayerStatsContainer" },
                [
                  m("span", { "class": "loadingPlayerName" }, this._player_name),
                  m("span", { "class": "loadingPlayerMode" }, this._game_mode),
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
