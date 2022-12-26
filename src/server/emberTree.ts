import { ISource } from "../sharedcode/interfaces";

const EmberServer = require("node-emberplus").EmberServer;

const jsonTree = (sources: ISource[]) => {
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

const addSource = (sources: ISource[]) => {
  const sourceChilds = sources.map((source: ISource, index: number) => {
    return {
      identifier: "Source " + index,
      children: [
        { identifier: "label1", value: source.label[0].label, access: "readWrite" },
        { identifier: "label2", value: source.label[1].label, access: "readWrite" },
        { identifier: "tally1", value: source.tally[0].tally, access: "readWrite" },
        { identifier: "tally2", value: source.tally[1].tally, access: "readWrite" },
      ],
    };
  });
  return sourceChilds;
};

export const createEmberTree = (sources: ISource[]) => {
  const tree = jsonTree(sources);
  return EmberServer.createTreeFromJSON(tree);
};
