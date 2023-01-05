import { IEmberState, ILabelAndTallyState } from "../sharedcode/interfaces";

const EmberServer = require("node-emberplus").EmberServer;

const jsonTree = (emberState: IEmberState) => {
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
        {
          // path "0.1"
          identifier: "layoutSelector",
          children: [
            {
              identifier: "load layout",
              value: emberState,
              min: 1,
              max: 100,
              access: "readWrite",
            },
          ],
        },
        {
          // path "0.2"
          identifier: "sources",
          children: addSource(emberState.labelAndTallyState),
        },
      ],
    },
  ];
  return tree;
};

const addSource = (sources: ILabelAndTallyState[]) => {
  const sourceChilds = sources?.map(
    (source: ILabelAndTallyState) => {
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

export const createEmberTree = (emberState: IEmberState) => {
  const tree = jsonTree(emberState);
  return EmberServer.createTreeFromJSON(tree);
};
