import fs from "fs";
import os from "os";
import path from "path";
import { ISettings } from "../../sharedcode/settingsInterface";
import {
  IKaleidoLayout,
  IKaleidoLayouts,
} from "../../sharedcode/layoutInterface";
import {
  IEmberState,
  ILabelAndTallyState,
} from "../../sharedcode/stateInterface";

import { defaultLayout } from "./defaultLayout";
import { defaultSettings } from "./defaultSettings";

const homeDir = os.homedir();
const SETTINGS_FILE = path.join(homeDir, "htmloverlay-settings.json");
const EMBER_STATE_FILE = path.join(homeDir, "htmloverlay-ember-state.json");
const DEFAULT_LAYOUT = path.join(homeDir, "htmloverlay-default-layout.json");

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
  let layouts: IKaleidoLayout[] = [];
  try {
    layouts.push(
      JSON.parse(fs.readFileSync(DEFAULT_LAYOUT, "utf8"))
    );
  } catch (e) {
    console.log("Error reading default layout", e);
    saveDefaultLayout();
    layouts.push(defaultLayout);
  }
  if (settings.layoutFileList) {
    settings.layoutFileList.forEach((layoutFile) => {
      try {
        const file = JSON.parse(
          fs.readFileSync(layoutFile, "utf8")
        ) as IKaleidoLayout;
        if (file) {
          layouts.push(file);
        }
      } catch (e) {
        console.log("Error reading layout file", e);
      }
    });
    return {kaleidoLayouts: layouts}
  } else {
    return {kaleidoLayouts: [defaultLayout]}
  }
};

export const saveDefaultLayout = (): void => {
  console.log("Saving default layout");
  
  fs.writeFileSync(DEFAULT_LAYOUT, JSON.stringify(defaultLayout));
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
      selectedLayout: 0,
      labelAndTallyState: labelAndTallyState,
    });
  });

  return data;
};
