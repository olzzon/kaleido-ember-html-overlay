export interface IEmberState {
  kaleidoOutputsState: IKaleidoState[];
}

export interface IKaleidoState {
  labelAndTallyState: ILabelAndTallyState[];
  selectedLayout: number;
}

export interface ILabelAndTallyState {
  identifier: string;
  label: string[];
  tally: boolean[];
}

