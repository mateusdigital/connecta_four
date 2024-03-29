//~---------------------------------------------------------------------------//
//                               *       +                                    //
//                         '                  |                               //
//                     ()    .-.,="``"=.    - o -                             //
//                           '=/_       \     |                               //
//                        *   |  '=._    |                                    //
//                             \     `=./`,        '                          //
//                          .   '=.__.=' `='      *                           //
//                 +                         +                                //
//                      O      *        '       .                             //
//                                                                            //
//  File      : main.js                                                       //
//  Project   : connecta-four - server                                        //
//  Date      : 2024-03-29                                                    //
//  License   : See project's COPYING.TXT for full info.                      //
//  Author    : mateus.digital <hello@mateus.digital>                         //
//  Copyright : mateus.digital - 2024                                         //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//---------------------------------------------------------------------------~//

//
// Imports
//

// -----------------------------------------------------------------------------
const path = require("path");

const express          = require("express");
const { createServer } = require("http");
const { Server }       = require("socket.io");

const RND = require("../shared/mdwg/RND");
const MatchMaker = require("./meta/MatchMaker");

//
// Create Server
//

// -----------------------------------------------------------------------------
const app        = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" }
});


//
// Setup serving paths
//

// -----------------------------------------------------------------------------
const clientPath = path.join(__dirname, "../client");
const sharedPath = path.join(__dirname, "../shared");

app.use(express.static(clientPath));
app.use("/shared", express.static(sharedPath)); // Specify '/shared' as the base URL for shared files


//
// Entry Point
//

// -----------------------------------------------------------------------------
const gMatchMaker = new MatchMaker();

RND.Seed(1234);

io.on("connect", (socket)=>{
  gMatchMaker.OnClientConnect(socket);
  socket.on("disconnect", ()=>{
    gMatchMaker.OnClientDisconnect(socket);
  });
})

// -----------------------------------------------------------------------------
httpServer.listen(5000);