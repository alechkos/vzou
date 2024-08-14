import {
  PrimPseudoCode,
  PrimPseudoCodeKeys,
} from "../../components/Simulation/PseudoCode/PrimPseudoCodeData";
import { graphType, TableDataType } from "../../types/GraphTypes";
import { PrimAnimationController } from "./PrimAnimationController";
import { PrimNode } from "./PrimNode";
import { PrimMemento } from "./PrimMemento";
import { ActionType } from "../../components/Simulation/BinaryTree/BinaryTreeTypes";

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

export function primAlgorithm(
  showNode: PrimNode | undefined,
  memento: PrimMemento,
  graphData: PrimNode[],
  initialNode: number,
  links: { source: number; target: number; weight?: number }[]
) {
  let passedNodes: number[] = [];
  let visitedNodes: number[] = [];
  const tableData: TableDataType = [];

  const S: number[] = [];
  const Q: PrimNode[] = [];
  const T: { source: number; target: number }[] = [];

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
        tableData,
        Q,
        S
      );

      memento.addSnapshot(
        { line: 3, name: "Search" },
        showNode,
        node.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: node.id, role: "u" }],
        visitedNodes,
        passedNodes,
        tableData,
        Q,
        S
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
      tableData,
      Q,
      S
    );

    S.push(startNode.id);
    tableData.push({
      id: startNode.id,
      data: { pi: startNode.pi ? startNode.pi.id : -1, d: startNode.d },
    });
    memento.addSnapshot(
      { line: 5, name: "Search" },
      showNode,
      startNode.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: startNode.id, role: "s" }],
      visitedNodes,
      passedNodes,
      tableData,
      Q,
      S
    );

    memento.addSnapshot(
      { line: 6, name: "Search" },
      showNode,
      startNode.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: startNode.id, role: "s" }],
      visitedNodes,
      passedNodes,
      tableData,
      Q,
      S
    );

    startNode.adjacents.forEach((node) => {
      let currentLink = links.find(
        (link) => link.source === startNode.id && link.target === node.id
      );
      if (currentLink) {
        node.d = currentLink.weight!;
        tableData.push({
          id: node.id,
          data: { pi: node.pi ? node.pi.id : -1, d: node.d },
        });
        memento.addSnapshot(
          { line: 7, name: "Search" },
          showNode,
          node.id,
          ActionType.HIGHLIGHT_LIGHT,
          [{ id: node.id, role: "v" }],
          visitedNodes,
          passedNodes,
          tableData,
          Q,
          S
        );

        node.pi = startNode;
        tableData.push({
          id: node.id,
          data: { pi: node.pi ? node.pi.id : -1, d: node.d },
        });
        memento.addSnapshot(
          { line: 8, name: "Search" },
          showNode,
          node.id,
          ActionType.HIGHLIGHT_LIGHT,
          [{ id: node.id, role: "v" }],
          visitedNodes,
          passedNodes,
          tableData,
          Q,
          S
        );
      }
    });
    memento.addSnapshot(
      { line: 9, name: "Search" },
      showNode,
      showNode!.id,
      ActionType.HIGHLIGHT_LIGHT,
      [],
      visitedNodes,
      passedNodes,
      tableData,
      Q,
      S
    );

    graphData.forEach((node) => {
      if (node.id !== startNode.id) Q.push(node);
      tableData.push({
        id: node.id,
        data: { pi: node.pi ? node.pi.id : -1, d: node.d },
      });
    });
    memento.addSnapshot(
      { line: 10, name: "Search" },
      showNode,
      showNode!.id,
      ActionType.HIGHLIGHT_LIGHT,
      [],
      visitedNodes,
      passedNodes,
      tableData,
      Q,
      S
    );
    memento.addSnapshot(
      { line: 11, name: "Search" },
      showNode,
      showNode!.id,
      ActionType.HIGHLIGHT_LIGHT,
      [],
      visitedNodes,
      passedNodes,
      tableData,
      Q,
      S
    );
    while (Q.length > 0) {
      let arrayOfD: number[] = [];
      Q.forEach((node) => {
        arrayOfD.push(node.d);
      });
      let minD = Math.min(...arrayOfD);

      let u = Q.find((node) => node.d === minD);
      if (u) {
        passedNodes.push(u.id);
        memento.addSnapshot(
          { line: 12, name: "Search" },
          showNode,
          u.id,
          ActionType.HIGHLIGHT_LIGHT,
          [{ id: u.id, role: "u" }],
          visitedNodes,
          passedNodes,
          tableData,
          Q,
          S
        );

        let indexOfU = Q.indexOf(u);
        Q.splice(indexOfU, 1);

        S.push(u.id);
        memento.addSnapshot(
          { line: 13, name: "Search" },
          showNode,
          u.id,
          ActionType.HIGHLIGHT_LIGHT,
          [{ id: u.id, role: "u" }],
          visitedNodes,
          passedNodes,
          tableData,
          Q,
          S
        );

        T.push({ source: u.pi!.id, target: u.id });
        memento.addSnapshot(
          { line: 14, name: "Search" },
          showNode,
          u.id,
          ActionType.HIGHLIGHT_LIGHT,
          [{ id: u.id, role: "u" }],
          visitedNodes,
          passedNodes,
          tableData,
          Q,
          S
        );

        memento.addSnapshot(
          { line: 15, name: "Search" },
          showNode,
          u.id,
          ActionType.HIGHLIGHT_LIGHT,
          [{ id: u.id, role: "u" }],
          visitedNodes,
          passedNodes,
          tableData,
          Q,
          S
        );
        u.adjacents.forEach((adj) => {
          memento.addSnapshot(
            { line: 16, name: "Search" },
            showNode,
            adj.id,
            ActionType.HIGHLIGHT_LIGHT,
            [{ id: adj.id, role: "v" }],
            visitedNodes,
            passedNodes,
            tableData,
            Q,
            S
          );
          let currLink = links.find((link) => link.source === u!.id && link.target === adj.id);
          if (currLink) {
            if (!S.includes(adj.id) && adj.d > currLink.weight!) {
              adj.d = currLink.weight!;
              tableData.push({
                id: adj.id,
                data: { pi: adj.pi ? adj.pi.id : -1, d: adj.d },
              });

              memento.addSnapshot(
                { line: 17, name: "Search" },
                showNode,
                adj.id,
                ActionType.HIGHLIGHT_LIGHT,
                [{ id: adj.id, role: "v" }],
                visitedNodes,
                passedNodes,
                tableData,
                Q,
                S
              );

              adj.pi = u;
              tableData.push({
                id: adj.id,
                data: { pi: adj.pi ? adj.pi.id : -1, d: adj.d },
              });

              memento.addSnapshot(
                { line: 18, name: "Search" },
                showNode,
                adj.id,
                ActionType.HIGHLIGHT_LIGHT,
                [{ id: adj.id, role: "v" }],
                visitedNodes,
                passedNodes,
                tableData,
                Q,
                S
              );
              visitedNodes.push(u!.id);
            }
          }
        });
        memento.addSnapshot(
          { line: 19, name: "Search" },
          showNode,
          showNode!.id,
          ActionType.HIGHLIGHT_LIGHT,
          [],
          visitedNodes,
          passedNodes,
          tableData,
          Q,
          S
        );
      }
    }
  }
}
