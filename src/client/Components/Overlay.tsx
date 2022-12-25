import { time } from "console";
import React, { useState } from "react";
import { io } from "socket.io-client";
import { ISource } from "../../sharedcode/interfaces";
import * as IO from "../../sharedcode/IO_CONSTANTS";
import "../style/app.css";
import { SourceOverlay } from "./SourceOverlay";

const socketClient = io();
console.log("socketClient :", socketClient);

socketClient.emit(IO.GET_SOURCE_LIST);

const Overlay = () => {
  const [sources, setSources] = useState<ISource[]>([]);

  socketClient.on(IO.FULL_SOURCE_LIST, (receivedSources: ISource[]) => {
    console.log("Sources received :", receivedSources);
    setSources(receivedSources);
  });

  return (
    <div className="app">
      {sources.map((source, index) => (
        <SourceOverlay key={index} {...source}  />
      ))}
    </div>
  );
};

export default Overlay;
