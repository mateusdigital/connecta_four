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
const MenuView = {
  view: function () {
    return m("div", {class: "mainContainer"}, [
      m("div", { id: "background", class: "background" }),

      m("div", { id: "menuGridContainer", class: "menuGridContainer" }, [
        m("div", { id: "menuGrid", class: "menuGrid" }, [
          m("div", { id: "logoContainer", class: "logoContainer"}, [
            m("img", { src:"assets/ui_assets/logo.png"})
          ]),

          m("div", { id: "moreContentContainer", class: "moreContentContainer"}, [
            m("img", { src:"assets/ui_assets/logo.png"})
          ]),

          m("div", { id: "gameOptionsContainer", class: "gameOptionsContainer"}, [
            m("div", {class: "menuPanel"}, [
              m("div", "your name"),
              m("input"),
              m("div", "your avatar"),
              m("div", {class: "menuAvatarSelection"}, [
                m("img", { src: ASSETS_CHARACTERS_CHARACTERS_0001}),
                m("img", { src: ASSETS_CHARACTERS_CHARACTERS_0002}),
                m("img", { src: ASSETS_CHARACTERS_CHARACTERS_0003}),
                m("img", { src: ASSETS_CHARACTERS_CHARACTERS_0004}),
                m("img", { src: ASSETS_CHARACTERS_CHARACTERS_0005}),
                m("img", { src: ASSETS_CHARACTERS_CHARACTERS_0006}),
                m("img", { src: ASSETS_CHARACTERS_CHARACTERS_0007}),
              ]),
              m("div", "game mode"),

              m("div", "play"),
            ])
          ])
        ]),
      ])
    ])
  }
};
