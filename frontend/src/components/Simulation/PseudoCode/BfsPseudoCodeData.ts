import { PseudoItem } from "./pc-helpers";

export type BfsAlgNames = keyof typeof BFSPseudoCode;

export const BFSPseudoCode = {
  Search: [
    { text: "𝘉𝘍𝘚(𝘎,𝘴)", tabAmount: 0 }, // 0
    { text: "𝘍𝘰𝘳 𝘦𝘢𝘤𝘩 𝘷 𝘪𝘯 𝘝", tabAmount: 1 }, // 1
    { text: "𝘥[𝘷]=𝘪𝘯𝘧𝘪𝘯𝘪𝘵𝘺", tabAmount: 2 }, // 2
    { text: "п[𝘷]=𝘕𝘐𝘓", tabAmount: 2 }, // 3
    { text: "𝘤𝘰𝘭𝘰𝘳[𝘷]=𝘞𝘏𝘐𝘛𝘌", tabAmount: 2 }, // 4
    { text: "𝘘=𝘦𝘮𝘱𝘵𝘺 𝘨𝘳𝘰𝘶𝘱", tabAmount: 1 }, // 5
    { text: "𝘥[𝘴]=0", tabAmount: 1 },
    { text: "𝘤𝘰𝘭𝘰𝘳[𝘴]=𝘎𝘙𝘈𝘠", tabAmount: 1 },
    { text: "𝘌𝘯𝘲𝘶𝘦𝘶𝘦(𝘘,𝘴)", tabAmount: 1 },
    { text: "𝘞𝘩𝘪𝘭𝘦(𝘘 𝘯𝘰𝘵 𝘦𝘲𝘶𝘢𝘭 𝘦𝘮𝘱𝘵𝘺 𝘨𝘳𝘰𝘶𝘱):", tabAmount: 1 },
    { text: "𝘶=𝘥𝘦𝘲𝘶𝘦𝘶𝘦(𝘘)", tabAmount: 2 },
    { text: "𝘧𝘰𝘳 𝘦𝘢𝘤𝘩 𝘷 𝘪𝘯 𝘈𝘥𝘫[𝘶]", tabAmount: 2 },
    { text: "𝘪𝘧(𝘤𝘰𝘭𝘰𝘳[𝘷]=𝘞𝘏𝘐𝘛𝘌)", tabAmount: 3 },
    { text: "𝘥[𝘷]=𝘥[𝘶]+1", tabAmount: 4 },
    { text: "п[𝘷]=𝘶", tabAmount: 4 },
    { text: "𝘤𝘰𝘭𝘰𝘳[𝘷]=𝘎𝘙𝘈𝘠", tabAmount: 4 },
    { text: "𝘌𝘯𝘲𝘶𝘦𝘶𝘦(𝘘,𝘷)", tabAmount: 4 },
    { text: "𝘤𝘰𝘭𝘰𝘳[𝘶]=𝘉𝘓𝘈𝘊𝘒", tabAmount: 2 },
  ] as PseudoItem[],
};
export const BfsPseudoCodeList = {
  Search: ["Search"] as BfsAlgNames[],
};
export type BFSPseudoCodeKeys = keyof typeof BfsPseudoCodeList;
