import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  IEmberState,
  ILabelAndTallyState,
} from "../../sharedcode/stateInterface";
import {
  IGlobalSettings,
  ISettings,
} from "../../sharedcode/settingsInterface";
import { IKaleidoLayouts, ISource } from "../../sharedcode/layoutInterface";
import * as IO from "../../sharedcode/IO_CONSTANTS";
import "../style/app.css";
import { SourceOverlay } from "./SourceOverlay";

const urlParams = new URLSearchParams(window.location.search);
const selectedKaleidoOutput: number = parseInt(urlParams.get("output")) - 1 || 0;

const Overlay = () => {
  const [selectedLayout, setSelectedLayout] = useState(-1);
  const [sources, setSources] = useState<ISource[]>([]);
  const [globalSettings, setGlobalSettings] = useState<IGlobalSettings>(
    {} as IGlobalSettings
  );
  const [labelAndTallyState, setLabelAndTallyState] = useState<
    ILabelAndTallyState[]
  >([]);

  useEffect(() => {
    const socketClient = io();
    console.log("socketClient :", socketClient);
    socketClient
      .on(IO.SEND_SETTINGS, (receivedSettings: ISettings) => {
        console.log("receivedSettings :", receivedSettings);
        
        setGlobalSettings(
          receivedSettings.kaleidoOutputs[selectedKaleidoOutput].globalSettings
        );
        setSelectedLayout(
          receivedSettings.kaleidoOutputs[selectedKaleidoOutput].selectedLayout
        );
      })
      .on(IO.SEND_STATE, (receivedState: IEmberState) => {
        console.log("receivedState :", receivedState);
        
        setLabelAndTallyState(
          receivedState.kaleidoOutputsState[selectedKaleidoOutput].labelAndTallyState
        );
      })
      .on(IO.SEND_LAYOUT, (receivedLayouts: IKaleidoLayouts) => {
        console.log("receivedLayouts :", receivedLayouts);
        if (selectedLayout === -1) {
          setSources(receivedLayouts.defaultKaleidoLayout);
        } else {
          setSources(receivedLayouts.kaleidoLayouts[selectedLayout].sources);
        }
      });
  }, []);

  return (
    <div className="app">
      <div>
        {sources?.map((source: ISource, index) => (
          <SourceOverlay
            key={index}
            source={source}
            globalSettings={globalSettings}
            labelAndTallyState={labelAndTallyState[source.emberStateIndex]}
          />
        ))}
      </div>
    </div>
  );
};

export default Overlay;
