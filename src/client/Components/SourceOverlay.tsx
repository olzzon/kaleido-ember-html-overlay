import React, { useState } from "react";
import { ISource } from "../../sharedcode/interfaces";

export const SourceOverlay = (source: ISource) => {
  let windowStyling: React.CSSProperties = {
    position: "absolute",
    top: source.positionY,
    left: source.positionX,
    width: source.width,
    height: source.height,
    border: "solid 3px " + (source.tally?.[0].tally ? source.tally?.[0].color : "grey"),
    color: "red",
    fontSize: "1.5rem",
  };

  let labelStyles: React.CSSProperties[];

  labelStyles = source.label.map((label, index) => {
    const tally = label.tallyIndex >= 0 ? source.tally?.[label.tallyIndex].tally : false;
    const backgroundColor =  tally ? source.tally?.[label.tallyIndex].color : label.backgroundColor;
    return {
      position: "absolute",
      top: label.positionY || 30,
      left: label.positionX || 50,
      width: label.width || 100,
      height: label.height || 50,
      color: label.color || "white",
      backgroundColor: backgroundColor,
    };
  });

  return (
    <div style={windowStyling}>
      {labelStyles.map((labelStyle, index) => (
        <div style={labelStyle}>{source.label[index].label}</div>
      ))}
    </div>
  );
};
