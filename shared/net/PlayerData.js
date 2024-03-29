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
//  File      : PlayerData.js                                                 //
//  Project   : connecta-four - shared                                        //
//  Date      : 2024-03-29                                                    //
//  License   : See project's COPYING.TXT for full info.                      //
//  Author    : mateus.digital <hello@mateus.digital>                         //
//  Copyright : mateus.digital - 2024                                         //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//---------------------------------------------------------------------------~//

// -----------------------------------------------------------------------------
class PlayerData
{
  constructor(index, name, avatar)
  {
    this.playerIndex       = index;
    this.playerName        = name;
    this.playerAvatarIndex = avatar;
  }
}

// -----------------------------------------------------------------------------
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = MatchStartMessage;
}
