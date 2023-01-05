import fs from "fs";
import os from "os";
import path from "path";
import {
  IEmberState,
  ILabelAndTallyState,
  ISettings,
} from "../../sharedcode/interfaces";
import { defaultLayout } from "./defaultLayout";

const homeDir = os.homedir();
const SETTINGS_FILE = path.join(homeDir, "htmloverlay-settings.json");
const EMBER_STATE_FILE = path.join(homeDir, "htmloverlay-ember-state.json");

export const getSettings = (): ISettings => {
  try {
    const data: ISettings = JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8"));
    if (data.layoutFileList?.[data.selectedLayout || 0]) {
      data.sources = JSON.parse(
        fs.readFileSync(data.layoutFileList?.[data.selectedLayout || 0], "utf8")
      ) as ISettings["sources"];
    }
    return data;
  } catch (e) {
    console.log("Error reading settings file", e);
    const data: ISettings = {
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

export const getStoredEmberState = (): IEmberState => {
  try {
    const data: IEmberState = JSON.parse(
      fs.readFileSync(EMBER_STATE_FILE, "utf8")
    );
    return data;
  } catch (e) {
    console.log("Error reading state file", e);
    let emptyData: ILabelAndTallyState[] = [];
    for (let index = 0; index < 100; index++) {
      emptyData.push({
        identifier: "Source " + String(index + 1).padStart(3, "0"),
        label: ["Src " + String(index + 1).padStart(3, "0"), "label 2", "", ""],
        tally: [false, false, false, false],
      });
    }
    saveEmberState({ labelAndTallyState: emptyData, selectedLayout: 0 });
    return { labelAndTallyState: emptyData, selectedLayout: 0 };
  }
};

export const saveEmberState = (emberState: IEmberState): void => {
  fs.writeFileSync(EMBER_STATE_FILE, JSON.stringify(emberState));
};
