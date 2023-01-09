import {
  IEmberState,
  IKaleidoState,
  ILabelAndTallyState,
} from "../sharedcode/stateInterface";

import { createEmberTree } from "./emberTree";
import { EmberServer } from "node-emberplus/lib/server/ember-server";
import { getStoredEmberState } from "./utils/storage";
import { ISettings } from "../sharedcode/settingsInterface";

interface IEmberServerProps {
  hostIp: string;
  port: number;
  settings: ISettings;
}

export class HandleEmberServer {
  emberServer: EmberServer;

  constructor(props: IEmberServerProps) {
    const storedEmberState = getStoredEmberState(props.settings);
    const tree = createEmberTree(
      storedEmberState,
      props.settings.kaleidoOutputs.length
    );
    this.emberServer = new EmberServer({
      host: props.hostIp,
      port: props.port,
      tree: tree,
    });

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

  getEmberState = (): IEmberState => {
    const tree = this.emberServer.toJSON();
    let kaleidoState: IKaleidoState[] = [];
    for (let i = 1; i < tree[0].children.length; i++) {
      let emberLabelAndTallyState: ILabelAndTallyState[] = tree[0].children[
        i
      ].children[1].children.map((child: any) => {
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
      kaleidoState.push({
        labelAndTallyState: emberLabelAndTallyState,
        selectedLayout: tree[0].children[i].children[0].children[0].value,
      });
    }
    let emberState: IEmberState = {
      kaleidoOutputsState: kaleidoState,
    };
    return emberState;
  };
}
