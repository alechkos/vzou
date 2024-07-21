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
  return result;
}

export const dfsAnimation = (
  initialNode: DFSNode | undefined,
  memento: DFSMemento,
  graphData: DFSNode[]
) => {
  const passedNodes: number[] = [];
  const visitedNodes: number[] = [];
  const tableData: { id: number; data: { color: string; pi: number; d: number; f: number } }[] = [];
  let time = 0;

  const DFSVisit = (node: DFSNode) => {
    time += 1;
    memento.addSnapshot(
      { line: 10, name: "Search" },
      initialNode,
      node.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: node.id, role: "u" }],
      visitedNodes,
      passedNodes,
      tableData
    );

    node.setD(time);
    tableData.push({
      id: node.id,
      data: { color: node.color, pi: node.pi ? node.pi.id : -1, d: node.d, f: node.f },
    });
    memento.addSnapshot(
      { line: 11, name: "Search" },
      initialNode,
      node.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: node.id, role: "u" }],
      visitedNodes,
      passedNodes,
      tableData
    );

    node.setColor(Colors.Gray);
    passedNodes.push(node.id);
    tableData.push({
      id: node.id,
      data: { color: node.color, pi: node.pi ? node.pi.id : -1, d: node.d, f: node.f },
    });
    memento.addSnapshot(
      { line: 12, name: "Search" },
      initialNode,
      node.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: node.id, role: "u" }],
      visitedNodes,
      passedNodes,
      tableData
    );

    memento.addSnapshot(
      { line: 13, name: "Search" },
      initialNode,
      node.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: node.id, role: "u" }],
      visitedNodes,
      passedNodes,
      tableData
    );
    node.adjacents.forEach((adj) => {
      memento.addSnapshot(
        { line: 14, name: "Search" },
        initialNode,
        adj.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: adj.id, role: "v" }],
        visitedNodes,
        passedNodes,
        tableData
      );
      if (adj.color === Colors.White) {
        adj.setPi(node);
        tableData.push({ id: adj.id, data: { color: adj.color, pi: node.id, d: adj.d, f: adj.f } });
        memento.addSnapshot(
          { line: 15, name: "Search" },
          initialNode,
          adj.id,
          ActionType.HIGHLIGHT_LIGHT,
          [{ id: adj.id, role: "v" }],
          visitedNodes,
          passedNodes,
          tableData
        );

        memento.addSnapshot(
          { line: 16, name: "Search" },
          initialNode,
          adj.id,
          ActionType.HIGHLIGHT_LIGHT,
          [{ id: adj.id, role: "v" }],
          visitedNodes,
          passedNodes,
          tableData
        );
        DFSVisit(adj);
      }
    });
    node.setColor(Colors.Black);
    visitedNodes.push(node.id);
    tableData.push({
      id: node.id,
      data: { color: node.color, pi: node.pi ? node.pi.id : -1, d: node.d, f: node.f },
    });
    memento.addSnapshot(
      { line: 17, name: "Search" },
      initialNode,
      node.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: node.id, role: "u" }],
      visitedNodes,
      passedNodes,
      tableData
    );

    time += 1;
    memento.addSnapshot(
      { line: 18, name: "Search" },
      initialNode,
      node.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: node.id, role: "u" }],
      visitedNodes,
      passedNodes,
      tableData
    );

    node.setF(time);
    tableData.push({
      id: node.id,
      data: { color: node.color, pi: node.pi ? node.pi.id : -1, d: node.d, f: node.f },
    });
    memento.addSnapshot(
      { line: 19, name: "Search" },
      initialNode,
      node.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: node.id, role: "u" }],
      visitedNodes,
      passedNodes,
      tableData
    );
  };

  //Start
  memento.addBlank({ line: 1, name: "Search" }, initialNode);

  graphData.forEach((node) => {
    node.setColor(Colors.White);
    tableData.push({
      id: node.id,
      data: { color: node.color, pi: node.pi ? node.pi.id : -1, d: node.d, f: node.f },
    });
    memento.addSnapshot(
      { line: 2, name: "Search" },
      initialNode,
      node.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: node.id, role: "u" }],
      visitedNodes,
      passedNodes,
      tableData
    );
    memento.addSnapshot(
      { line: 3, name: "Search" },
      initialNode,
      node.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: node.id, role: "u" }],
      visitedNodes,
      passedNodes,
      tableData
    );
  });

  memento.addSnapshot(
    { line: 4, name: "Search" },
    initialNode,
    initialNode!.id,
    ActionType.HIGHLIGHT_LIGHT,
    [],
    visitedNodes,
    passedNodes,
    tableData
  );

  memento.addSnapshot(
    { line: 5, name: "Search" },
    initialNode,
    initialNode!.id,
    ActionType.HIGHLIGHT_LIGHT,
    [],
    visitedNodes,
    passedNodes,
    tableData
  );

  graphData.forEach((node) => {
    memento.addSnapshot(
      { line: 6, name: "Search" },
      initialNode,
      node.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: node.id, role: "u" }],
      visitedNodes,
      passedNodes,
      tableData
    );
    if (node.color === Colors.White) {
      memento.addSnapshot(
        { line: 7, name: "Search" },
        initialNode,
        node.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: node.id, role: "u" }],
        visitedNodes,
        passedNodes,
        tableData
      );

      memento.addSnapshot(
        { line: 9, name: "Search" },
        initialNode,
        node.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: node.id, role: "u" }],
        visitedNodes,
        passedNodes,
        tableData
      );
      DFSVisit(node);
    }
  });
  memento.addSnapshot(
    { line: 0, name: "Search" },
    initialNode,
    initialNode!.id,
    ActionType.HIGHLIGHT_LIGHT,
    [],
    visitedNodes,
    passedNodes,
    tableData
  );
};

export const combineDFSPseudoCode = (currentAlg: DFSPseudoCodeKeys) => {
  return DFSPseudoCode[currentAlg];
};
