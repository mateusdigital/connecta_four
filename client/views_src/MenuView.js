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
//  Date      : 2024-03-30                                                    //
//  License   : See project's COPYING.TXT for full info.                      //
//  Author    : mateus.digital <hello@mateus.digital>                         //
//  Copyright : mateus.digital - 2024                                         //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//---------------------------------------------------------------------------~//


// -----------------------------------------------------------------------------
class _ModeType
{
  view(vnode) {
    const options  = vnode.attrs    || {};
    const children = vnode.children || {}

    const selector = (options.modeIndex == options.selectedModeIndex)
      ?  "modeSelectionSelected"
      :  "modeSelectionNormal";

    return <span class={selector} onclick={options.onclick}>{children}</span>
  }
};


// -----------------------------------------------------------------------------
class _LogoView
{
  // ---------------------------------------------------------------------------
  view()
  {
    return <div class="logoContainer">
      <img src="assets/ui_assets/logo.png"></img>
    </div>
  }
};

// -----------------------------------------------------------------------------
const MoreContentView_iconIndex = RND.Int(AVATAR_INDEX_MIN, AVATAR_INDEX_MAX);

class _MoreContentView
{
  view()
  {
    return <div class="moreContentContainer">
      <MenuPanelView iconIndex={MoreContentView_iconIndex}></MenuPanelView>
    </div>
  }
};

// -----------------------------------------------------------------------------
class _GameOptionsView
{
  // ---------------------------------------------------------------------------
  _OnPlayClicked()
  {
    GAME_MANAGER.EndMenu();
  }

  // ---------------------------------------------------------------------------
  view()
  {
    const on_change_callback = (event)=> {
      GAME_MANAGER.game_options.playerName = event.target.value;
    }

    return <div class="gameOptionsContainer">
      <MenuPanelView iconIndex={GAME_MANAGER.game_options.playerAvatarIndex}>
        <div class="menuPanelContents">
          {/* -------------------------------------------------------------  */}
          <div class="menuPanelSectionContainer">
            <span class="menuPanelSubtitle">Your Name</span>
            <input placeholder={DEFAULT_PLAYER_NAME}
                   value={GAME_MANAGER.game_options.playerName}
                   onchange={on_change_callback}>
            </input>
          </div>

          {/* -------------------------------------------------------------  */}
          <div class="menuPanelSectionContainer">
            <span class="menuPanelSubtitle">Your Avatar</span>
            <div class="avatarSelectionContainer">
              <AvatarIcon
                iconIndex="1"
                selectedIndex={GAME_MANAGER.game_options.playerAvatarIndex}
                onclick={()=>{ GAME_MANAGER.game_options.playerAvatarIndex = 1; }} >
              </AvatarIcon>

              <AvatarIcon
                iconIndex="2"
                selectedIndex={GAME_MANAGER.game_options.playerAvatarIndex}
                onclick={()=>{ GAME_MANAGER.game_options.playerAvatarIndex = 2; }} >
              </AvatarIcon>

              <AvatarIcon
                iconIndex="3"
                selectedIndex={GAME_MANAGER.game_options.playerAvatarIndex}
                onclick={()=>{ GAME_MANAGER.game_options.playerAvatarIndex = 3; }} >
              </AvatarIcon>

              <AvatarIcon
                iconIndex="4"
                selectedIndex={GAME_MANAGER.game_options.playerAvatarIndex}
                onclick={()=>{ GAME_MANAGER.game_options.playerAvatarIndex = 4; }} >
              </AvatarIcon>

              <AvatarIcon
                iconIndex="5"
                selectedIndex={GAME_MANAGER.game_options.playerAvatarIndex}
                onclick={()=>{ GAME_MANAGER.game_options.playerAvatarIndex = 5; }} >
              </AvatarIcon>

              <AvatarIcon
                iconIndex="6"
                selectedIndex={GAME_MANAGER.game_options.playerAvatarIndex}
                onclick={()=>{ GAME_MANAGER.game_options.playerAvatarIndex = 6; }} >
              </AvatarIcon>

              <AvatarIcon
                iconIndex="7"
                selectedIndex={GAME_MANAGER.game_options.playerAvatarIndex}
                onclick={()=>{ GAME_MANAGER.game_options.playerAvatarIndex = 7; }} >
              </AvatarIcon>
            </div>
          </div>

          {/* -------------------------------------------------------------  */}
          <div class="menuPanelSectionContainer">
            <span class="menuPanelSubtitle">Your Avatar</span>
            <div class="modeSelectionContainer">
              <_ModeType
                modeIndex="0"
                selectedModeIndex={ GAME_MANAGER.game_options.gameModeIndex }
                onclick={ ()=>{ GAME_MANAGER.game_options.gameModeIndex = 0; } }>
                  {GAME_MODE_STRS[0]}
              </_ModeType>

              <_ModeType
                modeIndex="1"
                selectedModeIndex={ GAME_MANAGER.game_options.gameModeIndex }
                onclick={ ()=>{ GAME_MANAGER.game_options.gameModeIndex = 1; } }>
                  {GAME_MODE_STRS[1]}
              </_ModeType>

              <_ModeType
                modeIndex="2"
                selectedModeIndex={ GAME_MANAGER.game_options.gameModeIndex }
                onclick={ ()=>{ GAME_MANAGER.game_options.gameModeIndex = 2; } }>
                  {GAME_MODE_STRS[2]}
              </_ModeType>
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          <div class="menuPanelSectionContainer">
            <button class="playButton"
                    onclick={ ()=>{ this._OnPlayClicked(); } }>
              Play
            </button>
          </div>
        </div>
      </MenuPanelView>
    </div>
  }
};

// -----------------------------------------------------------------------------
class MenuView
{
  // ---------------------------------------------------------------------------
  view()
  {
    return <div class="menuGridContainer">
      <div class="menuGridContainer">
        <_LogoView></_LogoView>
        {/* <_MoreContentView></_MoreContentView> */}
        <_GameOptionsView></_GameOptionsView>
      </div>
    </div>
  }
};