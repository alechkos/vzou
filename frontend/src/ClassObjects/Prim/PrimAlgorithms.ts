import {
  PrimPseudoCode,
  PrimPseudoCodeKeys,
} from "../../components/Simulation/PseudoCode/PrimPseudoCodeData";
import { graphType } from "../../types/GraphTypes";
import { PrimAnimationController } from "./PrimAnimationController";
import { PrimNode } from "./PrimNode";

export const combinePrimPseudoCode = (currentAlg: PrimPseudoCodeKeys) => {
  return PrimPseudoCode[currentAlg];
};

export function buildPrimNodes(graphData: graphType, controller: PrimAnimationController) {
  let arrayOfBF: PrimNode[] = [];
  let result: PrimNode | undefined;

  graphData.nodes.forEach((node) => {
    arrayOfBF.push(new PrimNode(node, node));
  });

  graphData.links.forEach((link) => {
    arrayOfBF.forEach((node) => {
      if (link.source === node.value) {
        const adj = arrayOfBF.find((primNode) => primNode.value === link.target);
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
