import {
  BFSPseudoCode,
  BFSPseudoCodeKeys,
} from "../../components/Simulation/PseudoCode/BfsPseudoCodeData";
import { BFSMemento } from "./BFSMemento";
import { BfsAnimationController } from "./BfsAnimationController";
import { Colors, graphType } from "../../types/GraphTypes";
import { BfsNode } from "./BfsNode";

export function buildBFSNodes(
  graphData: graphType,
  initialNode: number,
  controller: BfsAnimationController
) {
  let arrayOfBfs: BfsNode[] = [];
  let result: BfsNode | undefined;

  graphData.nodes.forEach((node) => {
    arrayOfBfs.push(new BfsNode(node, node, Colors.White));
  });

  graphData.links.forEach((link) => {
    arrayOfBfs.forEach((node) => {
      if (link.source === node.value) {
        const adj = arrayOfBfs.find((bfsNode) => bfsNode.value === link.target);
        if (adj !== undefined) node.addAdjacent(adj);
        node.addLink(link);
      }
    });
  });

  result = arrayOfBfs[0];
  return result;
}

export const bfsAnimation = (initialNode: BfsNode | undefined, memento: BFSMemento) => {
  if (initialNode === undefined) {
    memento.addError(
      { line: 0, name: "Search" },
      initialNode,
      `Please set the initial node`,
      [],
      [],
      []
    );
  }
};

export const combineBfsPseudoCode = (currentAlg: BFSPseudoCodeKeys) => {
  return BFSPseudoCode[currentAlg];
};
