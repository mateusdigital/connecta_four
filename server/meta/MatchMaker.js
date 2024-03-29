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

// -----------------------------------------------------------------------------
const Arr = require("../../shared/mdwg/Array");
const Game = require("../game/Game");

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
    this._waitingList.push(socket);

    this._PrintStats();
    this._TryToCreateGame();
  }

  // ---------------------------------------------------------------------------
  OnClientDisconnect(disconnectedSocket)
  {
    console.log("Client Disconnect", disconnectedSocket.id);

    this._clients.delete(disconnectedSocket.id);

    Arr.RemoveIf(this._waitingList, (otherSocket) => {
      return otherSocket.id == disconnectedSocket.id
    });

    this._DestroyGame(disconnectedSocket.id);

    this._PrintStats();
  }

  //
  // Game Handling
  //

  // ---------------------------------------------------------------------------
  _TryToCreateGame()
  {
    if(this._waitingList.length < 2) {
      console.log("Not enough players...");
      return;
    }

    console.log("Creating Game!");
    const player1Socket = Arr.PopFront(this._waitingList);
    const player2Socket = Arr.PopFront(this._waitingList);

    const game = new Game(player1Socket, player2Socket);
    this._games.push(game);

    this._PrintStats();
  }

  // ---------------------------------------------------------------------------
  _DestroyGame(disconnectedSocket)
  {
    const game = Arr.FindIf(this._games, (game)=>{
      return game.IsPlayerSocketId(disconnectedSocket);
    });

    if(!game) {
      return;
    }

    const otherPlayerSocket = game.DestroyAndGetRemainingPlayer(disconnectedSocket);
    Arr.Remove(this._games, game);

    this._waitingList.push(otherPlayerSocket);
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