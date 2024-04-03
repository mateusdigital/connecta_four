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
const _AvatarIcon = {
  view: function (vnode) {
    const options = vnode.attrs || {};

    const iconIndex     = options.iconIndex;
    const selectedIndex = options.selectedIndex;

    const onclick = options.onclick

    const selected_selector = (iconIndex == selectedIndex)
      ? "avatarIconSelected"
      : "avatarIconNormal";

    return m("img", {
      src: `assets/characters/characters_000${iconIndex}.png`,
      class: selected_selector,
      onclick: onclick
    });
  }
};

// -----------------------------------------------------------------------------
const _ModeType = {
  view: function (vnode) {
    const options = vnode.attrs || {};

    const modeIndex     = options.modeIndex;
    const selectedIndex = options.selectedMode;

    const onclick = options.onclick;

    const selected_selector = (modeIndex == selectedIndex)
      ?  "modeSelectionSelected"
      :  "modeSelectionNormal";

    return m("span",
      {
        class: selected_selector,
        onclick: onclick
      },
      vnode.children
    );
  }
};

// -----------------------------------------------------------------------------
const _MenuPanelView = {
  view: function (vnode) {
    const options = vnode.attrs || {};
    const iconIndex = options.iconIndex;

    return m("div", { "class": "menuPanel" }, [
      m("div", { "class": "menuPanelIconContainer" },
        m(_AvatarIcon, { iconIndex: iconIndex })
      ),
      m("div", { "class": "menuPanelCharmContainer" },
        m("img", { "src": "assets/ui_assets/popup_header.png" })
      ),
      vnode.children
    ]);
  }
};

// -----------------------------------------------------------------------------
const _LogoView = {
  view: function () {
    return m("div", { "class": "logoContainer" },
      m("img", { "src": "assets/ui_assets/logo.png" })
    );
  }
};

// -----------------------------------------------------------------------------
const MoreContentView_iconIndex = RND.Int(1, 7)
const _MoreContentView = {
  view: function () {
    const iconIndex = MoreContentView_iconIndex;

    return m("div", { "class": "moreContentContainer" },
      m(_MenuPanelView, { iconIndex: iconIndex })
    );
  }
};

// -----------------------------------------------------------------------------
class _GameOptionsView
{
  // ---------------------------------------------------------------------------
  constructor()
  {
    this.iconIndex = 1;
    this.modeIndex = 1;
  }

  // ---------------------------------------------------------------------------
  _OnPlayClicked()
  {
    MountLoadingView({
      playerName:        this.playerName,
      playerAvatarIndex: this.iconIndex,
      gameModeIndex:     this.modeIndex
    });
  }

  // ---------------------------------------------------------------------------
  view()
  {
    return m("div", { "class": "gameOptionsContainer" },
      m(_MenuPanelView, { iconIndex: this.iconIndex },
        m("div", { "class": "menuPanelContents" }, [

          // -------------------------------------------------------------------
          m("div", { "class": "menuPanelSectionContainer" }, [
            m("span", { "class": "menuPanelSubtitle" }, "Your Name"),
            m("input", { placeholder: DEFAULT_PLAYER_NAME, value: this.playerName })
          ]),

          // -------------------------------------------------------------------
          m("div", { "class": "menuPanelSectionContainer" }, [
            m("span", { "class": "menuPanelSubtitle" }, "Your Avatar"),
            m("div", { "class": "avatarSelectionContainer" }, [
              m(_AvatarIcon, { iconIndex: 1, selectedIndex: this.iconIndex, onclick: ()=>{ this.iconIndex = 1; }, }),
              m(_AvatarIcon, { iconIndex: 2, selectedIndex: this.iconIndex, onclick: ()=>{ this.iconIndex = 2; }, }),
              m(_AvatarIcon, { iconIndex: 3, selectedIndex: this.iconIndex, onclick: ()=>{ this.iconIndex = 3; }, }),
              m(_AvatarIcon, { iconIndex: 4, selectedIndex: this.iconIndex, onclick: ()=>{ this.iconIndex = 4; }, }),
              m(_AvatarIcon, { iconIndex: 5, selectedIndex: this.iconIndex, onclick: ()=>{ this.iconIndex = 5; }, }),
              m(_AvatarIcon, { iconIndex: 6, selectedIndex: this.iconIndex, onclick: ()=>{ this.iconIndex = 6; }, }),
              m(_AvatarIcon, { iconIndex: 7, selectedIndex: this.iconIndex, onclick: ()=>{ this.iconIndex = 7; }, }),
            ])
          ]),

          // -------------------------------------------------------------------
          m("div", { "class": "menuPanelSectionContainer" }, [
            m("span", { "class": "menuPanelSubtitle" }, "Game Mode"),
            m("div", { "class": "modeSelectionContainer" }, [
              m(_ModeType, { modeIndex: 0, selectedMode: this.modeIndex, onclick: ()=>{ this.modeIndex = 0; } }, GAME_MODE_STRS[0]),
              m(_ModeType, { modeIndex: 1, selectedMode: this.modeIndex, onclick: ()=>{ this.modeIndex = 1; } }, GAME_MODE_STRS[1]),
              m(_ModeType, { modeIndex: 2, selectedMode: this.modeIndex, onclick: ()=>{ this.modeIndex = 2; } }, GAME_MODE_STRS[2]),
            ])
          ]),

          // -------------------------------------------------------------------
          m("div", { "class": "menuPanelSectionContainer" },
            m("button", { "class": "playButton", onclick: ()=>{ this._OnPlayClicked(); } }, "Play")
          ),
        ])
      )
    );
  }
};

// -----------------------------------------------------------------------------
const MenuView =
{
  view: function ()
  {
    return m("div", { "class": "menuGridContainer" },
      m("div", { "class": "menuGrid" }, [
        m(_LogoView),
        m(_MoreContentView),
        m(_GameOptionsView)
      ])
    );
  }
};
