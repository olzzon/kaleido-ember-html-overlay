const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const path = require("path");
import * as IO from "../sharedcode/IO_CONSTANTS";
import { IEmberState, ISettings } from "../sharedcode/interfaces";
import {
  getSettings,
  saveEmberState,
} from "./utils/storage";
import { HandleEmberServer } from "./emberserver";

let settings: ISettings = getSettings();
let emberState: IEmberState = {
  labelAndTallyState: [],
  selectedLayout: 0,
}

const handleEmberServer = new HandleEmberServer();

app.use("/", express.static(path.resolve(__dirname, "../../dist/client")));
app.get("/", (req: any, res: any) => {
  console.log("Request :", req);
  res.sendFile(path.resolve(__dirname, "../../public/index.html"));
});

io.on("connection", (socket: any) => {
  console.log("User connected :", socket.id);
  const clientTimerState = setInterval(() => {
    settings = getSettings();
    let oldState = emberState
    emberState = handleEmberServer.getEmberState();
    if (JSON.stringify(oldState) !== JSON.stringify(emberState)) {
      console.log("State changed");
      saveEmberState(emberState);
      io.sockets.emit(IO.SEND_STATE, emberState.labelAndTallyState);
    }
  }, 100);
  const clientTimerSettings = setInterval(
    () => socket.emit(IO.SEND_SETTINGS, settings),
    2000
  );

  socket
    .on(IO.GET_SETTINGS, () => {
      console.log("Client requested Source list");
      socket.emit(IO.SEND_STATE, emberState.labelAndTallyState);
      socket.emit(IO.SEND_SETTINGS, settings)
    })
    .on("disconnect", () => {
      console.log("User disconnected");
      clearInterval(clientTimerState);
      clearInterval(clientTimerSettings);
    });
});

server.listen(3000);
console.log("Server started on port 3000");
