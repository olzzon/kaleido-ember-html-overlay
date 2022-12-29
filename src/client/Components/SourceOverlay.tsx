import React from "react";
import {
  ILabelAndTallyState,
  ISource,
  ISourceElement,
} from "../../sharedcode/interfaces";

interface ISourceOverlayProps {
  source: ISource;
  labelAndTallyState: ILabelAndTallyState;
}

const windowStyling = (
  source: ISource,
  tally: boolean,
  tallyColor: string
): React.CSSProperties => {
  return {
    position: "absolute",
    top: source.positionY,
    left: source.positionX,
    width: source.width,
    height: source.height,
    border: "solid 3px " + (tally ? tallyColor : "grey"),
    color: "red",
    fontSize: "1.5rem",
  };
};

const labelStyling = (
  element: ISourceElement,
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
  };
};

export const SourceOverlay = (props: ISourceOverlayProps) => {
  return (
    <div
      style={windowStyling(
        props.source,
        props.labelAndTallyState?.tally[0],
        props.source.tallyColors[0]
      )}
    >
      {Date.now()}
      {props.source.sourceElements.map(
        (element: ISourceElement, index: number) => (
          <div
            key={index}
            style={labelStyling(
              element,
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
