import fs from "fs";
import { Label } from "node-emberplus/lib/common/label";
import os from "os";
import path from "path";
import { ISource, ILabelAndTallyState } from "../../sharedcode/interfaces";

const homeDir = os.homedir();
const SETTINGS_FILE = path.join(homeDir, "htmloverlay-settings.json");
const EMBER_STATE_FILE = path.join(homeDir, "htmloverlay-ember-state.json");

export const getSettings = (): ISource[] => {
  try {
    const data: ISource[] = JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8"));
    return data;
  } catch (e) {
    console.log("Error reading settings file", e);
    const data: ISource[] = [
      {
        sourceElements: [
          {
            labelIndex: 0,
            height: 1080,
            width: 1920,
            positionX: 0,
            positionY: 0,
            color: "#000000",
            backgroundColor: "#ffffff",
            tallyIndex: 0,
          },
        ],
        emberStateIndex: 0,
        positionX: 0,
        positionY: 0,
        width: 1920,
        height: 1080,
        tallyColors: ["red", "green", "blue", "yeallow"]
      },
    ];
    saveSettings(data);
    return data;
  }
};

export const saveSettings = (settings: ISource[]): void => {
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
