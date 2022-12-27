import { ILabelAndTallyState } from "../sharedcode/interfaces";

import { createEmberTree } from "./emberTree";
import { EmberServer } from "node-emberplus/lib/server/ember-server";
import { getLabelTallyState } from "./utils/storage";

export class HandleEmberServer {
  emberServer: EmberServer;
  labelAndTallyState: ILabelAndTallyState[] = [];

  constructor() {
    this.emberServer = new EmberServer({
      host: "0.0.0.0",
      port: 9000,
      tree: createEmberTree(getLabelTallyState()),
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

  getEmberState = (): ILabelAndTallyState[] => {
    const tree = this.emberServer.toJSON();
    let emberLabelAndTallyState: ILabelAndTallyState[] =
      tree[0].children[1].children.map((child: any) => {
        return {
          identifier: child.identifier,
          label: [
            child.children[0].value,
            child.children[1].value,
            child.children[2].value,
            child.children[3].value,
          ],
          tally: [
            child.children[4].value,
            child.children[5].value,
            child.children[6].value,
            child.children[7].value,
          ],
        };
      });
    return emberLabelAndTallyState;
  };
}
