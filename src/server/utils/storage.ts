import fs from "fs";
import os from "os";
import path from "path";
import { ISource } from "../../sharedcode/interfaces";

const homeDir = os.homedir();
const SETTINGS_FILE = path.join(homeDir, "htmloverlay-settings.json");

export const getSettings = (): ISource[] => {
  try {
    const data: ISource[] = JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8"));
    return data;
  } catch (e) {
    console.log("Error reading settings file", e);
    const data: ISource[] = [
      {
        label: [
          {
            label: "Source 1",
            height: 1080,
            width: 1920,
            positionX: 0,
            positionY: 0,
            color: "#000000",
            backgroundColor: "#ffffff",
            tallyIndex: 0,
          },
        ],
        positionX: 0,
        positionY: 0,
        width: 1920,
        height: 1080,
        tally: [
          { tally: false, color: "red" },
          { tally: true, color: "green" },
        ],
      },
    ];
    saveSettings(data);
    return data;
  }
};

export const saveSettings = (settings: ISource[]): void => {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings));
};
