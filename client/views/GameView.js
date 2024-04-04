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
//  File      : GameView.js                                                   //
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
var _Portrait = /*#__PURE__*/function () {
  function _Portrait() {
    _classCallCheck(this, _Portrait);
  }
  return _createClass(_Portrait, [{
    key: "view",
    value: function view(vnode) {
      var attrs = vnode.attrs || {};
      var player_data = attrs.playerData;
      var position = attrs.position;

      //
      var stats = m("div", [m("span", {
        "class": "portraitNameKey"
      }, "#".concat(player_data.playerIndex)), m("span", {
        "class": "portraitNameValue"
      }, "".concat(player_data.playerName))]);
      var img_src = GetAvatarLoadUrlWithIndex(player_data.playerAvatarIndex);
      var img = m("div", {
        "class": "portraitImageContainer"
      }, [m("img", {
        src: img_src
      })]);
      return m("div", {
        "class": "portraitContainer"
      }, [position == "left" ? stats : img, position == "left" ? img : stats]);
    }
  }]);
}();
;

// -----------------------------------------------------------------------------
var GameView = /*#__PURE__*/function () {
  function GameView() {
    _classCallCheck(this, GameView);
  }
  return _createClass(GameView, [{
    key: "view",
    value:
    // ---------------------------------------------------------------------------
    function view() {
      return m("div", {
        "class": "gameContainer"
      }, m("div", {
        id: "portraitsContainer",
        "class": "portraitsContainer"
      }, m(_Portrait, {
        "class": "portraitStatsContainer",
        playerData: GAME_MANAGER.match_data.playerData,
        position: "left"
      }), m("div", {
        "class": "vs"
      }, "vs"), m(_Portrait, {
        "class": "portraitStatsContainer portraitStatsContainerRight",
        playerData: GAME_MANAGER.match_data.opponentData,
        position: "right"
      })), m("div", {
        id: "canvasContainer",
        "class": "canvasContainer"
      }, " "));
    }
  }]);
}();
;
//# sourceMappingURL=GameView.js.map