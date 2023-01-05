export interface ISettings {
  globalSettings: IGlobalSettings;
  sources: ISource[];
  layoutFileList?: string[];
  selectedLayout?: number;
}

export interface IGlobalSettings {
  fontFamily: string // '"Helvetica Neue", Helvetica, Arial, sans-serif'
  borderWidth: string // "1px solid "
  borderRadius: string // "2px"
}

export interface ISource {
  sourceElements: ISourceElement[];
  emberStateIndex: number;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  tallyColors: string[];
}

export interface ISourceElement {
  labelIndex?: number;
  tallyIndex?: number;
  clockTimeZone?: string;
  clockFormat?: string;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  fontSizePercentage?: number;
  color?: string;
  backgroundColor?: string;
}

export interface IEmberState {
  labelAndTallyState: ILabelAndTallyState[];
  selectedLayout: number;
}

export interface ILabelAndTallyState {
  identifier: string;
  label: string[];
  tally: boolean[];
}

