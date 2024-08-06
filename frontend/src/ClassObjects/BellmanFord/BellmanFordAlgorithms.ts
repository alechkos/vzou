import {
  BellmanFordPseudoCode,
  BellmanFordPseudoCodeKeys,
} from "../../components/Simulation/PseudoCode/BelmanFordPseudoCode";
import { graphType, TableDataType } from "../../types/GraphTypes";
import { BellmanFordNode } from "./BellmanFordNode";
import { BellmanFordAnimationController } from "./BellmanFordAnimationController";
import { DFSNode } from "../DFS/DFSNode";
import { DFSMemento } from "../DFS/DFSMemento";
import { ActionType } from "../../components/Simulation/BinaryTree/BinaryTreeTypes";

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

export function bellmanFordAnimation(
  showNode: BellmanFordNode | undefined,
  memento: DFSMemento,
  graphData: BellmanFordNode[],
  initialNode: BellmanFordNode | undefined
) {
  const passedNodes: number[] = [];
  const visitedNodes: number[] = [];
  const tableData: TableDataType = [];

  const startNode = graphData.find((node) => node.id === initialNode!.id);
  if (startNode) {
    memento.addBlank({ line: 0, name: "Search" }, showNode);
    memento.addBlank({ line: 1, name: "Search" }, showNode);
    graphData.forEach((node) => {
      tableData.push({
        id: node.id,
        data: { pi: node.pi ? node.pi.id : -1, d: node.d },
      });

      memento.addSnapshot(
        { line: 2, name: "Search" },
        showNode,
        node.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: node.id, role: "u" }],
        visitedNodes,
        passedNodes,
        tableData
      );

      memento.addSnapshot(
        { line: 3, name: "Search" },
        showNode,
        node.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: node.id, role: "u" }],
        visitedNodes,
        passedNodes,
        tableData
      );
    });
  }
}
