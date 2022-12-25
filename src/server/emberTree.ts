const EmberServer = require("node-emberplus").EmberServer;
const { ParameterType, FunctionArgument } = require("node-emberplus").EmberLib;

const jsonTree = [
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
        identifier: "labels",
        children: [
          {
            identifier: "Source 1",
            children: [
              { identifier: "primary", value: "Xborg", access: "readWrite" },
              { identifier: "secondary", value: "Ext38", access: "readWrite" },
              { identifier: "tally1", value: true, access: "readWrite"},
              { identifier: "tally2", value: true, access: "readWrite"},
            ],
          },
          {
            identifier: "Source 2",
            children: [
              { identifier: "primary", value: "Nyborg", access: "readWrite" },
              { identifier: "secondary", value: "Ext50", access: "readWrite" },
              { identifier: "tally1", value: false, access: "readWrite"},
              { identifier: "tally2", value: true, access: "readWrite"},
            ],
          },
        ],
      },
    ],
  },
];
export const root = EmberServer.createTreeFromJSON(jsonTree);
