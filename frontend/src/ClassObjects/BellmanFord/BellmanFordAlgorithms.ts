import {
  BellmanFordPseudoCode,
  BellmanFordPseudoCodeKeys,
} from "../../components/Simulation/PseudoCode/BelmanFordPseudoCode";
import { graphType, TableDataType } from "../../types/GraphTypes";
import { BellmanFordNode } from "./BellmanFordNode";
import { BellmanFordAnimationController } from "./BellmanFordAnimationController";
import { ActionType } from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { BellmanFordMemento } from "./BellmanFordMemento";

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
  memento: BellmanFordMemento,
  graphData: BellmanFordNode[],
  initialNode: number,
  links: { source: number; target: number; weight?: number }[]
) {
  let passedNodes: number[] = [];
  let visitedNodes: number[] = [];
  const tableData: TableDataType = [];

  const relax = (u: BellmanFordNode, v: BellmanFordNode, w: number) => {
    passedNodes.push(v.id);
    visitedNodes.push(v.id);
    memento.addSnapshot(
      { line: 14, name: "Search" },
      showNode,
      v!.id,
      ActionType.HIGHLIGHT_LIGHT,
      [
        { id: u.id, role: "u" },
        { id: v.id, role: "v" },
      ],
      visitedNodes,
      passedNodes,
      tableData
    );

    memento.addSnapshot(
      { line: 15, name: "Search" },
      showNode,
      v.id,
      ActionType.HIGHLIGHT_LIGHT,
      [
        { id: u.id, role: "u" },
        { id: v.id, role: "v" },
      ],
      visitedNodes,
      passedNodes,
      tableData
    );

    if (v.d === -1 || v.d > u.d + w) {
      v.d = u.d + w;
      tableData.push({
        id: v.id,
        data: { pi: v.pi ? v.pi.id : -1, d: v.d },
      });

      memento.addSnapshot(
        { line: 16, name: "Search" },
        showNode,
        v.id,
        ActionType.HIGHLIGHT_LIGHT,
        [
          { id: u.id, role: "u" },
          { id: v.id, role: "v" },
        ],
        visitedNodes,
        passedNodes,
        tableData
      );
      v.pi = u;

      tableData.push({
        id: v.id,
        data: { pi: v.pi ? v.pi.id : -1, d: v.d },
      });
      memento.addSnapshot(
        { line: 17, name: "Search" },
        showNode,
        v.id,
        ActionType.HIGHLIGHT_LIGHT,
        [
          { id: u.id, role: "u" },
          { id: v.id, role: "v" },
        ],
        visitedNodes,
        passedNodes,
        tableData
      );
    }
  };

  //Start

  const startNode = graphData.find((node) => node.id === initialNode);
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
    startNode.d = 0;
    tableData.push({
      id: startNode.id,
      data: { pi: startNode.pi ? startNode.pi.id : -1, d: startNode.d },
    });
    memento.addSnapshot(
      { line: 4, name: "Search" },
      showNode,
      startNode.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: startNode.id, role: "s" }],
      visitedNodes,
      passedNodes,
      tableData
    );

    let i = 1;
    for (i; i < graphData.length; i++) {
      passedNodes = [];
      visitedNodes = [];

      memento.addSnapshot(
        { line: 5, name: "Search" },
        showNode,
        startNode.id,
        ActionType.HIGHLIGHT_LIGHT,
        [],
        visitedNodes,
        passedNodes,
        tableData
      );
      links.forEach((link) => {
        memento.addSnapshot(
          { line: 6, name: "Search" },
          showNode,
          startNode.id,
          ActionType.HIGHLIGHT_LIGHT,
          [],
          visitedNodes,
          passedNodes,
          tableData
        );
        const u = graphData.find((node) => node.id === link.source);
        const v = graphData.find((node) => node.id === link.target);
        const weight = link.weight;

        memento.addSnapshot(
          { line: 7, name: "Search" },
          showNode,
          v!.id,
          ActionType.HIGHLIGHT_LIGHT,
          [
            { id: u!.id, role: "u" },
            { id: v!.id, role: "v" },
          ],
          visitedNodes,
          passedNodes,
          tableData
        );
        relax(u!, v!, weight!);
      });
    }

    links.forEach((link) => {
      memento.addSnapshot(
        { line: 9, name: "Search" },
        showNode,
        startNode.id,
        ActionType.HIGHLIGHT_LIGHT,
        [],
        visitedNodes,
        passedNodes,
        tableData
      );
      const u = graphData.find((node) => node.id === link.source);
      const v = graphData.find((node) => node.id === link.target);
      const weight = link.weight;

      memento.addSnapshot(
        { line: 10, name: "Search" },
        showNode,
        v!.id,
        ActionType.HIGHLIGHT_LIGHT,
        [
          { id: u!.id, role: "u" },
          { id: v!.id, role: "v" },
        ],
        visitedNodes,
        passedNodes,
        tableData
      );

      if (v!.d === -1 || v!.d > u!.d + weight!) {
        memento.addSnapshot(
          { line: 11, name: "Search" },
          showNode,
          v!.id,
          ActionType.HIGHLIGHT_LIGHT,
          [
            { id: u!.id, role: "u" },
            { id: v!.id, role: "v" },
          ],
          visitedNodes,
          passedNodes,
          tableData
        );

        memento.addError(
          { line: 11, name: "Search" },
          showNode,
          "There are negative circle in the graph!"
        );
        return;
      }
    });
    memento.addSnapshot(
      { line: 12, name: "Search" },
      showNode,
      startNode!.id,
      ActionType.HIGHLIGHT_LIGHT,
      [],
      visitedNodes,
      passedNodes,
      tableData
    );
  }
}
