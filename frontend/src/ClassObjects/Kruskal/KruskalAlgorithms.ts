import {
  KruskalPseudoCode,
  KruskalPseudoCodeKeys,
} from "../../components/Simulation/PseudoCode/KruskalPseudoCodeData";
import { graphType, KruskalTableType, linksType } from "../../types/GraphTypes";
import { KruskalAnimationController } from "./KruskalAnimationController";
import { KruskalNode } from "./KruskalNode";
import { KruskalMemento } from "./KruskalMemento";
import { ActionType } from "../../components/Simulation/BinaryTree/BinaryTreeTypes";

export const combineKruskalPseudoCode = (currentAlg: KruskalPseudoCodeKeys) => {
  return KruskalPseudoCode[currentAlg];
};

export function buildKruskalNodes(graphData: graphType, controller: KruskalAnimationController) {
  let arrayOfBF: KruskalNode[] = [];
  let result: KruskalNode | undefined;

  graphData.nodes.forEach((node) => {
    arrayOfBF.push(new KruskalNode(node, node));
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

export function kruskalAnimation(
  showNode: KruskalNode | undefined,
  memento: KruskalMemento,
  graphData: KruskalNode[],
  links: linksType
) {
  let passedNodes: number[] = [];
  let visitedNodes: number[] = [];
  const tableData: KruskalTableType = [];
  const linksData: linksType = [];
  const T: linksType = [];

  links.forEach((firstLink) => {
    const secLink = linksData.find(
      (link) => link.source === firstLink.target && link.target === firstLink.source
    );

    if (!secLink) {
      linksData.push(firstLink);
    }
  });

  memento.addBlank(
    { line: 0, name: "Search" },
    showNode,
    0,
    [],
    visitedNodes,
    passedNodes,
    tableData,
    linksData
  );

  linksData.sort((a, b) => a.weight! - b.weight!);
  memento.addBlank(
    { line: 1, name: "Search" },
    showNode,
    0,
    [],
    visitedNodes,
    passedNodes,
    tableData,
    linksData
  );

  graphData.forEach((node) => {
    tableData.push({ id: node.id, nodes: [node.id], pi: -1 });
  });

  memento.addBlank(
    { line: 2, name: "Search" },
    showNode,
    0,
    [],
    visitedNodes,
    passedNodes,
    tableData,
    linksData
  );

  memento.addBlank(
    { line: 3, name: "Search" },
    showNode,
    0,
    [],
    visitedNodes,
    passedNodes,
    tableData,
    linksData,
    T
  );

  linksData.forEach((link) => {
    memento.addBlank(
      { line: 4, name: "Search" },
      showNode,
      0,
      [],
      visitedNodes,
      passedNodes,
      tableData,
      linksData,
      T
    );

    let a = graphData.find((node) => node.id === link.source);
    if (a) {
      memento.addSnapshot(
        { line: 5, name: "Search" },
        showNode,
        a.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: a.id, role: "a" }],
        visitedNodes,
        passedNodes,
        tableData,
        linksData,
        T
      );
    }

    let b = graphData.find((node) => node.id === link.target);
    if (b) {
      memento.addSnapshot(
        { line: 6, name: "Search" },
        showNode,
        b.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: b.id, role: "b" }],
        visitedNodes,
        passedNodes,
        tableData,
        linksData,
        T
      );
    }

    if (a && b) {
      let flag = false;
      let checkNode;
      if (a.nodes.size > b.nodes.size) {
        a.nodes.forEach((node) => {
          checkNode = Array.from(b!.nodes).find((secNode) => secNode.id === node.id);
        });
      } else {
        b.nodes.forEach((node) => {
          checkNode = Array.from(a!.nodes).find((secNode) => secNode.id === node.id);
        });
      }
      if (!checkNode) {
        flag = true;
      }

      memento.addSnapshot(
        { line: 7, name: "Search" },
        showNode,
        a.id,
        ActionType.HIGHLIGHT_LIGHT,
        [
          { id: a.id, role: "a" },
          { id: b.id, role: "b" },
        ],
        visitedNodes,
        passedNodes,
        tableData,
        linksData,
        T
      );
      if (flag) {
        T.push(link);
        memento.addSnapshot(
          { line: 8, name: "Search" },
          showNode,
          a.id,
          ActionType.HIGHLIGHT_LIGHT,
          [
            { id: a.id, role: "u" },
            { id: b.id, role: "v" },
          ],
          visitedNodes,
          passedNodes,
          tableData,
          linksData,
          T
        );
        b.nodes.forEach((adj) => {
          a!.addNode(adj);
        });
        a.nodes.forEach((adj) => {
          b!.addNode(adj);
        });
        let aNodes: number[] = [];
        let bNodes: number[] = [];
        a.nodes.forEach((adj) => {
          aNodes.push(adj.id);
        });
        b.nodes.forEach((adj) => {
          bNodes.push(adj.id);
        });

        if (a.pi === undefined) a.setPi(b);
        if (b.pi === undefined) b.setPi(a);
        tableData.push({ id: a.id, nodes: aNodes, pi: a.pi!.id });
        tableData.push({ id: b.id, nodes: bNodes, pi: b.pi!.id });
        passedNodes.push(b.id);
        passedNodes.push(a.id);

        memento.addSnapshot(
          { line: 9, name: "Search" },
          showNode,
          a.id,
          ActionType.HIGHLIGHT_LIGHT,
          [
            { id: a.id, role: "u" },
            { id: b.id, role: "v" },
          ],
          visitedNodes,
          passedNodes,
          tableData,
          linksData,
          T
        );
      }
    }
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
    linksData,
    T
  );

  return;
}
