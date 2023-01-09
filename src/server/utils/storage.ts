import fs from "fs";
import os from "os";
import path from "path";
import { ISettings } from "../../sharedcode/settingsInterface";
import {
  IKaleidoLayout,
  IKaleidoLayouts,
} from "../../sharedcode/layoutInterface";
import { IEmberState, ILabelAndTallyState } from "../../sharedcode/stateInterface";

import { defaultLayout } from "./defaultLayout";
import { defaultSettings } from "./defaultSettings";

const homeDir = os.homedir();
const SETTINGS_FILE = path.join(homeDir, "htmloverlay-settings.json");
const EMBER_STATE_FILE = path.join(homeDir, "htmloverlay-ember-state.json");

export const getSettings = (): ISettings => {
  try {
    const data: ISettings = JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8"));
    return data;
  } catch (e) {
    console.log("Error reading settings file", e);
    const data: ISettings = defaultSettings;
    saveSettings(data);
    return data;
  }
};

export const saveSettings = (settings: ISettings): void => {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings));
};

export const getLayouts = (settings: ISettings): IKaleidoLayouts => {
  try {
    let data: IKaleidoLayouts = {
      defaultKaleidoLayout: JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8"))
        .defaultKaleidoLayout,
    };
    if (settings.layoutFileList) {
      data.kaleidoLayouts = [];
      settings.layoutFileList.forEach((layoutFile, index) => {
        const file = JSON.parse(
          fs.readFileSync(layoutFile, "utf8")
        ) as IKaleidoLayout;
        if (file) {
          data.kaleidoLayouts?.push(file);
        }
      });
    }
    return data;
  } catch (e) {
    console.log("Error reading layout files", e);
    return { defaultKaleidoLayout: defaultLayout };
  }
};

export const getStoredEmberState = (settings: ISettings): IEmberState => {
  let data: IEmberState;
  try {
    data = JSON.parse(fs.readFileSync(EMBER_STATE_FILE, "utf8"));
    return data;
  } catch (e) {
    console.log("Error reading state file", e);
    data = createEmptyEmberState(settings);
    saveEmberState(data);
    return data;
  }
};

export const saveEmberState = (emberState: IEmberState): void => {
  fs.writeFileSync(EMBER_STATE_FILE, JSON.stringify(emberState));
};

const createEmptyEmberState = (settings: ISettings): IEmberState => {
  let data: IEmberState;
  data = {
    kaleidoOutputsState: ([] = []),
  };

  let labelAndTallyState: ILabelAndTallyState[] = [];
  for (let index = 0; index < 100; index++) {
    labelAndTallyState.push({
      identifier: "Source" + String(index + 1).padStart(3, "0"),
      label: ["Src " + String(index + 1).padStart(3, "0"), "label 2", "", ""],
      tally: [false, false, false, false],
    });
  }

  settings.kaleidoOutputs.forEach(() => {
    data.kaleidoOutputsState.push({
      selectedLayout: -1,
      labelAndTallyState: labelAndTallyState,
    });
  });

  return data;
};

