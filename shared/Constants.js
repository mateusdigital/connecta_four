
//
// Views
//

// -----------------------------------------------------------------------------
const GAME_MODE_STRS = [
  "multiplayer online",
  "against computer",
  "share an url"
];

// -----------------------------------------------------------------------------
const INVALID_PLAYER_INDEX = -1;

const DEFAULT_PLAYER_NAME     = "An unnamed player";
const DEFAULT_AVATAR_INDEX    = 1;
const DEFAULT_GAME_MODE_INDEX = 0;

const AVATAR_INDEX_MIN = 1;
const AVATAR_INDEX_MAX = 7;

//
// Avatars
//

// -----------------------------------------------------------------------------
function GetAvatarLoadUrlWithIndex(index)
{
  return `assets/characters/characters_000${index}.png`
}


//
// Game
//

// -----------------------------------------------------------------------------
const GAME_BOARD_TILES_Y = 6;
const GAME_BOARD_TILES_X = 7;

// -----------------------------------------------------------------------------
const DESIGN_HEIGHT   = 800;
const DESIGN_WIDTH    = 1024;


const _Constants = {
  GAME_MODE_STRS,
  INVALID_PLAYER_INDEX,
  DEFAULT_PLAYER_NAME,
  DEFAULT_AVATAR_INDEX,
  DEFAULT_GAME_MODE_INDEX,
  AVATAR_INDEX_MIN,
  AVATAR_INDEX_MAX,
  GetAvatarLoadUrlWithIndex,
  GAME_BOARD_TILES_Y,
  GAME_BOARD_TILES_X,
  DESIGN_HEIGHT,
  DESIGN_WIDTH
};

// -----------------------------------------------------------------------------
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = _Constants;
}
