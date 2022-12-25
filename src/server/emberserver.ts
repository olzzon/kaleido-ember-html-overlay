import { IEmberLabelAndTally, ISource } from "../sharedcode/interfaces";

import { EmberServer } from "node-emberplus";
import { root } from "./emberTree";

export const emberServer = new EmberServer({
  host: "0.0.0.0",
  port: 9000,
  tree: root,
}); // start server on port 9000

export const handleEmberServer = (sources: ISource[]) => {

  emberServer.on('error', (e: any) => {
    console.log("Server Error", e);
  });

  emberServer
    .listen()
    .then(() => {
      console.log("Emberserverlistening on port 9000");
    })
    .catch((e: any) => {
      console.log(e.stack);
    });
};

export const getEmberState = () => {
  const tree = emberServer.toJSON()
  let emberLabelAndTally: IEmberLabelAndTally[] = tree[0].children[1].children.map((child: any) => {
    return    {
      label: [child.children[0].value, child.children[1].value],
      tally: [child.children[2].value, child.children[3].value]
    } 
  });;
  return emberLabelAndTally
}
