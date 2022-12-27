import React from "react";
import { ILabelAndTallyState, ISource } from "../../sharedcode/interfaces";

interface ISourceOverlayProps {
  source: ISource;
  labelAndTallyState: ILabelAndTallyState;
}

export const SourceOverlay = (props: ISourceOverlayProps) => {
  let windowStyling: React.CSSProperties = {
    position: "absolute",
    top: props.source.positionY,
    left: props.source.positionX,
    width: props.source.width,
    height: props.source.height,
    border:
      "solid 3px " +
      (props.labelAndTallyState?.tally[0]
        ? props.source.tallyColors[0]
        : "grey"),
    color: "red",
    fontSize: "1.5rem",
  };

  let labelStyles: React.CSSProperties[];

  labelStyles = props.source.sourceElements.map((element) => {
    const tally =
      element.tallyIndex >= 0
        ? props.labelAndTallyState?.tally[element.tallyIndex]
        : false;
    const backgroundColor = tally
      ? props.source.tallyColors[element.tallyIndex]
      : element.backgroundColor;
    return {
      position: "absolute",
      top: element.positionY || 30,
      left: element.positionX || 50,
      width: element.width || 100,
      height: element.height || 50,
      color: element.color || "white",
      backgroundColor: backgroundColor,
    };
  });

  return (
    <div style={windowStyling}>
      {labelStyles.map((labelStyle, index) => (
        <div key={index} style={labelStyle}>
          {props.labelAndTallyState?.label[props.source.sourceElements[index].labelIndex]}
        </div>
      ))}
    </div>
  );
};
