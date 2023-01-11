import { ISettings, IOutput } from "../../sharedcode/settingsInterface";

const defaultKaleidoOutputs = (): IOutput[] => {
  return [
    {
      globalSettings: {
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        borderRadius: "5px",

      },
      outputName: "Output 1",
      selectedLayout: 0,
    },
    {
      globalSettings: {
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        borderRadius: "5px",
      },
      outputName: "Output 2",
      selectedLayout: 0,
    },
    {
      globalSettings: {
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        borderRadius: "5px",
      },
      outputName: "Output 3",
      selectedLayout: 0,
    },
    {
      globalSettings: {
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        borderRadius: "5px",
      },
      outputName: "Output 4",
      selectedLayout: 0,
    },
  ];
};

export const defaultSettings: ISettings = {
  layoutFileList: [],
  kaleidoOutputs: defaultKaleidoOutputs(),
};
