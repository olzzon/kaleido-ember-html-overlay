const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const path = require("path");
import * as IO from "../sharedcode/IO_CONSTANTS";
import { ISource } from "../sharedcode/interfaces";
import { getSettings, saveSettings } from "./utils/storage";
import { HandleEmberServer } from "./emberserver";

let sources: ISource[] = getSettings();

const handleEmberServer = new HandleEmberServer(sources);

app.use("/", express.static(path.resolve(__dirname, "../../dist/client")));
app.get("/", (req: any, res: any) => {
  console.log("Request :", req);
  res.sendFile(path.resolve(__dirname, "../../public/index.html"));
});

io.on("connection", (socket: any) => {
  console.log("User connected :", socket.id);
  const sendSources = () => {
    sources = getSettings();
    const emberLabelAndTally = handleEmberServer.getEmberState();
    emberLabelAndTally.forEach((labelAndTally, index) => {
      sources[index].label[0].label = labelAndTally.label[0];
      sources[index].label[1].label = labelAndTally.label[1];
      sources[index].tally[0].tally = labelAndTally.tally[0];
      sources[index].tally[1].tally = labelAndTally.tally[1];
    });
    saveSettings(sources)
    socket.emit(IO.FULL_SOURCE_LIST, sources);
  };
  const clientTimerSources = setInterval(() => sendSources(), 100);

  socket
    .on(IO.GET_SOURCE_LIST, () => {
      console.log("Get Source list");
      sendSources();
    })
    .on("disconnect", () => {
      console.log("User disconnected");
      clearInterval(clientTimerSources);
    });
});

server.listen(3000);
console.log("Server started on port 3000");
