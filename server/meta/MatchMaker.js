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
const Player = require("../game/Player");

// -----------------------------------------------------------------------------
class MatchMaker
{
  // -----------------------------------------------------------------------------
  constructor()
  {
    this._clients              = new Map();
    this._waiting_players_list = [];
    this._games                = [];
  }


  //
  // Connection Handling
  //

  // ---------------------------------------------------------------------------
  OnClientConnect(socket)
  {
    console.log("Client Connected", socket.id);

    this._clients.set(socket.id, socket);

    this._PrintStats();
  }

  // ---------------------------------------------------------------------------
  OnClientDisconnect(disconnectedSocket)
  {
    console.log("Client Disconnect", disconnectedSocket.id);

    this._clients.delete(disconnectedSocket.id);

    Arr.RemoveIf(this._waiting_players_list, (p) => {
      return p.socket.id == disconnectedSocket.id
    });

    this._TryDestroyGame(disconnectedSocket.id);

    this._PrintStats();
  }

  // ---------------------------------------------------------------------------
  OnPlayerJoin(socket, data)
  {
    const player = new Player(socket, data);

    this._waiting_players_list.push(player);
    this._TryToCreateGame();
  }


  //
  // Game Handling
  //

  // ---------------------------------------------------------------------------
  _TryToCreateGame()
  {
    if(this._waiting_players_list.length < 2) {
      console.log("Not enough players...");
      return;
    }

    console.log("Creating Game!");
    const player1 = Arr.PopFront(this._waiting_players_list);
    const player2 = Arr.PopFront(this._waiting_players_list);

    const game = new Game(player1, player2);
    this._games.push(game);

    game.StartGame();
    game.OnEndCallback = (game)=>{
      this._DestroyEndedGame(game);
    };

    this._PrintStats();
  }

  // ---------------------------------------------------------------------------
  _DestroyEndedGame(game)
  {
    if(!game) {
      return;
    }

    Arr.Remove(this._games, game);
  }

  // ---------------------------------------------------------------------------
  _TryDestroyGame(disconnectedSocket)
  {
    const game = Arr.FindIf(this._games, (game)=>{
      return game.IsPlayerSocketId(disconnectedSocket);
    });

    game.Destroy(disconnectedSocket);
    this._DestroyEndedGame(game);
  }

  // ---------------------------------------------------------------------------
  _PrintStats()
  {
    console.log("Total Clients:", this._clients.size);
    console.log("Waiting List :", this._waiting_players_list.length);
    console.log("Games:        ", this._games.length);
  }
}

// -----------------------------------------------------------------------------
module.exports = MatchMaker;