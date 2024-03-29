
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
//  File      : GameScene.js                                                  //
//  Project   : connecta-four - client                                        //
//  Date      : 2024-03-29                                                    //
//  License   : See project's COPYING.TXT for full info.                      //
//  Author    : mateus.digital <hello@mateus.digital>                         //
//  Copyright : mateus.digital - 2024                                         //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//---------------------------------------------------------------------------~//


// -----------------------------------------------------------------------------
class GameScene
  extends BaseScene
{
  // ---------------------------------------------------------------------------
  constructor(matchStartData, playerSocket)
  {
    super();

    console.log(matchStartData);
    this._playerSocket = playerSocket;


    this._gameBoard = new GameBoard(
      matchStartData.boardColumns,
      matchStartData.boardRows,
      matchStartData.startPlayer,
      matchStartData.playerData.playerIndex,
      matchStartData.opponentData.playerIndex,
      this._GetTextureForPlayerAvatar(matchStartData.playerData.playerAvatarIndex),
      this._GetTextureForPlayerAvatar(matchStartData.opponentData.playerAvatarIndex),
    );

    this.addChild(this._gameBoard);

    this._gameBoard.OnMoveMade = (column, row) => {
      console.log("move made", column, row);
      NET.SendMessage(playerSocket, new NET.Messages.MoveMade(
        this._playerSocket.id,
        this._gameBoard.GetPlayerIndex(),
        column,
        row
      ));
    }

    this._AddListeningCallbacks();
  }


  // ---------------------------------------------------------------------------
  _AddListeningCallbacks()
  {
    this._playerSocket.on(NET.Messages.NewTurn.MSG_NAME, (data)=>{
      this._OnNewTurn(data);
    })
  }

  // ---------------------------------------------------------------------------
  _OnNewTurn(msgData)
  {
    this._gameBoard.SetCurrentPlayer(msgData.currentPlayer);
    this._gameBoard.SetBoard(msgData.board);
  }


  // -----------------------------------------------------------------------------
  _GetTextureForPlayerAvatar(avatar)
  {
    const texture_name = `assets/characters/characters_000${avatar}.png`;
    return RES.GetTexture(texture_name);
  }
}