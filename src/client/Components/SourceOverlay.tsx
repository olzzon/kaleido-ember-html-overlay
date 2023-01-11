import React from "react";
import { ILabelAndTallyState } from "../../sharedcode/stateInterface";
import { IGlobalSettings } from "../../sharedcode/settingsInterface";
import { ClockElement } from "./ClockElement";
import { TextTallyElement } from "./TextTallyElement";
import { ISource, ISourceElement } from "../../sharedcode/layoutInterface";

const windowStyling = (
  source: ISource,
  globalSettings: IGlobalSettings,
  tally: boolean,
  tallyColor: string
): React.CSSProperties => {
  return {
    position: "absolute",
    top: source.positionY,
    left: source.positionX,
    width: source.width,
    height: source.height,
    border:
      "solid " +
      source.borderWidth +
      " " +
      (tally ? tallyColor : source.borderColor || "grey"),
    borderRadius: globalSettings.borderRadius,
    boxShadow: "none",
    color: "red",
    fontSize: "1.5rem",
    fontFamily: globalSettings.fontFamily,
  };
};

interface ISourceOverlayProps {
  source: ISource;
  globalSettings: IGlobalSettings;
  labelAndTallyState: ILabelAndTallyState;
}

export const SourceOverlay = (props: ISourceOverlayProps) => {
  return (
    <div
      style={windowStyling(
        props.source,
        props.globalSettings,
        props.labelAndTallyState?.tally[0],
        props.source.tallyColors[0]
      )}
    >
      {props.source.sourceElements.map(
        (element: ISourceElement, index: number) =>
          element.clockTimeZone ? (
            <ClockElement
              key={index}
              element={element}
              globalSettings={props.globalSettings}
              tallyState={props.labelAndTallyState.tally[element.tallyIndex]}
              tallyColor={props.source.tallyColors[element.tallyIndex]}
            />
          ) : (
            <TextTallyElement
              key={index}
              element={element}
              globalSettings={props.globalSettings}
              label={props.labelAndTallyState?.label[element.labelIndex]}
              tallyState={props.labelAndTallyState.tally[element.tallyIndex]}
              tallyColor={props.source.tallyColors[element.tallyIndex]}
            />
          )
      )}
    </div>
  );
};
