import React, { useState } from "react";
import { io } from "socket.io-client";
import { ILabelAndTallyState, ISource } from "../../sharedcode/interfaces";
import * as IO from "../../sharedcode/IO_CONSTANTS";
import "../style/app.css";
import { SourceOverlay } from "./SourceOverlay";

const socketClient = io();
console.log("socketClient :", socketClient);

socketClient.emit(IO.GET_SETTINGS);

const Overlay = () => {
  const [sources, setSources] = useState<ISource[]>([]);
  const [labelAndTallyState, setLabelAndTallyState] = useState<ILabelAndTallyState[]>([]);

  socketClient
    .on(IO.SEND_SETTINGS, (receivedSources: ISource[]) => {
      //console.log("Sources received :", receivedSources);
      setSources(receivedSources);
    })
    .on(IO.SEND_STATE, (receivedState: ILabelAndTallyState[]) => {
      setLabelAndTallyState(receivedState);
    });

  return (
    <div className="app">
      {sources.map((source: ISource, index) => (
        <SourceOverlay key={index} source={source} labelAndTallyState={labelAndTallyState[source.emberStateIndex]}/>
      ))}
    </div>
  );
};

export default Overlay;
