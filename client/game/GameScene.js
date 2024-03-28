
const GAME_BOARD_HEIGHT = 7;
const GAME_BOARD_WIDTH  = 6;

class GameScene
  extends BaseScene
{
  constructor()
  {
    super();

    this._gameBoard = Array_Create2D(GAME_BOARD_HEIGHT, GAME_BOARD_WIDTH);

    for(let i = 0; i < GAME_BOARD_HEIGHT; ++i) {
      for(let j = 0; j < GAME_BOARD_WIDTH; ++j) {
        this._gameBoard[i][j] = RND.Int(1, 7);
      }
    }

    for(let i = 0; i < GAME_BOARD_HEIGHT; ++i) {
      for(let j = 0; j < GAME_BOARD_WIDTH; ++j) {
        const sprite_index = this._gameBoard[i][j];
        const sprite_name  = `assets/characters/characters_000${sprite_index}.png`;

        const sprite = Sprite.Create(sprite_name);
        sprite.x = j * sprite.width;
        sprite.y = i * sprite.height;

        this.addChild(sprite);
      }
    }


  }


}