import { PseudoItem } from "./pc-helpers";

export type HashTableAlgNames = keyof typeof HashTablePseudoCode;

export const HashTablePseudoCode = {
  ChainingSearch: [
    { text: "𝑯𝒂𝒔𝒉𝑻𝒂𝒃𝒍𝒆 - 𝑪𝒉𝒂𝒊𝒏𝒊𝒏𝒈𝑺𝒆𝒂𝒓𝒄𝒉(𝑻, 𝒌, 𝒉𝒂𝒔𝒉𝑭𝒖𝒏𝒄):", tabAmount: 0 },
    { text: "𝘪𝘯𝘥𝘦𝘹 ← 𝘩𝘢𝘴𝘩𝘍𝘶𝘯𝘤(𝘛.𝘭𝘦𝘯𝘨𝘵𝘩, 𝘬)", tabAmount: 1 },
    { text: "𝘹 ← 𝘛[𝘪𝘯𝘥𝘦𝘹];", tabAmount: 1 },
    { text: "𝑤ℎ𝑖𝑙𝑒 (𝑥 ≠ 𝑁𝑢𝑙𝑙 𝑎𝑛𝑑 𝑥.𝑘𝑒𝑦 ≠ 𝑘):", tabAmount: 1 },
    { text: "𝑥 ← 𝑥.𝑛𝑒𝑥𝑡", tabAmount: 2 },
    { text: "𝑟𝑒𝑡𝑢𝑟𝑛 𝑥", tabAmount: 1 },
  ] as PseudoItem[],
  ChainingInsert: [
    { text: "𝑯𝒂𝒔𝒉𝑻𝒂𝒃𝒍𝒆 - 𝑪𝒉𝒂𝒊𝒏𝒊𝒏𝒈𝑰𝒏𝒔𝒆𝒓𝒕(𝑻, 𝒌):", tabAmount: 0 },
    { text: "𝘪𝘯𝘥𝘦𝘹 ← 𝘩𝘢𝘴𝘩𝘍𝘶𝘯𝘤(𝘛.𝘭𝘦𝘯𝘨𝘵𝘩, 𝘬)", tabAmount: 1 },
    { text: "𝘛[𝘪𝘯𝘥𝘦𝘹].𝘶𝘯𝘴𝘩𝘪𝘧𝘵(𝘬)", tabAmount: 1 },
  ] as PseudoItem[],
  ChainingDelete: [
    { text: "𝑯𝒂𝒔𝒉𝑻𝒂𝒃𝒍𝒆 - 𝑪𝒉𝒂𝒊𝒏𝒊𝒏𝒈𝑫𝒆𝒍𝒆𝒕𝒆(𝑻, 𝒌):", tabAmount: 0 },
    { text: "𝘪𝘯𝘥𝘦𝘹 ← 𝘩𝘢𝘴𝘩𝘍𝘶𝘯𝘤(𝘛.𝘭𝘦𝘯𝘨𝘵𝘩, 𝘬)", tabAmount: 1 },
    { text: "𝘹 ← 𝘛[𝘪𝘯𝘥𝘦𝘹];", tabAmount: 1 },
    { text: "𝑤ℎ𝑖𝑙𝑒 (𝑥.𝘯𝘦𝘹𝘵 ≠ 𝑁𝑢𝑙𝑙 𝑎𝑛𝑑 (𝑥.𝘯𝘦𝘹𝘵).𝑘𝑒𝑦 ≠ 𝑘):", tabAmount: 1 },
    { text: "𝑥 ← 𝑥.𝑛𝑒𝑥𝑡", tabAmount: 2 },
    { text: "𝘪𝘧(𝘹.𝘯𝘦𝘹𝘵 ≠ 𝘕𝘶𝘭𝘭):", tabAmount: 1 },
    { text: "𝘹.𝘯𝘦𝘹𝘵 = (𝘹.𝘯𝘦𝘹𝘵).𝘯𝘦𝘹𝘵", tabAmount: 2 },
  ] as PseudoItem[],
  Search: [
    { text: "𝑯𝒂𝒔𝒉𝑻𝒂𝒃𝒍𝒆 - 𝑨𝒅𝒅𝒓𝒆𝒔𝒔𝒊𝒏𝒈𝑺𝒆𝒂𝒓𝒄𝒉(𝑻, 𝒌, 𝒉𝒂𝒔𝒉𝑭𝒖𝒏𝒄):", tabAmount: 0 },
    { text: "𝑖 ← 0", tabAmount: 1 },
    { text: "𝑗 ← 𝘩𝘢𝘴𝘩𝘍𝘶𝘯𝘤(𝑘, 𝑖)", tabAmount: 1 },
    { text: "𝘸𝘩𝘪𝘭𝘦 𝑖 < 𝘛.𝘭𝘦𝘯𝘨𝘵𝘩 𝐀𝐍𝐃 𝑇[𝑗] ≠ 𝑁𝑈𝐿𝐿:", tabAmount: 1 },
    { text: "𝘪𝘧 𝑇[𝑗].𝑘𝑒𝑦 = 𝑘:", tabAmount: 2 },
    { text: "𝘳𝘦𝘵𝘶𝘳𝘯 𝑇[𝑗]", tabAmount: 3 },
    { text: "𝑖 ← 𝑖 + 1", tabAmount: 2 },
    { text: "𝑗 ← 𝘩𝘢𝘴𝘩𝘍𝘶𝘯𝘤(𝑘, 𝑖)", tabAmount: 2 },
    { text: "𝑟𝑒𝑡𝑢𝑟𝑛 𝑁𝑢𝑙𝑙", tabAmount: 1 },
  ] as PseudoItem[],
  Insert: [
    { text: "𝑯𝒂𝒔𝒉𝑻𝒂𝒃𝒍𝒆 - 𝑨𝒅𝒅𝒓𝒆𝒔𝒔𝒊𝒏𝒈𝑰𝒏𝒔𝒆𝒓𝒕(𝑻, 𝒌, 𝒉𝒂𝒔𝒉𝑭𝒖𝒏𝒄):", tabAmount: 0 },
    { text: "𝑖 ← 0", tabAmount: 1 },
    { text: "𝘸𝘩𝘪𝘭𝘦 𝑖 < 𝘛.𝘭𝘦𝘯𝘨𝘵𝘩:", tabAmount: 1 },
    { text: "𝑗 ← 𝘩𝘢𝘴𝘩𝘍𝘶𝘯𝘤(𝑘, 𝑖)", tabAmount: 2 },
    { text: "𝘪𝘧 𝑇[𝑗] = 𝑁𝑢𝑙𝑙:", tabAmount: 2 },
    { text: "𝑇[𝑗] = 𝑘:", tabAmount: 3 },
    { text: "𝘳𝘦𝘵𝘶𝘳𝘯 𝑗", tabAmount: 3 },
    { text: "𝘦𝘭𝘴𝘦 𝑖 ← 𝑖 + 1", tabAmount: 2 },
    { text: "𝘦𝘳𝘳𝘰𝘳 '𝘩𝘢𝘴𝘩 𝘵𝘢𝘣𝘭𝘦 𝘰𝘷𝘦𝘳𝘧𝘭𝘰𝘸'", tabAmount: 1 },
  ] as PseudoItem[],
  Delete: [
    { text: "𝑯𝒂𝒔𝒉𝑻𝒂𝒃𝒍𝒆 - 𝑨𝒅𝒅𝒓𝒆𝒔𝒔𝒊𝒏𝒈𝑫𝒆𝒍𝒆𝒕𝒆(𝑻, 𝒌, 𝒉𝒂𝒔𝒉𝑭𝒖𝒏𝒄):", tabAmount: 0 },
    { text: "𝑖 ← 0", tabAmount: 1 },
    { text: "𝑗 ← 𝘩𝘢𝘴𝘩𝘍𝘶𝘯𝘤(𝑘, 𝑖)", tabAmount: 1 },
    { text: "𝘸𝘩𝘪𝘭𝘦 𝑖 < 𝘛.𝘭𝘦𝘯𝘨𝘵𝘩 𝐀𝐍𝐃 𝑇[𝑗] ≠ 𝑁𝑈𝐿𝐿:", tabAmount: 1 },
    { text: "𝘪𝘧 𝑇[𝑗].𝑘𝑒𝑦 = 𝑘:", tabAmount: 2 },
    { text: "𝑇[𝑗] = 'Deleted'", tabAmount: 3 },
    { text: "𝘳𝘦𝘵𝘶𝘳𝘯 𝑇", tabAmount: 3 },
    { text: "𝑖 ← 𝑖 + 1", tabAmount: 2 },
    { text: "𝑗 ← 𝘩𝘢𝘴𝘩𝘍𝘶𝘯𝘤(𝑘, 𝑖)", tabAmount: 2 },
    { text: "𝑟𝑒𝑡𝑢𝑟𝑛 𝑁𝑢𝑙𝑙", tabAmount: 1 },
  ] as PseudoItem[],
};

export const LinkedListPseudoCodeList = {
  ChainingSearch: ["ChainingSearch"] as HashTableAlgNames[],
  ChainingInsert: ["ChainingInsert"] as HashTableAlgNames[],
  ChainingDelete: ["ChainingDelete"] as HashTableAlgNames[],
  Search: ["Search"] as HashTableAlgNames[],
  Insert: ["Insert"] as HashTableAlgNames[],
  Delete: ["Delete"] as HashTableAlgNames[],
};

export type HashTablePseudoCodeKeys = keyof typeof LinkedListPseudoCodeList;
