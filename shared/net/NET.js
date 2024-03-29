// -----------------------------------------------------------------------------
class _OtherPlayerDisconnected
{
  static MSG_NAME = "OtherPlayerDisconnected";
};

// -----------------------------------------------------------------------------
class _MatchStarted
{
  static MSG_NAME = "MatchStart";

  constructor(boardColumns, boardRows, startPlayer, playerData, opponentData)
  {
    this.boardColumns = boardColumns;
    this.boardRows    = boardRows;
    this.startPlayer  = startPlayer;
    this.playerData   = playerData;
    this.opponentData = opponentData;
  }
}

// -----------------------------------------------------------------------------
class _MoveMade
{
  static MSG_NAME = "MoveMade";

  constructor(socketId, playerIndex, column, row)
  {
    this.socketId    = socketId;
    this.playerIndex = playerIndex;
    this.column      = column;
    this.row         = row;
  }
}

// -----------------------------------------------------------------------------
class _NewTurn
{
  static MSG_NAME = "NewTurn";

  constructor(currentPlayer, board)
  {
    this.currentPlayer = currentPlayer;
    this.board         = board;
  }
}



class _Messages
{
  static OtherPlayerDisconnected = _OtherPlayerDisconnected;
  static MatchStarted            = _MatchStarted;
  static MoveMade                = _MoveMade;
  static NewTurn                 = _NewTurn;
};


class NET
{
  static Messages = _Messages;

  static SendMessage(socket, message)
  {
    socket.emit(message.constructor.MSG_NAME, message);
  }
}

// -----------------------------------------------------------------------------
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = NET;
}
