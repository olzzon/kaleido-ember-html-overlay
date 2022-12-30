const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const path = require("path");
import * as IO from "../sharedcode/IO_CONSTANTS";
import { ILabelAndTallyState, ISource } from "../sharedcode/interfaces";
import {
  getSettings,
  saveLabelTallyState,
} from "./utils/storage";
import { HandleEmberServer } from "./emberserver";

let sources: ISource[] = getSettings();
let labelAndTallyState: ILabelAndTallyState[] = [];

const handleEmberServer = new HandleEmberServer();

app.use("/", express.static(path.resolve(__dirname, "../../dist/client")));
app.get("/", (req: any, res: any) => {
  console.log("Request :", req);
  res.sendFile(path.resolve(__dirname, "../../public/index.html"));
});

io.on("connection", (socket: any) => {
  console.log("User connected :", socket.id);
  const clientTimerState = setInterval(() => {
    sources = getSettings();
    let oldState = labelAndTallyState
    labelAndTallyState = handleEmberServer.getEmberState();
    if (JSON.stringify(oldState) !== JSON.stringify(labelAndTallyState)) {
      console.log("State changed");
      saveLabelTallyState(labelAndTallyState);
      io.sockets.emit(IO.SEND_STATE, labelAndTallyState);
    }
  }, 100);
  const clientTimerSettings = setInterval(
    () => socket.emit(IO.SEND_SETTINGS, sources),
    2000
  );

  socket
    .on(IO.GET_SETTINGS, () => {
      console.log("Client requested Source list");
      socket.emit(IO.SEND_STATE, labelAndTallyState);
      socket.emit(IO.SEND_SETTINGS, sources)
    })
    .on("disconnect", () => {
      console.log("User disconnected");
      clearInterval(clientTimerState);
      clearInterval(clientTimerSettings);
    });
});

server.listen(3000);
console.log("Server started on port 3000");
