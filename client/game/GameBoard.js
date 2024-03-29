
const GAP_START_X = 25;
const GAP_START_Y = 25;
const GAP_BETWEEN_X = 5;
const GAP_BETWEEN_Y = 5;
const INVALID_PLAYER_INDEX = -1;

// -----------------------------------------------------------------------------
class GameBoard
  extends PIXI.NineSlicePlane
{

  //--------------------------------------------------------------------------
  constructor(
    tilesX,
    tilesY,
    currentPlayer,
    playerIndex,
    opponentIndex,
    playerTexture,
    opponentTexture)
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
    this._playerTexture     = playerTexture;
    this._opponentTexture   = opponentTexture;

    this._indexGrid   = Arr.Create2D(tilesY, tilesX, INVALID_PLAYER_INDEX);
    this._spritesGrid = Arr.Create2D(tilesY, tilesX);

    this._currentHoveredSprite = null;

    this._SetInputCallbacks();
    this._CreatePlaceholderSprites();
    this._AdjustContainerSize();
  }

  // ----------------------------------------------------------------------------
  GetPlayerIndex()
  {
    return this._playerIndex;
  }

  SetCurrentPlayer(playerIndex)
  {
    this._currentPlayer = playerIndex;
  }

  SetBoard(grid)
  {
    this._indexGrid = grid;
    this._UpdateGridSprites();
  }


  //
  // Input Handling
  //

  // ---------------------------------------------------------------------------
  _SetInputCallbacks()
  {
    this.interactive = true;
    this.buttonMode  = true;

    this.on("pointermove", (evt) => {
        this._HandleMouseMove(evt.data.global.x, evt.data.global.y);
    });

    this.on("pointerdown", (evt) => {
      this._HandleMouseClick(evt.data.global.x, evt.data.global.y);
    });
  }


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
      const sprite = this._spritesGrid[0][i];
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
      return null;
    }

    const row = this._GetFirstAvailableSpotForColumn(column);
    if(row == -1) {
      return null;
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

    const sprite  = this._spritesGrid[row][column];
    sprite.texure = this._playerTexture;

    this._currentHoveredSprite = null;
    this._currentPlayer = (this._currentPlayer + 1) % 2;

    if(this.OnMoveMade) {
      this.OnMoveMade(column, row);
    }
  }

  // ---------------------------------------------------------------------------
  _GetFirstAvailableSpotForColumn(column)
  {
    for(let i = this._tilesY -1; i >= 0 ; --i) {
      if(this._indexGrid[i][column] === INVALID_PLAYER_INDEX) {
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
  // Sprites
  //

  // ---------------------------------------------------------------------------
  _CreatePlaceholderSprites()
  {
    const texture_name = `assets/characters/characters_0000.png`;
    this._placeholderTexture = RES.GetTexture(texture_name);

    for (let i = 0; i < this._tilesY; ++i) {
      for (let j = 0; j < this._tilesX; ++j) {
        const sprite = Sprite.CreateWithTexture(this._placeholderTexture);
        sprite.scale.set(0.3);

        sprite.x = GAP_START_X + (j * sprite.width)  + (GAP_BETWEEN_X * j);
        sprite.y = GAP_START_Y + (i * sprite.height) + (GAP_BETWEEN_Y * i);

        this._spritesGrid[i][j] = sprite;
        this.addChild(sprite);
      }
    }
  }

  // ---------------------------------------------------------------------------
  _AdjustContainerSize()
  {
    const sprite_width  = this._spritesGrid[0][0].width;
    const sprite_height = this._spritesGrid[0][0].height;
    this.width  = (GAP_START_X * 2) + (sprite_width  * this._tilesX) + (GAP_BETWEEN_X * this._tilesX);
    this.height = (GAP_START_Y * 2) + (sprite_height * this._tilesY) + (GAP_BETWEEN_Y * this._tilesY);
  }

  // ---------------------------------------------------------------------------
  _UpdateGridSprites()
  {
    for (let i = 0; i < this._tilesY; ++i) {
      for (let j = 0; j < this._tilesX; ++j) {
        const value = this._indexGrid[i][j];
        let texture = this._placeholderTexture;
        if(value === this._playerIndex) {
          texture = this._playerTexture;
        }
        else if(value === this._opponentIndex) {
          texture = this._opponentTexture;
        }

        this._spritesGrid[i][j].texture = texture;
      }
    }
  }


  //
  // Placeholder Texture Changing
  //

  // ---------------------------------------------------------------------------
  _RestoreHoveredPlaceholder()
  {
    if(!this._currentHoveredSprite) {
      return;
    }

    this._currentHoveredSprite.texture = this._placeholderTexture;
    this._currentHoveredSprite = null;
  }

  // ---------------------------------------------------------------------------
  _UpdateHoveredPlaceholder(column, row)
  {
    if(this._indexGrid[row][column] != INVALID_PLAYER_INDEX) {
      return;
    }

    this._currentHoveredSprite = this._spritesGrid[row][column];
    this._currentHoveredSprite.texture = this._playerTexture;
  }
}