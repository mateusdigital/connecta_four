

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
//  File      : EndGameView.js                                                //
//  Project   : connecta-four - client                                        //
//  Date      : 2024-04-04                                                    //
//  License   : See project's COPYING.TXT for full info.                      //
//  Author    : mateus.digital <hello@mateus.digital>                         //
//  Copyright : mateus.digital - 2024                                         //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//---------------------------------------------------------------------------~//


// -----------------------------------------------------------------------------
class EndGameView
{
  // ---------------------------------------------------------------------------
  constructor()
  {
    const game_opt = GAME_MANAGER.game_options;
    const end_opt  = GAME_MANAGER.end_game_options;

    //
    this._avatar_index = game_opt.playerAvatarIndex || DEFAULT_AVATAR_INDEX;
    this._player_name  = game_opt.playerName || DEFAULT_PLAYER_NAME;
    this._end_status   = end_opt.status;
    this._end_reason   = end_opt.reason;
  }

  // ---------------------------------------------------------------------------
  view()
  {
    return <div class="centerContent">
      <div class="loadingContainer">
        <MenuPanelView iconIndex={this._avatar_index}>
          <div class="menuPanelContents">
            {/* -------------------------------------------------------------  */}
            <div class="menuPanelSectionContainer">
              <span class="menuPanelSubtitle">{this._end_status}</span>
              <span class="endGamePlayerName">{this._player_name}</span>
            </div>
            <div class="menuPanelSectionContainer">
              <span class="endGameReason">{this._end_reason}</span>
            </div>
            <div class="menuPanelSectionContainer">
              <button
                class="endGameButton"
                onclick={ ()=> { GAME_MANAGER.StartMenu(); } }
                >
                Go to Menu
              </button>
            </div>
          </div>
        </MenuPanelView>
      </div>
    </div>
  }
};
