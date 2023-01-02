import React from "react";
import {
  IGlobalSettings,
  ILabelAndTallyState,
  ISource,
  ISourceElement,
} from "../../sharedcode/interfaces";

interface ISourceOverlayProps {
  source: ISource;
  globalSettings: IGlobalSettings;
  labelAndTallyState: ILabelAndTallyState;
}

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
    border: "solid " + globalSettings.borderWidth + " " + (tally ? tallyColor : "grey"),
    borderRadius: globalSettings.borderRadius,
    boxShadow: "none",
    color: "red",
    fontSize: "1.5rem",
    fontFamily: globalSettings.fontFamily,
  };
};

const labelStyling = (
  element: ISourceElement,
  globalSettings: IGlobalSettings,
  tallyValue: boolean,
  tallyColor: string
): React.CSSProperties => {
  const tally = element.tallyIndex >= 0 ? tallyValue : false;
  const backgroundColor = tally ? tallyColor : element.backgroundColor;
  return {
    position: "absolute",
    top: element.positionY || 30,
    left: element.positionX || 50,
    width: element.width || 100,
    height: element.height || 50,
    color: element.color || "white",
    backgroundColor: backgroundColor,
    fontFamily: globalSettings.fontFamily,
    border: "solid " + globalSettings.borderWidth + " " + (tally ? tallyColor : "grey"),
    borderRadius: globalSettings.borderRadius,
    boxShadow: "none",
  };
};

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
        (element: ISourceElement, index: number) => (
          <div
            key={index}
            style={labelStyling(
              element,
              props.globalSettings,
              props.labelAndTallyState.tally[element.tallyIndex],
              props.source.tallyColors[element.tallyIndex]
            )}
          >
            {props.labelAndTallyState?.label[element.labelIndex]}
          </div>
        )
      )}
    </div>
  );
};
