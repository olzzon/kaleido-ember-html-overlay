import { IEmberLabelAndTally, ISource } from "../sharedcode/interfaces";

import { createEmberTree } from "./emberTree";
import { EmberServer } from "node-emberplus/lib/server/ember-server";

export class HandleEmberServer {
  sources: ISource[];
  emberServer: EmberServer;

  constructor(sources: ISource[]) {
    this.sources = sources;

    this.emberServer = new EmberServer({
      host: "0.0.0.0",
      port: 9000,
      tree: createEmberTree(this.sources),
    }); // start server on port 9000

    this.emberServer.on("error", (e: any) => {
      console.log("Server Error", e);
    });

    this.emberServer
      .listen()
      .then(() => {
        console.log("Emberserverlistening on port 9000");
      })
      .catch((e: any) => {
        console.log(e.stack);
      });
  }

  getEmberState = () => {
    const tree = this.emberServer.toJSON();
    let emberLabelAndTally: IEmberLabelAndTally[] =
      tree[0].children[1].children.map((child: any) => {
        return {
          label: [child.children[0].value, child.children[1].value],
          tally: [child.children[2].value, child.children[3].value],
        };
      });
    return emberLabelAndTally;
  };
}
