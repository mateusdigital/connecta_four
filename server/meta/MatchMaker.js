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
//  File      : MatchMaker.js                                                 //
//  Project   : connecta-four - server                                        //
//  Date      : 2024-03-29                                                    //
//  License   : See project's COPYING.TXT for full info.                      //
//  Author    : mateus.digital <hello@mateus.digital>                         //
//  Copyright : mateus.digital - 2024                                         //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//---------------------------------------------------------------------------~//

const Arr = require("../../shared/mdwg/Array");

// -----------------------------------------------------------------------------
class MatchMaker
{
  // -----------------------------------------------------------------------------
  constructor()
  {
    this._clients     = new Map();
    this._waitingList = [];
    this._games       = [];
  }


  //
  // Connection Handling
  //

  // ---------------------------------------------------------------------------
  OnClientConnect(socket)
  {
    console.log("Client Connected", socket.id);

    this._clients.set(socket.id, socket);
    this._waitingList.push(socket.id);

    this._PrintStats();
  }

  // ---------------------------------------------------------------------------
  OnClientDisconnect(socket)
  {
    console.log("Client Disconnect", socket.id);

    this._clients.delete(socket.id);
    Arr.Remove(this._waitingList, socket.id);

    this._PrintStats();
  }



  // ---------------------------------------------------------------------------
  _PrintStats()
  {
    console.log("Total Clients:", this._clients.size);
    console.log("Waiting List :", this._waitingList.length);
    console.log("Games:        ", this._games.length);
  }

}

// -----------------------------------------------------------------------------
module.exports = MatchMaker;