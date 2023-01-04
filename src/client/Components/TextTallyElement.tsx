import React from "react";
import { IGlobalSettings, ISourceElement } from "../../sharedcode/interfaces";

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
    fontSize: (element.fontSizePercentage || 100) + "%",
    backgroundColor: backgroundColor,
    fontFamily: globalSettings.fontFamily,
    border:
      "solid " +
      globalSettings.borderWidth +
      " " +
      (tally ? tallyColor : "grey"),
    borderRadius: globalSettings.borderRadius,
    boxShadow: "none",
  };
};

interface ITextTallyElementProps {
  element: ISourceElement;
  globalSettings: IGlobalSettings;
  tallyState: boolean;
  tallyColor: string;
  label: string;
}

export const TextTallyElement = (props: ITextTallyElementProps) => {
  return (
    <div
      key={props.element.labelIndex}
      style={labelStyling(
        props.element,
        props.globalSettings,
        props.tallyState,
        props.tallyColor
      )}
    >
      {props.label}
    </div>
  );
};