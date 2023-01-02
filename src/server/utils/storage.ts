import fs from "fs";
import os from "os";
import path from "path";
import {
  ILabelAndTallyState,
  ISettings,
} from "../../sharedcode/interfaces";
import { defaultLayout } from "./defaultLayout";

const homeDir = os.homedir();
const SETTINGS_FILE = path.join(homeDir, "htmloverlay-settings.json");
const EMBER_STATE_FILE = path.join(homeDir, "htmloverlay-ember-state.json");

export const getSettings = (): ISettings => {
  try {
    const data: ISettings = JSON.parse(
      fs.readFileSync(SETTINGS_FILE, "utf8")
    );
    return data;
  } catch (e) {
    console.log("Error reading settings file", e);
    const data: ISettings = 
      {
        globalSettings: {
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          borderWidth: "2px",
          borderRadius: "5px",
        },
        sources: defaultLayout,
      };
  
    saveSettings(data);
    return data;
  }
};

export const saveSettings = (settings: ISettings): void => {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings));
};

export const getLabelTallyState = (): ILabelAndTallyState[] => {
  try {
    const data: ILabelAndTallyState[] = JSON.parse(
      fs.readFileSync(EMBER_STATE_FILE, "utf8")
    );
    return data;
  } catch (e) {
    console.log("Error reading state file", e);
    let emptyData: ILabelAndTallyState[] = [];
    for (let index = 0; index < 100; index++) {
      emptyData.push({
        identifier: "Source " + String(index + 1).padStart(3, "0"),
        label: ["", "", "", ""],
        tally: [false, false, false, false],
      });
    }
    saveLabelTallyState(emptyData);
    return emptyData;
  }
};

export const saveLabelTallyState = (
  tallyAndLabelState: ILabelAndTallyState[]
): void => {
  fs.writeFileSync(EMBER_STATE_FILE, JSON.stringify(tallyAndLabelState));
};
