import { ILabelAndTallyState } from "../sharedcode/interfaces";

const EmberServer = require("node-emberplus").EmberServer;

const jsonTree = (sources: ILabelAndTallyState[]) => {
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
          // path "0.0"
          identifier: "sources",
          children: addSource(sources),
        },
      ],
    },
  ];
  return tree;
};

const addSource = (sources: ILabelAndTallyState[]) => {
  const sourceChilds = sources.map((source: ILabelAndTallyState, index: number) => {
    return {
      identifier: source.identifier,
      children: [
        { identifier: "label1", value: source.label[0], access: "readWrite" },
        { identifier: "label2", value: source.label[1], access: "readWrite" },
        { identifier: "label3", value: source.label[2], access: "readWrite" },
        { identifier: "label4", value: source.label[3], access: "readWrite" },
        { identifier: "tally1", value: source.tally[1], access: "readWrite" },
        { identifier: "tally2", value: source.tally[2], access: "readWrite" },
        { identifier: "tally3", value: source.tally[3], access: "readWrite" },
        { identifier: "tally4", value: source.tally[4], access: "readWrite" },
      ],
    };
  });
  return sourceChilds;
};

export const createEmberTree = (sources: ILabelAndTallyState[]) => {
  const tree = jsonTree(sources);
  return EmberServer.createTreeFromJSON(tree);
};
