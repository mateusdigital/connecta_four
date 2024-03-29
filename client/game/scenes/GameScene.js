
// -----------------------------------------------------------------------------
class GameScene
  extends BaseScene
{
  // ---------------------------------------------------------------------------
  constructor(initData, socket)
  {
    super();

    console.log(initData);

    this._gameBoard = new GameBoard(
      initData.boardColumns,
      initData.boardRows,
      initData.startPlayer,
      initData.playerData.playerIndex,
      initData.opponentData.playerIndex,
      this._GetTextureForPlayerAvatar(initData.playerData.playerAvatarIndex),
      this._GetTextureForPlayerAvatar(initData.opponentData.playerAvatarIndex),
    );

    this.addChild(this._gameBoard);
    this._gameBoard.OnMoveMade = (column, row) => {
      console.log("move made", column, row);
      socket.emit("move-made", socket.id);
    }


    // this._portraitLeft = new HudPortrait();
    // this.addChild(this._portraitLeft);

    // this._portraitRight = new HudPortrait();
    // this.addChild(this._portraitRight);
    // this._portraitRight.x = DESIGN_WIDTH - this._portraitRight.width;

  }

  // -----------------------------------------------------------------------------
  _GetTextureForPlayerAvatar(avatar)
  {
    const texture_name = `assets/characters/characters_000${avatar}.png`;
    return RES.GetTexture(texture_name);
  }
}