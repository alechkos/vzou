import { PseudoItem } from "./pc-helpers";

export type LinkedListAlgNames = keyof typeof LinkedListPseudoCode;

export const LinkedListPseudoCode = {
    Search: [
        { text: "𝑳𝒊𝒔𝒕 - 𝑺𝒆𝒂𝒓𝒄𝒉(𝑳,𝒌):", tabAmount: 0 },
        { text: "𝑥 ← 𝐿.ℎ𝑒𝑎𝑑", tabAmount: 1 },
        { text: "𝑤ℎ𝑖𝑙𝑒 (𝑥 ≠ 𝑁𝑢𝑙𝑙 𝑎𝑛𝑑 𝑥.𝑘𝑒𝑦 ≠ 𝑘):", tabAmount: 1 },
        { text: "𝑥 ← 𝑥.𝑛𝑒𝑥𝑡", tabAmount: 2 },
        { text: "𝑟𝑒𝑡𝑢𝑟𝑛 𝑥", tabAmount: 1 },
    ] as PseudoItem[],
    Insert: [
        {text: "𝑳𝒊𝒔𝒕 - 𝑰𝒏𝒔𝒆𝒓𝒕 - 𝑨𝒕𝑯𝒆𝒂𝒅(𝑳,𝒙):", tabAmount: 0},
        {text: "𝑥.𝑛𝑒𝑥𝑡 ← 𝐿.ℎ𝑒𝑎𝑑", tabAmount: 1},
        {text: "𝐿.ℎ𝑒𝑎𝑑 ← 𝑥", tabAmount: 1},
    ] as PseudoItem[],
    Delete: [
        {text: "𝑳𝒊𝒔𝒕 - 𝑫𝒆𝒍𝒆𝒕𝒆 - 𝑯𝒆𝒂𝒅(𝑳):", tabAmount: 0},
        {text: "𝑥 ← 𝐿.ℎ𝑒𝑎𝑑", tabAmount: 1},
        {text: "𝑖𝑓(𝐿.ℎ𝑒𝑎𝑑 ≠ 𝑁𝑢𝑙𝑙):", tabAmount: 1},
        {text: "L.ℎ𝑒𝑎𝑑 ← (𝐿.ℎ𝑒𝑎𝑑).𝑛𝑒𝑥𝑡", tabAmount: 2},
        {text: "𝑟𝑒𝑡𝑢𝑟𝑛 𝑥", tabAmount: 1},
    ] as PseudoItem[]
}

export const LinkedListPseudoCodeList = {
    Search: ["Search"] as LinkedListAlgNames[],
    Insert: ["Insert"] as LinkedListAlgNames[],
    Delete: ["Delete"] as LinkedListAlgNames[],
}

export type LinkedListPseudoCodeKeys = keyof  typeof LinkedListPseudoCodeList;