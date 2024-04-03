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
  constructor(socket, data)
  {
    this.socket     = socket;
    this.playerData = new PlayerData(data.playerName, data.playerAvatarIndex);
  }
};

// -----------------------------------------------------------------------------
module.exports = Player;