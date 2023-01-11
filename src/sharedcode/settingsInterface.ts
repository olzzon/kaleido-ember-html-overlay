export interface ISettings {
  kaleidoOutputs: IOutput[];
  layoutFileList?: string[];
}

export interface IOutput {
  globalSettings: IGlobalSettings;
  outputName: string;
  selectedLayout?: number;
}

export interface IGlobalSettings {
  fontFamily: string // '"Helvetica Neue", Helvetica, Arial, sans-serif'
  borderRadius: string // "2px"
}

