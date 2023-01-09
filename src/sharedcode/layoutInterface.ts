export interface IKaleidoLayouts {
  defaultKaleidoLayout: ISource[];
  kaleidoLayouts?: IKaleidoLayout[];
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


