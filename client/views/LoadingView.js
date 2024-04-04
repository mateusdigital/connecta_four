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
//  Date      : 2024-04-02                                                    //
//  License   : See project's COPYING.TXT for full info.                      //
//  Author    : mateus.digital <hello@mateus.digital>                         //
//  Copyright : mateus.digital - 2024                                         //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//---------------------------------------------------------------------------~//
// -----------------------------------------------------------------------------
var LoadingView = /*#__PURE__*/function () {
  // ---------------------------------------------------------------------------
  function LoadingView() {
    _classCallCheck(this, LoadingView);
    var opt = GAME_MANAGER.game_options;

    //
    this._avatar_img_src = GetAvatarLoadUrlWithIndex(opt.player_avatar_index || DEFAULT_AVATAR_INDEX);
    this._player_name = opt.player_name || DEFAULT_PLAYER_NAME;
    this._game_mode = GAME_MODE_STRS[opt.game_mode_index || DEFAULT_GAME_MODE_INDEX];
  }

  // ---------------------------------------------------------------------------
  return _createClass(LoadingView, [{
    key: "view",
    value: function view() {
      return m("div", {
        "class": "centerContent"
      }, m("div", {
        "class": "loadingContainer"
      }, m(MenuPanelView, {
        iconIndex: GAME_MANAGER.game_options.player_avatar_index
      }, m("div", {
        "class": "menuPanelContents"
      }, m("div", {
        "class": "menuPanelSectionContainer"
      }, m("span", {
        "class": "menuPanelSubtitle"
      }, "Name"), m("span", {
        "class": "loadingPlayerName"
      }, this._player_name)), m("div", {
        "class": "menuPanelSectionContainer"
      }, m("span", {
        "class": "menuPanelSubtitle"
      }, "Game Mode"), m("span", {
        "class": "loadingGameMode"
      }, this._game_mode)), m("div", {
        "class": "menuPanelSectionContainer"
      }, m("span", {
        "class": "loadingState"
      }, "Loading..."))))));
    }
  }]);
}();
;
//# sourceMappingURL=LoadingView.js.map