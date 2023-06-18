export interface IKaleidoLayouts {
  kaleidoLayouts: IKaleidoLayout[];
}

export interface IKaleidoLayout {
  layouts?: ISourceLayout[];
  sources?: ISource[];
}

export interface ISourceLayout {
  sourceLayoutName: string;
  elementLayouts: IElementLayout[];
  width: number;
  height: number;
  tallyColors: string[];
  borderWidth: string;
  borderColor: string;
}

export interface IElementLayout {
  labelIndex?: number;
  tallyIndex?: number;
  borderOnlyTally?: boolean;
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

export interface ISource {
  useSourceLayout?: string;
  sourceElements: ISourceElement[];
  emberStateIndex: number;
  positionX: number;
  positionY: number;
  width?: number;
  height?: number;
  tallyColors?: string[];
  borderWidth?: string;
  borderColor?: string;
}

export interface ISourceElement {
  labelIndex?: number;
  tallyIndex?: number;
  borderOnlyTally?: boolean;
  clockTimeZone?: string;
  clockFormat?: string;
  positionX?: number;
  positionY?: number;
  width?: number;
  height?: number;
  fontSize?: string;
  color?: string;
  backgroundColor?: string;
  borderWidth?: string;
  borderColor?: string;
}


