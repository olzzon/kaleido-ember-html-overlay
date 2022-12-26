export interface ILabeledSource {
  label: string;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  color?: string;
  backgroundColor?: string;
  tallyIndex?: number;
}
export interface ITally {
  tally: boolean;
  color: string;
}
export interface ISource {
  label: ILabeledSource[];
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  tally: ITally[];
}


export interface IEmberLabelAndTally {
  label: string[];
  tally: boolean[];
}
