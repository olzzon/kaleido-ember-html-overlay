import React, { useEffect, useState } from "react";
import { ISourceElement } from "../../sharedcode/layoutInterface";
import { IGlobalSettings} from "../../sharedcode/settingsInterface";

const clockStyling = (
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
    fontSize: element.fontSizePercentage || 100,
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

interface IClockElementProps {
  element: ISourceElement;
  globalSettings: IGlobalSettings;
  tallyState: boolean;
  tallyColor: string;
}

export const ClockElement = (props: IClockElementProps) => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    setInterval(() => {
      let date = new Date().toLocaleString(
        props.element.clockFormat || "en-US",
        {
          timeZone: props.element.clockTimeZone,
          hour12: false,
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }
      );
      setTime(date);
    }, 1000);
  }, []);

  return (
    <div
      key={props.element.labelIndex}
      style={clockStyling(
        props.element,
        props.globalSettings,
        props.tallyState,
        props.tallyColor
      )}
    >
      {time}
    </div>
  );
};
