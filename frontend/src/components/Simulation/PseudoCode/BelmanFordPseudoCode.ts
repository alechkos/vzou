import { PseudoItem } from "./pc-helpers";

export type BellmanFordAlgNames = keyof typeof BellmanFordPseudoCode;

export const BellmanFordPseudoCode = {
  Search: [
    { text: "𝑩𝒆𝒍𝒍𝒎𝒂𝒏_𝑭𝒐𝒓𝒅(𝘎,𝒘,𝒔):", tabAmount: 0 }, // 0
    { text: "𝘍𝘰𝘳 𝘦𝘢𝘤𝘩 𝘶 𝘪𝘯 𝘝:", tabAmount: 1 }, // 1
    { text: "𝘶.𝘥 ← ∞", tabAmount: 2 }, // 2
    { text: "𝘶.п = 𝘕𝘐𝘓", tabAmount: 2 }, // 3
    { text: "𝘴.𝘥 ← 0", tabAmount: 1 }, // 4
    { text: "𝘍𝘰𝘳 𝘪 ← 1 𝘵𝘰 |𝘝| - 1:", tabAmount: 1 }, // 5
    { text: "𝘍𝘰𝘳 𝘦𝘢𝘤𝘩 (𝘶,𝘷) ∈ 𝘝:", tabAmount: 2 },
    { text: "𝘙𝘦𝘭𝘢𝘹(𝘶,𝘷,𝘸)", tabAmount: 3 },
    { text: "", tabAmount: 1 },
    { text: "𝘍𝘰𝘳 𝘦𝘢𝘤𝘩 (𝘶,𝘷) ∈ 𝘝:", tabAmount: 1 },
    { text: "𝘪𝘧 𝘷.𝘥 > 𝘶.𝘥 + 𝘸(𝘶,𝘷):", tabAmount: 2 },
    { text: "𝘳𝘦𝘵𝘶𝘳𝘯 𝘍𝘢𝘭𝘴𝘦", tabAmount: 3 },
    { text: "𝘳𝘦𝘵𝘶𝘳𝘯 𝘛𝘳𝘶𝘦", tabAmount: 1 },
    { text: "", tabAmount: 0 },
    { text: "𝑹𝒆𝒍𝒂𝒙(𝒖,𝒗,𝒘):", tabAmount: 0 },
    { text: "𝘪𝘧 𝘷.𝘥 > 𝘶.𝘥 + 𝘸(𝘶,𝘷):", tabAmount: 1 },
    { text: "𝘷.𝘥 ← 𝘶.𝘥 + 𝘸(𝘶,𝘷)", tabAmount: 2 },
    { text: "𝘷.п ← 𝘶", tabAmount: 2 },
  ] as PseudoItem[],
};
export const BellmanFordPseudoCodeList = {
  Search: ["Search"] as BellmanFordAlgNames[],
};
export type BellmanFordPseudoCodeKeys = keyof typeof BellmanFordPseudoCodeList;
