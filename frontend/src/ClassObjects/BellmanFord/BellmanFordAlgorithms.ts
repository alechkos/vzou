import {
  BellmanFordPseudoCode,
  BellmanFordPseudoCodeKeys,
} from "../../components/Simulation/PseudoCode/BelmanFordPseudoCode";

export const combineBellmanFordPseudoCode = (currentAlg: BellmanFordPseudoCodeKeys) => {
  return BellmanFordPseudoCode[currentAlg];
};
