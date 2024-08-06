import {
  BellmanFordPseudoCode,
  BellmanFordPseudoCodeKeys,
} from "../../components/Simulation/PseudoCode/BelmanFordPseudoCode";
import { graphType } from "../../types/GraphTypes";
import { BellmanFordNode } from "./BellmanFordNode";
import { BellmanFordAnimationController } from "./BellmanFordAnimationController";

export const combineBellmanFordPseudoCode = (currentAlg: BellmanFordPseudoCodeKeys) => {
  return BellmanFordPseudoCode[currentAlg];
};

export function buildBellmanFordNodes(
  graphData: graphType,
  controller: BellmanFordAnimationController
) {
  let arrayOfBF: BellmanFordNode[] = [];
  let result: BellmanFordNode | undefined;

  graphData.nodes.forEach((node) => {
    arrayOfBF.push(new BellmanFordNode(node, node));
  });

  graphData.links.forEach((link) => {
    arrayOfBF.forEach((node) => {
      if (link.source === node.value) {
        const adj = arrayOfBF.find((dfsNode) => dfsNode.value === link.target);
        if (adj !== undefined) node.addAdjacent(adj);
        node.addLink(link);
      }
    });
  });

  result = arrayOfBF[0];
  arrayOfBF.sort((a, b) => a.id - b.id);
  controller.setGraphNodes(arrayOfBF);
  return result;
}
