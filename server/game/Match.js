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
const GameBoard = require("./GameBoard");


// -----------------------------------------------------------------------------
class Match
{
  constructor(player1, player2)
  {
    this._player1 = player1;
    this._player2 = player2;
    this._players = [ player1, player2 ];

    this._boardColumns  = 7;
    this._boardRows     = 5;
    this._currentPlayer = 0;

    this._gameBoard = new GameBoard(
      this._boardColumns,
      this._boardRows,
      this._players
    );

    this._Emit_MatchStart();
    this._player1.socket.on("move-made", (data)=>{
      console.log("Player 1 move: ", data)
    });
    this._player2.socket.on("move-made", (data)=>{
      console.log("Player 2 move: ", data)
    })
  }

  _Emit_MatchStart() {
    const name = "match-start";

    this._player1.socket.emit(
      MatchStartData.EventName,
      new MatchStartData(
        this._boardColumns,
        this._boardRows,
        this._currentPlayer,
        this._player1.playerData,
        this._player2.playerData
      )
    );

    this._player2.socket.emit(
      MatchStartData.EventName,
      new MatchStartData(
        this._boardColumns,
        this._boardRows,
        this._currentPlayer,
        this._player2.playerData,
        this._player1.playerData
      )
    );

  }
}

// -----------------------------------------------------------------------------
module.exports = Match;