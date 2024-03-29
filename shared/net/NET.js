class _OtherPlayerDisconnected
{
  static MSG_NAME = "OtherPlayerDisconnected";
};

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





class _Messages
{
  static OtherPlayerDisconnected = _OtherPlayerDisconnected;
  static MatchStarted            = _MatchStarted;
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
