
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
//  File      : LoadingView.js                                                //
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
    this._avatar_img_src = GetAvatarLoadUrlWithIndex(opt.playerAvatarIndex || DEFAULT_AVATAR_INDEX);
    this._player_name    = opt.playerName || DEFAULT_PLAYER_NAME;
    this._game_mode      = GAME_MODE_STRS[opt.gameAvatarIndex || DEFAULT_GAME_MODE_INDEX];
  }

  // ---------------------------------------------------------------------------
  view()
  {
    return <div class="centerContent">
      <div class="loadingContainer">
        <MenuPanelView iconIndex={GAME_MANAGER.game_options.playerAvatarIndex}>
          <div class="menuPanelContents">
            {/* -------------------------------------------------------------  */}
            <div class="menuPanelSectionContainer">
              <span class="menuPanelSubtitle">Name</span>
              <span class="loadingPlayerName">{this._player_name}</span>
            </div>
            <div class="menuPanelSectionContainer">
              <span class="menuPanelSubtitle">Game Mode</span>
              <span class="loadingGameMode">{this._game_mode}</span>
            </div>
            <div class="menuPanelSectionContainer">
              <span class="loadingState">Loading...</span>
            </div>
          </div>
        </MenuPanelView>
      </div>
    </div>
  }
};
