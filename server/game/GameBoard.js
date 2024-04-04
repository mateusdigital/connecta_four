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
//  File      : GameBoard.js                                                  //
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
const { INVALID_PLAYER_INDEX } = require("../../shared/Constants");
const Arr = require("../../shared/mdwg/Array");

// -----------------------------------------------------------------------------
class GameBoard
{
  constructor(columns, rows, players)
  {
    this.boardColumns = columns;
    this.boardRows    = rows;
    this.grid         = Arr.Create2D(this.boardRows, this.boardColumns, -1);

    this.players      = players;
    this.winnerPlayer = null;
  }

  // ---------------------------------------------------------------------------
  MakeMove(column, row, playerIndex)
  {
    if(this.winnerPlayer != null) {
      return false;
    }

    if(this.grid[row][column] != INVALID_PLAYER_INDEX) {
      return false;
    }

    this.grid[row][column] = playerIndex;
    return true;
  }

  // ---------------------------------------------------------------------------
  CheckGameOver()
  {
    if(this.winnerPlayer != null) {
      return true;
    }

    for(let y = 0; y < this.boardRows; ++y) {
      for(let x = 0; x < this.boardColumns; ++x) {
        const curr_index  = this.grid[y][x];
        if(curr_index == INVALID_PLAYER_INDEX) {
          continue;
        }

        // Horizontal
        if(this._CheckDirection(x, y, 1, 0, 4, curr_index)) {
          this.winnerPlayer = this.players[curr_index];
          return true;
        }
        // Vertical
        if(this._CheckDirection(x, y, 0, 1, 4, curr_index)) {
          this.winnerPlayer = this.players[curr_index];
          return true;
        }

        // Diagonal 1
        if(this._CheckDirection(x, y, 1, 1, 4, curr_index)) {
          this.winnerPlayer = this.players[curr_index];
          return true;
        }

        // Diagonal 2
        if(this._CheckDirection(x, y, 1, -1, 4, curr_index)) {
          this.winnerPlayer = this.players[curr_index];
          return true;
        }
      }
    }

    return false;
  }

  // ---------------------------------------------------------------------------
  _CheckDirection(x, y, vx, vy, count, targetIndex)
  {
    for(let i = 0; i < count; ++i) {
      const curr_y = y + (vy * i);
      for(let j = 0; j < count; ++j) {
        const curr_x = x + (vx * j);

        if(!this._IsValidCoord(curr_x, curr_y)) {
          return false;
        }

        const curr_index = this.grid[curr_y][curr_x];
        if(curr_index == INVALID_PLAYER_INDEX) {
          return false;
        }

        if(curr_index != targetIndex) {
          return false;
        }
      }
    }

    return true;
  }

  // ---------------------------------------------------------------------------
  _IsValidCoord(x, y)
  {
    return y >= 0 && y < this.boardRows
        && x >= 0 && x < this.boardColumns;
  }
};

// -----------------------------------------------------------------------------
module.exports = GameBoard;