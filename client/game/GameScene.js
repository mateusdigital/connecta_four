
// -----------------------------------------------------------------------------
class GameScene
  extends BaseScene
{
  // ---------------------------------------------------------------------------
  constructor()
  {
    super();

    this._gameBoard = new GameBoard(
      GAME_BOARD_TILES_X, GAME_BOARD_TILES_Y,
      0,
      RES.GetTexture(ASSETS_CHARACTERS_CHARACTERS_0001),
      RES.GetTexture(ASSETS_CHARACTERS_CHARACTERS_0002)
    );
    this.addChild(this._gameBoard);


    this._gameBoard.OnMoveMade = (column, row) => {
      console.log("move made", column, row);
    }


    // this._portraitLeft = new HudPortrait();
    // this.addChild(this._portraitLeft);

    // this._portraitRight = new HudPortrait();
    // this.addChild(this._portraitRight);
    // this._portraitRight.x = DESIGN_WIDTH - this._portraitRight.width;

  }
}