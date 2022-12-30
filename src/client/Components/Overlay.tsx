import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ILabelAndTallyState, ISource } from "../../sharedcode/interfaces";
import * as IO from "../../sharedcode/IO_CONSTANTS";
import "../style/app.css";
import { SourceOverlay } from "./SourceOverlay";

const Overlay = () => {
  const [sources, setSources] = useState<ISource[]>([]);
  const [labelAndTallyState, setLabelAndTallyState] = useState<
    ILabelAndTallyState[]
  >([]);

  useEffect(() => {
    const socketClient = io();
    console.log("socketClient :", socketClient);
    socketClient.emit(IO.GET_SETTINGS);
    socketClient
      .on(IO.SEND_SETTINGS, (receivedSources: ISource[]) => {
        setSources(receivedSources);
      })
      .on(IO.SEND_STATE, (receivedState: ILabelAndTallyState[]) => {
        setLabelAndTallyState(receivedState);
      });
  }, []);

  return (
    <div className="app">
      <div>
        {sources.map((source: ISource, index) => (
          <SourceOverlay
            key={index}
            source={source}
            labelAndTallyState={labelAndTallyState[source.emberStateIndex]}
          />
        ))}
      </div>
    </div>
  );
};

export default Overlay;
