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
const AvatarIcon = {
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
}

// -----------------------------------------------------------------------------
const MenuPanelView = {
  view: function (vnode) {
    const options = vnode.attrs || {};
    const iconIndex = options.iconIndex;

    return m("div", { "class": "menuPanel" }, [
      m("div", { "class": "menuPanelIconContainer" },
        m(AvatarIcon, { iconIndex: iconIndex })
      ),
      m("div", { "class": "menuPanelCharmContainer" },
        m("img", { "src": "assets/ui_assets/popup_header.png" })
      ),
      vnode.children
    ]);
  }
};

// -----------------------------------------------------------------------------
const LogoView = {
  view: function () {
    return m("div", { "class": "logoContainer" },
      m("img", { "src": "assets/ui_assets/logo.png" })
    );
  }
};

// -----------------------------------------------------------------------------
RND.Seed();
const MoreContentView_iconIndex = RND.Int(1, 7)
const MoreContentView = {
  view: function () {
    const iconIndex = MoreContentView_iconIndex;

    return m("div", { "class": "moreContentContainer" },
      m(MenuPanelView, { iconIndex: iconIndex })
    );
  }
};

// -----------------------------------------------------------------------------
class GameOptionsView {
  constructor() {
    this.iconIndex = 1;
  }

  view() {
    return m("div", { "class": "gameOptionsContainer" },
      m(MenuPanelView, { iconIndex: this.iconIndex },
        m("div", { "class": "menuPanelContents" }, [

          // -------------------------------------------------------------------
          m("div", { "class": "menuPanelSectionContainer" }, [
            m("span", { "class": "menuPanelSubtitle" }, "your name"),
            m("input")
          ]),

          // -------------------------------------------------------------------
          m("div", { "class": "menuPanelSectionContainer" }, [
            m("span", { "class": "menuPanelSubtitle" }, "your avatar"),
            m("div", { "class": "avatarSelectionContainer" }, [
              m(AvatarIcon, { iconIndex: 1, selectedIndex: this.iconIndex, onclick: ()=>{ this.iconIndex = 1; }, }),
              m(AvatarIcon, { iconIndex: 2, selectedIndex: this.iconIndex, onclick: ()=>{ this.iconIndex = 2; }, }),
              m(AvatarIcon, { iconIndex: 3, selectedIndex: this.iconIndex, onclick: ()=>{ this.iconIndex = 3; }, }),
              m(AvatarIcon, { iconIndex: 4, selectedIndex: this.iconIndex, onclick: ()=>{ this.iconIndex = 4; }, }),
              m(AvatarIcon, { iconIndex: 5, selectedIndex: this.iconIndex, onclick: ()=>{ this.iconIndex = 5; }, }),
              m(AvatarIcon, { iconIndex: 6, selectedIndex: this.iconIndex, onclick: ()=>{ this.iconIndex = 6; }, }),
              m(AvatarIcon, { iconIndex: 7, selectedIndex: this.iconIndex, onclick: ()=>{ this.iconIndex = 7; }, }),
            ])
          ]),

          // -------------------------------------------------------------------
          m("div", { "class": "menuPanelSectionContainer" }, [
            m("span", { "class": "menuPanelSubtitle" }, "game mode"),
            m("div", { "class": "modeSelectionContainer" }, [
              m("span", "multiplayer online"),
              m("span", "against computer"),
              m("span", "invite a friend")
            ])
          ]),

          // -------------------------------------------------------------------
          m("div", { "class": "menuPanelSectionContainer" },
            m("button", { "class": "playButton" }, "Play")
          ),
        ])
      )
    );
  }
};

// -----------------------------------------------------------------------------
const MenuView = {
  view: function () {
    return m("div", { "class": "menuGridContainer" },
      m("div", { "class": "menuGrid" }, [
        m(LogoView),
        m(MoreContentView),
        m(GameOptionsView)
      ])
    );
  }
};
