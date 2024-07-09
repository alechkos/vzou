import {
  BFSPseudoCode,
  BFSPseudoCodeKeys,
  BfsPseudoCodeList,
} from "../../components/Simulation/PseudoCode/BfsPseudoCodeData";
import { BFSMemento } from "./BFSMemento";
import { BFSNode } from "./BFSNode";
import { BfsAnimationController } from "./BfsAnimationController";
import { GraphNode, graphType, SVGType } from "../../types/GraphTypes";
import { log10 } from "chart.js/helpers";

export function buildBFSNodes(
  graphData: graphType,
  initialNode: number,
  controller: BfsAnimationController
) {
  let arrayOfBfs: any = [];
  let result: BFSNode | undefined;

  graphData.nodes.forEach((node) => {
    let adjacents: BFSNode[] = [];
    let links: any = [];
    graphData.links.forEach((link) => {
      if (link.source === node) {
        adjacents.push(
          new BFSNode(
            { x: 0, y: 0 },
            controller.speed,
            node,
            node,
            1500,
            undefined,
            "BFS",
            [],
            links
          )
        );
        links.push(link);
      }
    });

    const newNode = new BFSNode(
      { x: 0, y: 0 },
      controller.speed,
      node,
      node,
      1500,
      undefined,
      "BFS",
      adjacents,
      links
    );
    arrayOfBfs.push(newNode);
  });
  result = arrayOfBfs.find((node: BFSNode) => node.value === initialNode);
  return result;
}

export const bfsAnimation = (
  initialNode: BFSNode | undefined,
  memento: BFSMemento,
  svg: SVGType
) => {
  if (initialNode === undefined) {
    memento.addError(
      { line: 0, name: "Search" },
      initialNode,
      `Please set the initial node`,
      [],
      [],
      []
    );
    const temp: GraphNode[] = [{ id: 1, value: 1 }];

    console.log(svg);

    svg.container
      ?.append("g")
      .selectAll("text")
      .data(temp)
      .enter()
      .append("text")
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .text("CHECK");
    return;
  }

  // const initDistances: { [key: number]: number } = {};
  // const initPredecessors: { [key: number]: number | null } = {};
  // const initColors: { [key: number]: string } = {};
  // setDistances(initDistances);
  // setPredecessors(initPredecessors);
  // setColors(initColors);
  // setCurrentLine(0);
  // await waitForNextStep();
  // for (const v of graphData.nodes) {
  //   setCurrentLine(1);
  //   await waitForNextStep();
  //   setDistances((prev) => ({ ...prev, [v]: Infinity }));
  //   setCurrentLine(2);
  //   await waitForNextStep();
  //   setPredecessors((prev) => ({ ...prev, [v]: null }));
  //   setCurrentLine(3);
  //   await waitForNextStep();
  //   setColors((prev) => ({ ...prev, [v]: "WHITE" }));
  //   setCurrentLine(4);
  //   await waitForNextStep();
  // }
  // setCurrentLine(5);
  // await waitForNextStep();
  // setQueue([]);
  // setCurrentLine(6);
  // setDistances((prev) => ({ ...prev, [initialNode!.value]: 0 }));
  // await waitForNextStep();
  // setCurrentLine(7);
  // setColors((prev) => ({ ...prev, [initialNode!.value]: "GRAY" }));
  // await waitForNextStep();
  // setCurrentLine(8);
  // // setQueue((prev) => {
  // //   const newQueue = [...prev, initialNode];
  // //   console.log("Updated queue in setQueue:", newQueue);
  // //   return newQueue;
  // // });
  // await waitForNextStep();
};

export const combineBfsPseudoCode = (currentAlg: BFSPseudoCodeKeys) => {
  return BFSPseudoCode[currentAlg];
};
