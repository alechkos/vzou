import {
  BFSPseudoCode,
  BFSPseudoCodeKeys,
  BfsPseudoCodeList,
} from "../../components/Simulation/PseudoCode/BfsPseudoCodeData";
import { BFSMemento } from "./BFSMemento";
import { BFSNode } from "./BFSNode";

export type graphType = { nodes: number[]; links: { source: number; target: number }[] };

export function buildBFSNodes(graphData: graphType, initialNode: number) {
  let arrayOfBfs: any = [];
  let result: BFSNode | undefined;

  graphData.nodes.forEach((node) => {
    let adjacents: number[] = [];
    let links: any = [];
    graphData.links.forEach((link) => {
      if (link.source === node) {
        adjacents.push(link.target);
        links.push(link);
      }
    });

    const newNode = new BFSNode(
      { x: 0, y: 0 },
      1,
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

export const bfsAnimation = (initiaNode: BFSNode | undefined, memento: BFSMemento) => {
  // if (initialNode === null) {
  //   setCurrentError("Please set the initial node.");
  //   return;
  // }
  // setIsPlayingAnimation(true);
  // setIsPaused(false);
  // setHasStarted(true); // Set the hasStarted state to true when the animation starts
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
