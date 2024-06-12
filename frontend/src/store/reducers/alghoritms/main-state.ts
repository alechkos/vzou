import { Events, NodeRole } from "../../../components/Simulation/BinaryTree/BinaryTreeTypes";

const mainState = {
  currentActions: [] as Events,
  isPlaying: false,
  inputArray: "",
  error: "",
  currentLine: 0,
  currentRoles: [] as NodeRole[],
  visitedNodes: [] as number[],
  passedNodes: [] as number[],
  traversalResults: [] as number[],
};

export default mainState;
