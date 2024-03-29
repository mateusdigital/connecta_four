
const GAP_START_X = 25;
const GAP_START_Y = 25;
const GAP_BETWEEN_X = 5;
const GAP_BETWEEN_Y = 5;

// -----------------------------------------------------------------------------
class GameBoard
  extends PIXI.NineSlicePlane
{

  //--------------------------------------------------------------------------
  constructor(
    tilesX, tilesY,
    currentPlayer,
    playerIndex,
    opponentIndex,
    player1Texture,
    player2Texture)
  {
    super(
      RES.GetTexture(ASSETS_UI_ASSETS_POPUP_BASE),
      46, 46, 46, 46
    );

    //
    this._tilesX = tilesX;
    this._tilesY = tilesY;

    this._currentPlayer = currentPlayer;
    this._playerIndex   = playerIndex;
    this._opponentIndex = opponentIndex;

    this._placeholderTexture = null;
    this._player1Texture     = player1Texture;
    this._player2Texture     = player2Texture;

    this._indexGrid       = Array_Create2D(tilesY, tilesX);
    this._placeholderGrid = Array_Create2D(tilesY, tilesX);
    this._spritesGrid     = Array_Create2D(tilesY, tilesX);

    this._currentHoveredPlaceholderSprite = null;

    // Create the placeholders...
    const texture_name = `assets/characters/characters_0000.png`;
    this._placeholderTexture = RES.GetTexture(texture_name);

    for (let i = 0; i < tilesY; ++i) {
      for (let j = 0; j < tilesX; ++j) {
        const sprite = Sprite.CreateWithTexture(this._placeholderTexture);
        sprite.scale.set(0.3);

        sprite.x = GAP_START_X + (j * sprite.width)  + (GAP_BETWEEN_X * j);
        sprite.y = GAP_START_Y + (i * sprite.height) + (GAP_BETWEEN_Y * i);

        this._placeholderGrid[i][j] = sprite;
        this.addChild(sprite);
      }
    }

    //
    const sprite_width  = this._placeholderGrid[0][0].width;
    const sprite_height = this._placeholderGrid[0][0].height;
    this.width  = (GAP_START_X * 2) + (sprite_width  * tilesX) + (GAP_BETWEEN_X * tilesX);
    this.height = (GAP_START_Y * 2) + (sprite_height * tilesY) + (GAP_BETWEEN_Y * tilesY);

    this.interactive = true;
    this.buttonMode = false;

    this.on("pointermove", (evt) => {
        this._HandleMouseMove(evt.data.global.x, evt.data.global.y);
    });

    this.on("pointerdown", (evt) => {
      this._HandleMouseClick(evt.data.global.x, evt.data.global.y);
    });
  }

  //
  // Input Handling
  //

  // ---------------------------------------------------------------------------
  _HandleMouseMove(mouseX, mouseY)
  {
    if(!this._IsCurrentPlayer()) {
      return;
    }

    this._RestoreHoveredPlaceholder();

    const coord = this._GetMoveCoordsFromMousePosition(mouseX, mouseY);

    if(!coord) {
      return;
    }

    this._UpdateHoveredPlaceholder(coord.x, coord.y);
  }

  // ---------------------------------------------------------------------------
  _HandleMouseClick(mouseX, mouseY)
  {
    if(!this._IsCurrentPlayer()) {
      return;
    }

    const coord = this._GetMoveCoordsFromMousePosition(mouseX, mouseY);

    if(!coord) {
      return;
    }

    this._MakeMove(coord.x, coord.y);
  }

  // ---------------------------------------------------------------------------
  _GetMoveCoordsFromMousePosition(mouseX, mouseY)
  {
    let column = -1;
    for(let i = 0; i < this._tilesX; ++i) {
      const sprite = this._placeholderGrid[0][i];
      if(!sprite) {
        continue;
      }

      const inside = mouseX >= sprite.x && mouseX <= (sprite.x + sprite.width);
      if(inside) {
        column = i;
        break;
      }
    }

    if(column == -1) {
      return;
    }

    let row = this._GetFirstAvailableSpotForColumn(column);
    if(row == -1) {
      return;
    }

    return {x: column, y: row};
  }


  //
  // Game Logic
  //

  // ---------------------------------------------------------------------------
  _MakeMove(column, row)
  {
    this._indexGrid[row][column] = this._currentPlayer;

    const sprite  = this._placeholderGrid[row][column];
    sprite.texure = this._GetTextureForCurrentPlayer();

    this._spritesGrid    [row][column]    = sprite;
    this._placeholderGrid[row][column]    = null;
    this._currentHoveredPlaceholderSprite = null;

    this._currentPlayer = (this._currentPlayer + 1) % 2;

    if(this.OnMoveMade) {
      this.OnMoveMade(column, row);
    }
  }

  // ---------------------------------------------------------------------------
  _GetFirstAvailableSpotForColumn(column)
  {
    for(let i = this._tilesY -1; i >= 0 ; --i) {
      if(this._indexGrid[i][column] === null) {
        return i;
      }
    }

    return -1;
  }

  // ---------------------------------------------------------------------------
  _IsCurrentPlayer()
  {
    return this._currentPlayer == this._playerIndex;
  }


  //
  // Plaholder Texture Changing
  //

  // ---------------------------------------------------------------------------
  _RestoreHoveredPlaceholder()
  {
    if(!this._currentHoveredPlaceholderSprite) {
      return;
    }

    this._currentHoveredPlaceholderSprite.texture = this._placeholderTexture;
    this._currentHoveredPlaceholderSprite = null;
    // console.log("reset");
  }

  // ---------------------------------------------------------------------------
  _UpdateHoveredPlaceholder(column, row)
  {
    if(!this._placeholderGrid[row][column]) {
      return;
    }

    this._currentHoveredPlaceholderSprite = this._placeholderGrid[row][column];
    this._currentHoveredPlaceholderSprite.texture = this._GetTextureForCurrentPlayer();

    // console.log(row, column);
  }

  // ---------------------------------------------------------------------------
  _GetTextureForCurrentPlayer()
  {
    return (this._currentPlayer == 0)
      ? this._player1Texture
      : this._player2Texture;
  }

}