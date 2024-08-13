import { PseudoItem } from "./pc-helpers";

export type PrimAlgNames = keyof typeof PrimPseudoCode;

export const PrimPseudoCode = {
  Search: [
    { text: "𝙋𝙧𝙞𝙢(𝙂, 𝙬, 𝙨):", tabAmount: 0 }, // 0
    { text: "𝘍𝘰𝘳 𝘦𝘢𝘤𝘩 𝘶 𝘪𝘯 𝘝:", tabAmount: 1 }, // 1
    { text: "𝘶.𝘥 ← ∞", tabAmount: 2 }, // 2
    { text: "𝘶.п = 𝘕𝘐𝘓", tabAmount: 2 }, // 3
    { text: "𝘴.𝘥 ← 0", tabAmount: 1 }, // 4
    { text: "𝘚 ← {𝘴}:", tabAmount: 1 }, // 5
    { text: "𝘍𝘰𝘳 𝘦𝘢𝘤𝘩 𝘷 ∈ 𝘈𝘥𝘫[𝘴]:", tabAmount: 1 },
    { text: "𝘷.𝘥 ← 𝘸(𝘴,𝘷)", tabAmount: 2 },
    { text: "𝘷.п ← 𝘴", tabAmount: 2 },
    { text: "  𝘛 ← ∅", tabAmount: 1 },
    { text: "𝘘 ← 𝘉𝘶𝘪𝘭𝘥_𝘏𝘦𝘢𝘱(𝘝 \\ {𝘴})", tabAmount: 1 },
    { text: "𝘸𝘩𝘪𝘭𝘦 𝘘  ≠ ∅:", tabAmount: 1 },
    { text: "𝘶 ←  𝘌𝘹𝘵𝘳𝘢𝘤𝘵_𝘔𝘪𝘯(𝘘)", tabAmount: 2 },
    { text: "𝘚 ←  𝘚 𝘜 {𝘶}", tabAmount: 2 },
    { text: "𝘛 ←  𝘛 𝘜 { (𝘶, 𝘶.п) }", tabAmount: 2 },
    { text: "𝘍𝘰𝘳 𝘦𝘢𝘤𝘩 𝘷 ∈ 𝘈𝘥𝘫[𝘶]:", tabAmount: 2 },
    { text: "𝘪𝘧 𝘷 ∉ 𝘚 ∧ 𝘷.𝘥 > 𝘸(𝘶,𝘷):", tabAmount: 3 },
    { text: "𝘷.𝘥 ← 𝘸(𝘶,𝘷)", tabAmount: 4 },
    { text: "𝘷.п ← 𝘶", tabAmount: 4 },
    { text: "𝘳𝘦𝘵𝘶𝘳𝘯", tabAmount: 1 },
  ] as PseudoItem[],
};
export const PrimPseudoCodeList = {
  Search: ["Search"] as PrimAlgNames[],
};
export type PrimPseudoCodeKeys = keyof typeof PrimPseudoCodeList;
