
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
const DEFAULT_PLAYER_NAME = "An unnamed player";

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