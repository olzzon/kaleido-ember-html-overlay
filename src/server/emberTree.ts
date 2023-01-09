import { ISettings } from "../sharedcode/settingsInterface";
import {
  IEmberState,
  IKaleidoState,
  ILabelAndTallyState,
} from "../sharedcode/stateInterface";

const EmberServer = require("node-emberplus").EmberServer;

const jsonTree = (emberState: IEmberState, numberOfOutputs: number) => {
  const tree = [
    {
      // path "0"
      identifier: "Kaleido overlay - Ember",
      children: [
        {
          // path "0.0"
          identifier: "identity",
          children: [
            { identifier: "product", value: "Kaleido overlay - Ember" },
            {
              identifier: "Author",
              value: "Olzzon",
              access: "readWrite",
            },
          ],
        },
        ...addKaleidoOutputs(emberState, numberOfOutputs),
      ],
    },
  ];
  return tree;
};

const addKaleidoOutputs = (
  emberState: IEmberState,
  numberOfOutputs: number
) => {
  const outputs = [];
  for (let i = 0; i < numberOfOutputs; i++) {
    outputs.push({
      identifier: "output" + String(i + 1).padStart(2, "0"),
      children: [
        {
          // path "0.1.0"
          identifier: "layoutSelector",
          children: [
            {
              identifier: "load layout",
              value: emberState.kaleidoOutputsState?.[i]?.selectedLayout || 0,
              min: 1,
              max: 100,
              access: "readWrite",
            },
          ],
        },
        addSources(emberState, i),
      ],
    });
  }
  return outputs;
};

const addSources = (emberState: IEmberState, index: number) => {
  const sourceChilds = addSource(emberState.kaleidoOutputsState[index])
  const sources = {
    // path "0.1.1-length"
    identifier: "sources",
    children: sourceChilds,
  };
  return sources;
};

const addSource = (kaleidoState: IKaleidoState) => {
  const sourceChilds = kaleidoState.labelAndTallyState?.map(
    (source: ILabelAndTallyState, index) => {
      return {
        identifier: source.identifier,
        children: [
          { identifier: "label1", value: source.label[0], access: "readWrite" },
          { identifier: "label2", value: source.label[1], access: "readWrite" },
          { identifier: "label3", value: source.label[2], access: "readWrite" },
          { identifier: "label4", value: source.label[3], access: "readWrite" },
          { identifier: "tally1", value: source.tally[0], access: "readWrite" },
          { identifier: "tally2", value: source.tally[1], access: "readWrite" },
          { identifier: "tally3", value: source.tally[2], access: "readWrite" },
          { identifier: "tally4", value: source.tally[3], access: "readWrite" },
        ],
      };
    }
  );
  return sourceChilds;
};

export const createEmberTree = (
  emberState: IEmberState,
  numberOfOutputs: number
) => {
  const treeJSON = jsonTree(emberState, numberOfOutputs);
  console.log("createEmberTree", treeJSON);
  const tree = EmberServer.createTreeFromJSON(treeJSON);
  return tree;
};
