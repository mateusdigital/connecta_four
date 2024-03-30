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
//  File      : Player.js                                                     //
//  Project   : connecta-four - sever                                         //
//  Date      : 2024-03-29                                                    //
//  License   : See project's COPYING.TXT for full info.                      //
//  Author    : mateus.digital <hello@mateus.digital>                         //
//  Copyright : mateus.digital - 2024                                         //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//---------------------------------------------------------------------------~//

// -----------------------------------------------------------------------------
const RND = require("../../shared/mdwg/RND");
const PlayerData = require("../../shared/net/PlayerData");

// -----------------------------------------------------------------------------
class Player
{
  // ---------------------------------------------------------------------------
  constructor(socket)
  {
    this.socket     = socket;
    this.playerData = new PlayerData(
      "player" + RND.Int(),
      RND.Int(0, 7)
    );
  }

  // ---------------------------------------------------------------------------
  SetIndex(index) {
    this.playerData.playerIndex = index;
  }
};

// -----------------------------------------------------------------------------
module.exports = Player;