import { PseudoItem } from "./pc-helpers";

export type KruskalAlgNames = keyof typeof KruskalPseudoCode;

export const KruskalPseudoCode = {
  Search: [
    { text: "𝙆𝙧𝙪𝙨𝙠𝙖𝙡(𝙂, 𝙬):", tabAmount: 0 }, // 0
    { text: "𝘚𝘰𝘳𝘵 𝘵𝘩𝘦 𝘦𝘥𝘨𝘦𝘴 𝘰𝘧 𝘎 𝘣𝘺 𝘯𝘰𝘯-𝘥𝘦𝘤𝘳𝘦𝘢𝘴𝘪𝘯𝘨 𝘰𝘳𝘥𝘦𝘳 𝘰𝘧 𝘸𝘦𝘪𝘨𝘩𝘵𝘴", tabAmount: 1 }, // 1
    { text: "𝘐𝘯𝘪𝘵(𝘋𝘚𝘚)", tabAmount: 1 }, // 2
    { text: "𝘛 ← ∅", tabAmount: 1 }, // 3
    { text: "𝘧𝘰𝘳 𝘦𝘢𝘤𝘩 𝘦𝘥𝘨𝘦(𝘶,𝘷) 𝘪𝘯 𝘵𝘩𝘦 𝘴𝘰𝘳𝘵𝘦𝘥 𝘭𝘪𝘴𝘵:", tabAmount: 1 }, // 4
    { text: "𝘢 ← 𝘧𝘪𝘯𝘥(𝘶)", tabAmount: 2 }, // 5
    { text: "𝘣 ← 𝘧𝘪𝘯𝘥(𝘷)", tabAmount: 2 },
    { text: "𝘪𝘧 𝘢 ≠ 𝘣:", tabAmount: 2 },
    { text: "𝘛 ←  𝘛 𝘜 { (𝘶,𝘷) }", tabAmount: 3 },
    { text: "𝘮𝘦𝘳𝘨𝘦(𝘢, 𝘣)", tabAmount: 3 },
    { text: "𝘳𝘦𝘵𝘶𝘳𝘯 𝘛", tabAmount: 1 },
  ] as PseudoItem[],
};
export const KruskalPseudoCodeList = {
  Search: ["Search"] as KruskalAlgNames[],
};
export type KruskalPseudoCodeKeys = keyof typeof KruskalPseudoCodeList;
