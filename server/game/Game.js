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
//  File      : Match.js                                                      //
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
const RND = require("../../shared/mdwg/RND");
const NET = require("../../shared/net/NET");

const GameBoard = require("./GameBoard");
const Player    = require("./Player");

// -----------------------------------------------------------------------------
class Game
{
  // ---------------------------------------------------------------------------
  constructor(player1Socket, player2Socket)
  {
    this._player1 = new Player(player1Socket);
    this._player2 = new Player(player2Socket);
    this._players = [ this._player1, this._player2 ];

    this._boardColumns  = 7;
    this._boardRows     = 5;
    this._currentPlayer = RND.Int(0, 1);

    this._gameBoard = new GameBoard(
      this._boardColumns,
      this._boardRows,
      this._players
    );
  }

  // -----------------------------------------------------------------------------
  StartGame()
  {
    //
    NET.SendMessage(this._player1.socket, new NET.Messages.MatchStarted(
      this._boardColumns,
      this._boardRows,
      this._currentPlayer,
      this._player1.playerData,
      this._player2.playerData,
    ));

    NET.SendMessage(this._player2.socket, new NET.Messages.MatchStarted(
      this._boardColumns,
      this._boardRows,
      this._currentPlayer,
      this._player2.playerData,
      this._player1.playerData,
    ));
  }

  // -----------------------------------------------------------------------------
  DestroyAndGetRemainingPlayer(socketId)
  {
    if(this._player1.socket.id == socketId) {
      NET.SendMessage(this._player2.socket, new NET.Messages.OtherPlayerDisconnected());
      return this._player2.socket;
    }
    else if(this._player2.socket.id == socketId) {
      NET.SendMessage(this._player1.socket, new NET.Messages.OtherPlayerDisconnected());
      return this._player1.socket;
    }
  }

  // ---------------------------------------------------------------------------
  IsPlayerSocketId(socketId)
  {
    return this._player1.socket.id == socketId
        || this._player2.socket.id == socketId;
  }


}

// -----------------------------------------------------------------------------
module.exports = Game;