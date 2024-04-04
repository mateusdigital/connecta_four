"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
var _ModeType = /*#__PURE__*/function () {
  function _ModeType() {
    _classCallCheck(this, _ModeType);
  }
  return _createClass(_ModeType, [{
    key: "view",
    value: function view(vnode) {
      var options = vnode.attrs || {};
      var children = vnode.children || {};
      var selector = options.modeIndex == options.selectedModeIndex ? "modeSelectionSelected" : "modeSelectionNormal";
      return m("span", {
        "class": selector,
        onclick: options.onclick
      }, children);
    }
  }]);
}();
;

// -----------------------------------------------------------------------------
var _LogoView = /*#__PURE__*/function () {
  function _LogoView() {
    _classCallCheck(this, _LogoView);
  }
  return _createClass(_LogoView, [{
    key: "view",
    value:
    // ---------------------------------------------------------------------------
    function view() {
      return m("div", {
        "class": "logoContainer"
      }, m("img", {
        src: "assets/ui_assets/logo.png"
      }));
    }
  }]);
}();
;

// -----------------------------------------------------------------------------
var MoreContentView_iconIndex = RND.Int(AVATAR_INDEX_MIN, AVATAR_INDEX_MAX);
var _MoreContentView = /*#__PURE__*/function () {
  function _MoreContentView() {
    _classCallCheck(this, _MoreContentView);
  }
  return _createClass(_MoreContentView, [{
    key: "view",
    value: function view() {
      return m("div", {
        "class": "moreContentContainer"
      }, m(MenuPanelView, {
        iconIndex: MoreContentView_iconIndex
      }));
    }
  }]);
}();
;

// -----------------------------------------------------------------------------
var _GameOptionsView = /*#__PURE__*/function () {
  function _GameOptionsView() {
    _classCallCheck(this, _GameOptionsView);
  }
  return _createClass(_GameOptionsView, [{
    key: "_OnPlayClicked",
    value:
    // ---------------------------------------------------------------------------
    function _OnPlayClicked() {
      GAME_MANAGER.EndMenu();
    }

    // ---------------------------------------------------------------------------
  }, {
    key: "view",
    value: function view() {
      var _this = this;
      var on_change_callback = function on_change_callback(event) {
        GAME_MANAGER.game_options.playerName = event.target.value;
      };
      return m("div", {
        "class": "gameOptionsContainer"
      }, m(MenuPanelView, {
        iconIndex: GAME_MANAGER.game_options.playerAvatarIndex
      }, m("div", {
        "class": "menuPanelContents"
      }, m("div", {
        "class": "menuPanelSectionContainer"
      }, m("span", {
        "class": "menuPanelSubtitle"
      }, "Your Name"), m("input", {
        placeholder: DEFAULT_PLAYER_NAME,
        value: GAME_MANAGER.game_options.playerName,
        onchange: on_change_callback
      })), m("div", {
        "class": "menuPanelSectionContainer"
      }, m("span", {
        "class": "menuPanelSubtitle"
      }, "Your Avatar"), m("div", {
        "class": "avatarSelectionContainer"
      }, m(AvatarIcon, {
        iconIndex: "1",
        selectedIndex: GAME_MANAGER.game_options.playerAvatarIndex,
        onclick: function onclick() {
          GAME_MANAGER.game_options.playerAvatarIndex = 1;
        }
      }), m(AvatarIcon, {
        iconIndex: "2",
        selectedIndex: GAME_MANAGER.game_options.playerAvatarIndex,
        onclick: function onclick() {
          GAME_MANAGER.game_options.playerAvatarIndex = 2;
        }
      }), m(AvatarIcon, {
        iconIndex: "3",
        selectedIndex: GAME_MANAGER.game_options.playerAvatarIndex,
        onclick: function onclick() {
          GAME_MANAGER.game_options.playerAvatarIndex = 3;
        }
      }), m(AvatarIcon, {
        iconIndex: "4",
        selectedIndex: GAME_MANAGER.game_options.playerAvatarIndex,
        onclick: function onclick() {
          GAME_MANAGER.game_options.playerAvatarIndex = 4;
        }
      }), m(AvatarIcon, {
        iconIndex: "5",
        selectedIndex: GAME_MANAGER.game_options.playerAvatarIndex,
        onclick: function onclick() {
          GAME_MANAGER.game_options.playerAvatarIndex = 5;
        }
      }), m(AvatarIcon, {
        iconIndex: "6",
        selectedIndex: GAME_MANAGER.game_options.playerAvatarIndex,
        onclick: function onclick() {
          GAME_MANAGER.game_options.playerAvatarIndex = 6;
        }
      }), m(AvatarIcon, {
        iconIndex: "7",
        selectedIndex: GAME_MANAGER.game_options.playerAvatarIndex,
        onclick: function onclick() {
          GAME_MANAGER.game_options.playerAvatarIndex = 7;
        }
      }))), m("div", {
        "class": "menuPanelSectionContainer"
      }, m("span", {
        "class": "menuPanelSubtitle"
      }, "Your Avatar"), m("div", {
        "class": "modeSelectionContainer"
      }, m(_ModeType, {
        modeIndex: "0",
        selectedModeIndex: GAME_MANAGER.game_options.gameModeIndex,
        onclick: function onclick() {
          GAME_MANAGER.game_options.gameModeIndex = 0;
        }
      }, GAME_MODE_STRS[0]), m(_ModeType, {
        modeIndex: "1",
        selectedModeIndex: GAME_MANAGER.game_options.gameModeIndex,
        onclick: function onclick() {
          GAME_MANAGER.game_options.gameModeIndex = 1;
        }
      }, GAME_MODE_STRS[1]), m(_ModeType, {
        modeIndex: "2",
        selectedModeIndex: GAME_MANAGER.game_options.gameModeIndex,
        onclick: function onclick() {
          GAME_MANAGER.game_options.gameModeIndex = 2;
        }
      }, GAME_MODE_STRS[2]))), m("div", {
        "class": "menuPanelSectionContainer"
      }, m("button", {
        "class": "playButton",
        onclick: function onclick() {
          _this._OnPlayClicked();
        }
      }, "Play")))));
    }
  }]);
}();
;

// -----------------------------------------------------------------------------
var MenuView = /*#__PURE__*/function () {
  function MenuView() {
    _classCallCheck(this, MenuView);
  }
  return _createClass(MenuView, [{
    key: "view",
    value:
    // ---------------------------------------------------------------------------
    function view() {
      return m("div", {
        "class": "menuGridContainer"
      }, m("div", {
        "class": "menuGridContainer"
      }, m(_LogoView, null), m(_GameOptionsView, null)));
    }
  }]);
}();
;
//# sourceMappingURL=MenuView.js.map