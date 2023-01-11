export interface IKaleidoLayouts {
  kaleidoLayouts: IKaleidoLayout[];
}

export interface IKaleidoLayout {
  sources?: ISource[];
}

export interface ISource {
  sourceElements: ISourceElement[];
  emberStateIndex: number;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  tallyColors: string[];
  borderWidth?: string;
  borderColor?: string;
}

export interface ISourceElement {
  labelIndex?: number;
  tallyIndex?: number;
  borderOnlyTally?: boolean;
  clockTimeZone?: string;
  clockFormat?: string;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  fontSize?: string;
  color?: string;
  backgroundColor?: string;
  borderWidth?: string;
  borderColor?: string;
}


