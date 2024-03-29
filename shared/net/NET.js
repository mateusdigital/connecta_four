class _OtherPlayerDisconnected
{
  static MSG_NAME = "OtherPlayerDisconnected";
};

class _Messages
{
  static OtherPlayerDisconnected = _OtherPlayerDisconnected;
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
