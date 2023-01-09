const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const path = require("path");
import * as IO from "../sharedcode/IO_CONSTANTS";
import { ISettings } from "../sharedcode/settingsInterface";
import { IEmberState } from "../sharedcode/stateInterface";
import { getLayouts, getSettings, saveEmberState } from "./utils/storage";
import { HandleEmberServer } from "./emberserver";
import { IKaleidoLayouts } from "../sharedcode/layoutInterface";

let settings: ISettings = getSettings();
let kaleidoLayouts: IKaleidoLayouts = getLayouts(settings);
let emberState: IEmberState

const handleEmberServer = new HandleEmberServer({
  hostIp: "0.0.0.0",
  port: 9000,
  settings: settings,
});

app.use("/", express.static(path.resolve(__dirname, "../../dist/client")));
app.get("/", (req: any, res: any) => {
  console.log("Request :", req);
  res.sendFile(path.resolve(__dirname, "../../public/index.html"));
});

let lastState: IEmberState;
let lastSettings: ISettings;
let lastLayouts: IKaleidoLayouts;

const loadTimer = setInterval(() => {
  settings = getSettings();
  kaleidoLayouts = getLayouts(settings);
  emberState = handleEmberServer.getEmberState();

  if (JSON.stringify(lastState) !== JSON.stringify(emberState)) {
    saveEmberState(emberState);
    console.log("Update state");
    io.sockets.emit(IO.SEND_STATE, emberState);
  }
  if (JSON.stringify(lastSettings) !== JSON.stringify(settings)) {
    console.log("Update settings");
    io.sockets.emit(IO.SEND_SETTINGS, settings);
  }
  if (JSON.stringify(lastLayouts) !== JSON.stringify(kaleidoLayouts)) {
    console.log("Update kaleidolayouts");
    io.sockets.emit(IO.SEND_LAYOUT, kaleidoLayouts);
  }
  lastState = emberState;
  lastSettings = settings;
  lastLayouts = kaleidoLayouts;
}, 100);


io.on("connection", (socket: any) => {
  console.log("User connected :", socket.id);
  socket.emit(IO.SEND_STATE, emberState);
  socket.emit(IO.SEND_SETTINGS, settings);
  socket.emit(IO.SEND_LAYOUT, kaleidoLayouts);
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000);
console.log("Server started on port 3000");
