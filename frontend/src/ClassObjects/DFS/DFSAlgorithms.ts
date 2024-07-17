import {
  DFSPseudoCode,
  DFSPseudoCodeKeys,
} from "../../components/Simulation/PseudoCode/DFSPseudoCodeData";
import { DFSMemento } from "./DFSMemento";
import { DFSAnimationController } from "./DFSAnimationController";
import { Colors, graphType } from "../../types/GraphTypes";
import { DFSNode } from "./DFSNode";
import { ActionType } from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { setGraphNodes } from "../../store/reducers/alghoritms/dfs-reducer";

export function buildDFSNodes(graphData: graphType, controller: DFSAnimationController) {
  let arrayOfDFS: DFSNode[] = [];
  let result: DFSNode | undefined;

  graphData.nodes.forEach((node) => {
    arrayOfDFS.push(new DFSNode(node, node, ""));
  });

  graphData.links.forEach((link) => {
    arrayOfDFS.forEach((node) => {
      if (link.source === node.value) {
        const adj = arrayOfDFS.find((dfsNode) => dfsNode.value === link.target);
        if (adj !== undefined) node.addAdjacent(adj);
        node.addLink(link);
      }
    });
  });

  result = arrayOfDFS[0];
  arrayOfDFS.sort((a, b) => a.id - b.id);
  controller.setGraphNodes(arrayOfDFS);
  controller.dispatch(setGraphNodes(arrayOfDFS));
  return result;
}

export const dfsAnimation = (
  initialNode: DFSNode | undefined,
  memento: DFSMemento,
  startValue: number,
  graphData: DFSNode[]
) => {
  if (initialNode === undefined) {
    memento.addError({ line: 0, name: "Search" }, initialNode, `The graph is empty!`, [], [], []);
  }
  const startNode = graphData.find((node) => node.value === startValue);
  if (startNode === undefined) {
    memento.addError(
      { line: 0, name: "Search" },
      initialNode,
      `Insert the initial value please!`,
      [],
      [],
      []
    );
  }
  memento.addBlank({ line: 1, name: "Search" }, initialNode);
  graphData.forEach((node) => {
    memento.addSnapshot(
      { line: 2, name: "Search" },
      initialNode,
      node.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: node.id, role: "V" }]
    );
    node.setColor(Colors.White);
  });
};

export const combineDFSPseudoCode = (currentAlg: DFSPseudoCodeKeys) => {
  return DFSPseudoCode[currentAlg];
};
