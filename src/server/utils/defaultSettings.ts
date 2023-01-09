import { ISettings, IOutput } from "../../sharedcode/settingsInterface";

const defaultKaleidoOutputs = (): IOutput[] => {
  return [
    {
      globalSettings: {
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        borderWidth: "2px",
        borderRadius: "5px",
      },
      outputName: "Kaleido 1",
      selectedLayout: 0,
    },
    {
      globalSettings: {
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        borderWidth: "2px",
        borderRadius: "5px",
      },
      outputName: "Kaleido 2",
      selectedLayout: 0,
    },
    {
      globalSettings: {
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        borderWidth: "2px",
        borderRadius: "5px",
      },
      outputName: "Kaleido 3",
      selectedLayout: 0,
    },
    {
      globalSettings: {
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        borderWidth: "2px",
        borderRadius: "5px",
      },
      outputName: "Kaleido 4",
      selectedLayout: 0,
    },
  ];
};

export const defaultSettings: ISettings = {
  layoutFileList: [],
  kaleidoOutputs: defaultKaleidoOutputs(),
};
