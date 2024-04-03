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
const Arr = require("../../shared/mdwg/Array");

// -----------------------------------------------------------------------------
class GameBoard
{
  constructor(columns, rows, players)
  {
    this.boardColumns = columns;
    this.boardRows    = rows;
    this.grid         = Arr.Create2D(this.boardRows, this.boardColumns, -1);

    this.players = players;
  }

  MakeMove(column, row, playerIndex)
  {
    this.grid[row][column] = playerIndex
  }

  CheckGameOver()
  {
    return false;
  }

  GetWinner()
  {
    return -1;
  }
};

// -----------------------------------------------------------------------------
module.exports = GameBoard;