import { PseudoItem } from "./pc-helpers";

export type DFSAlgNames = keyof typeof DFSPseudoCode;

export const DFSPseudoCode = {
  Search: [
    { text: "𝘋𝘍𝘚(𝘎):", tabAmount: 0 }, // 0
    { text: "𝘍𝘰𝘳 𝘦𝘢𝘤𝘩 𝘶 𝘪𝘯 𝘝:", tabAmount: 1 }, // 1
    { text: "𝘶.𝘤𝘰𝘭𝘰𝘳 = 𝘞𝘏𝘐𝘛𝘌", tabAmount: 2 }, // 2
    { text: "𝘶.п = 𝘕𝘐𝘓", tabAmount: 2 }, // 3
    { text: "𝘵𝘪𝘮𝘦 = 0", tabAmount: 1 }, // 4
    { text: "𝘍𝘰𝘳 𝘦𝘢𝘤𝘩 𝘶 𝘪𝘯 𝘝:", tabAmount: 1 }, // 5
    { text: "𝘪𝘧 𝘶.𝘤𝘰𝘭𝘰𝘳 == 𝘞𝘏𝘐𝘛𝘌", tabAmount: 2 },
    { text: "𝘋𝘍𝘚-𝘝𝘐𝘚𝘐𝘛(𝘎,𝘶)", tabAmount: 3 },
    { text: "", tabAmount: 1 },
    { text: "𝘋𝘍𝘚-𝘝𝘐𝘚𝘐𝘛(𝘎,𝘶):", tabAmount: 0 },
    { text: "𝘵𝘪𝘮𝘦 = 𝘵𝘪𝘮𝘦 + 1", tabAmount: 1 },
    { text: "𝘶.𝘥 = 𝘵𝘪𝘮𝘦", tabAmount: 1 },
    { text: "𝘶.𝘤𝘰𝘭𝘰𝘳 = 𝘎𝘙𝘈𝘠", tabAmount: 1 },
    { text: "𝘍𝘰𝘳 𝘦𝘢𝘤𝘩 𝘷 𝘪𝘯 𝘎.𝘈𝘥𝘫[𝘶]:", tabAmount: 1 },
    { text: "𝘪𝘧 𝘷.𝘤𝘰𝘭𝘰𝘳 == 𝘞𝘏𝘐𝘛𝘌:", tabAmount: 2 },
    { text: "𝘷.п = 𝘶", tabAmount: 3 },
    { text: "𝘋𝘍𝘚-𝘝𝘐𝘚𝘐𝘛(𝘎,𝘷)", tabAmount: 3 },
    { text: "𝘶.𝘤𝘰𝘭𝘰𝘳 = 𝘉𝘓𝘈𝘊𝘒", tabAmount: 1 },
    { text: "𝘵𝘪𝘮𝘦 = 𝘵𝘪𝘮𝘦 + 1", tabAmount: 1 },
    { text: "𝘶.𝘧 = 𝘵𝘪𝘮𝘦", tabAmount: 1 },
  ] as PseudoItem[],
};
export const DFSPseudoCodeList = {
  Search: ["Search"] as DFSAlgNames[],
};
export type DFSPseudoCodeKeys = keyof typeof DFSPseudoCodeList;
