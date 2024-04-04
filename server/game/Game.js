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
const Debug = require("../../shared/mdwg/Debug");
const RND = require("../../shared/mdwg/RND");
const NET = require("../../shared/net/NET");

const GameBoard = require("./GameBoard");
const Player    = require("./Player");


// -----------------------------------------------------------------------------
class Game
{
  // ---------------------------------------------------------------------------
  constructor(player1, player2)
  {
    this._player1 = player1;
    this._player2 = player2;
    this._players = [ this._player1, this._player2 ];

    this._player1.playerData.playerIndex = 0;
    this._player2.playerData.playerIndex = 1;

    this._boardColumns  = 7;
    this._boardRows     = 5;
    this._currentPlayer = 0; // RND.Int(0, 1);

    this._gameBoard = new GameBoard(
      this._boardColumns,
      this._boardRows,
      this._players
    );

    this.OnEndCallback = null;
    this._AddListenCallbacks();
  }

  //
  // Player Connection Methods
  //

  // ---------------------------------------------------------------------------
  Destroy(socketId)
  {
    if(this._player1.socket.id == socketId) {
      NET.SendMessage(this._player2.socket, new NET.Messages.OtherPlayerDisconnected());
      return this._player2;
    }

    else if(this._player2.socket.id == socketId) {
      NET.SendMessage(this._player1.socket, new NET.Messages.OtherPlayerDisconnected());
      return this._player1;
    }
  }

  // ---------------------------------------------------------------------------
  IsPlayerSocketId(socketId)
  {
    return this._player1.socket.id == socketId
        || this._player2.socket.id == socketId;
  }

  // ---------------------------------------------------------------------------
  _AddListenCallbacks()
  {
    this._player1.socket.on(NET.Messages.MoveMade.MSG_NAME, (data)=>{
        this._MakeMove(data);
    });

    this._player2.socket.on(NET.Messages.MoveMade.MSG_NAME, (data)=>{
      this._MakeMove(data);
    });
  }


  //
  // Game Logic Methods
  //

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

  // ---------------------------------------------------------------------------
  _MakeMove(msgData)
  {
    Debug.Log(msgData);

    // Check Valid Move
    const valid_move = this._gameBoard.MakeMove(
      msgData.column,
      msgData.row,
      this._currentPlayer
    );

    if(!valid_move) {
      const same_turn_msg = new NET.Messages.NewTurn(
        this._currentPlayer,
        this._gameBoard.grid
      );

      NET.SendMessage(this._player1.socket, same_turn_msg);
      NET.SendMessage(this._player2.socket, same_turn_msg);

      return;
    }


    // Check Game Over
    const is_game_over = this._gameBoard.CheckGameOver();
    if(is_game_over)
    {
      const winner_player = this._gameBoard.winnerPlayer;
      const winner_data   = winner_player.playerData;
      const player1_data  = this._player1.playerData;
      const player2_data  = this._player2.playerData;

      NET.SendMessage(
        this._player1.socket,
        new NET.Messages.GameOver(winner_data.playerIndex == player1_data.playerIndex)
      );

      NET.SendMessage(
        this._player2.socket,
        new NET.Messages.GameOver(winner_data.playerIndex == player2_data.playerIndex)
      );

      this.OnEndCallback(this);
      return;
    }


    // Make a New Turn
    this._currentPlayer = (this._currentPlayer + 1) % 2;
    const new_turn_msg = new NET.Messages.NewTurn(
      this._currentPlayer,
      this._gameBoard.grid
    )

    NET.SendMessage(this._player1.socket, new_turn_msg);
    NET.SendMessage(this._player2.socket, new_turn_msg);
  }

}

// -----------------------------------------------------------------------------
module.exports = Game;