import { PseudoItem } from "./pc-helpers";


export type BSTAlgNames = keyof typeof BSTPseudoCode;
export const BSTPseudoCode = {
  Search: [
    { text: "𝑺𝒆𝒂𝒓𝒄𝒉 (𝒙,𝒌)", tabAmount: 0 }, // 0
    { text: "if 𝑥 = 𝑁𝑈𝐿𝐿 or 𝑘 = 𝑥.key", tabAmount: 1 }, // 1
    { text: "return 𝑥", tabAmount: 2 }, // 2
    { text: "if 𝑘 < 𝑥.key", tabAmount: 1 }, // 3
    { text: "return 𝑺𝒆𝒂𝒓𝒄𝒉(𝑥.𝑙𝑒𝑓𝑡,𝑘)", tabAmount: 2 }, // 4
    { text: "else return 𝑺𝒆𝒂𝒓𝒄𝒉(𝑥.𝑟𝑖𝑔ℎ𝑡,𝑘)", tabAmount: 1 }, // 5
  ] as PseudoItem[],
  Insert: [
    { text: "𝑰𝒏𝒔𝒆𝒓𝒕(𝑻,𝒛)", tabAmount: 0 }, // 0
    { text: "𝑦 ← 𝑵𝑼𝑳𝑳", tabAmount: 1 }, // 1
    { text: "𝑥 ← 𝑇.root", tabAmount: 1 }, // 2
    { text: "while (𝑥 ≠ 𝑵𝑼𝑳𝑳)", tabAmount: 1 }, // 3
    { text: "𝑦 ← 𝑥", tabAmount: 2 }, // 4
    { text: "if(z.key < 𝑥.key)", tabAmount: 2 }, // 5
    { text: "𝑥 ← 𝑥.left", tabAmount: 3 }, // 6
    { text: "else 𝑥 ← 𝑥.right", tabAmount: 2 }, // 7
    { text: "z.p ← y", tabAmount: 1 }, // 8
    { text: "if(y = 𝑵𝑼𝑳𝑳) //T was empty", tabAmount: 1 }, // 9
    { text: "T.root ← z", tabAmount: 2 }, // 10
    { text: "elseif(z.key < y.key)", tabAmount: 1 }, // 11
    { text: "y.left ← z", tabAmount: 2 }, // 12
    { text: "else y.right ← z", tabAmount: 1 }, // 13
  ] as PseudoItem[],
  Delete: [
    { text: "Delete(𝑻,key)", tabAmount: 0 },
    { text: "if(T.root == null)", tabAmount: 1 },
    { text: "return T.root", tabAmount: 2 },
    { text: "if(key < T.root.value)", tabAmount: 1 },
    { text: "T.root.left ← Delete(𝑻.root.left,key)", tabAmount: 2 },
    { text: "elseif(key > T.root.value)", tabAmount: 1 },
    { text: "T.root.right ← Delete(𝑻.root.right,key)", tabAmount: 2 },
    { text: "else", tabAmount: 1 },
    { text: "if(T.root.left == null)", tabAmount: 2 },
    { text: "return T.root.right", tabAmount: 3 },
    { text: "elseif(T.root.right == null)", tabAmount: 2 },
    { text: "return T.root.left", tabAmount: 3 },
    { text: "minNode ← getMin(T.root.right)", tabAmount: 2 },
    { text: "T.root.value ← minNode.value", tabAmount: 2 },
    { text: "T.root.right ← Delete(𝑻.root.right,minNode.value)", tabAmount: 2 },
    { text: "return T.root", tabAmount: 1 },
  ] as PseudoItem[],
  Min: [
    { text: "𝑴𝒊𝒏(𝒙)", tabAmount: 0 }, // 0
    { text: "while 𝑥.𝑙𝑒𝑓𝑡 ≠ 𝑁𝑈𝐿𝐿", tabAmount: 1 }, // 1
    { text: "𝑥 ← 𝑥.𝑙𝑒𝑓𝑡", tabAmount: 2 }, // 2
    { text: "return 𝑥", tabAmount: 1 }, // 3
  ] as PseudoItem[],
  Max: [
    { text: "𝑴𝒂𝒙(𝒙)", tabAmount: 0 }, // 0
    { text: "while 𝑥.𝑟𝑖𝑔ℎ𝑡 ≠ 𝑁𝑈𝐿𝐿", tabAmount: 1 }, // 1
    { text: "𝑥 ← 𝑥.𝑟𝑖𝑔ℎ𝑡", tabAmount: 2 }, // 2
    { text: "return 𝑥", tabAmount: 1 }, // 3
  ] as PseudoItem[],
  Successor: [
    { text: "𝑺𝒖𝒄𝒄𝒆𝒔𝒔𝒐𝒓(𝒙)", tabAmount: 0 }, // 0
    { text: "if 𝑥.𝑟𝑖𝑔ℎ𝑡 ≠ 𝑁𝑈𝐿𝐿", tabAmount: 1 }, // 1
    { text: "return 𝑀𝑖𝑛(𝑥.𝑟𝑖𝑔ℎ𝑡)", tabAmount: 2 }, // 2
    { text: "𝑦 ← 𝑥.𝑝𝑎𝑟𝑒𝑛𝑡", tabAmount: 1 }, // 3
    { text: "while y ≠ 𝑁𝑈𝐿𝐿 𝒂𝒏𝒅 𝑥 = 𝑦.𝑟𝑖𝑔ℎ𝑡", tabAmount: 1 }, // 4
    { text: "𝑥 ← 𝑦", tabAmount: 2 }, // 5
    { text: "𝑦 ← 𝑦.𝑝𝑎𝑟𝑒𝑛𝑡", tabAmount: 2 }, // 6
    { text: "return 𝑦", tabAmount: 1 }, // 7
  ] as PseudoItem[],
  Predecessor: [
    { text: "Predecessor(𝒙)", tabAmount: 0 }, // 0
    { text: "if 𝑥.𝑙𝑒𝑓𝑡 ≠ 𝑁𝑈𝐿𝐿", tabAmount: 1 }, // 1
    { text: "return Max(𝑥.𝑙𝑒𝑓𝑡)", tabAmount: 2 }, // 2
    { text: "𝑦 ← 𝑥.𝑝𝑎𝑟𝑒𝑛𝑡", tabAmount: 1 }, // 3
    { text: "while y ≠ 𝑁𝑈𝐿𝐿 𝒂𝒏𝒅 𝑥 = 𝑦.𝑙𝑒𝑓𝑡", tabAmount: 1 }, // 4
    { text: "𝑥 ← 𝑦", tabAmount: 2 }, // 5
    { text: "𝑦 ← 𝑦.𝑝𝑎𝑟𝑒𝑛𝑡", tabAmount: 2 }, // 6
    { text: "return 𝑦", tabAmount: 1 }, // 7
  ] as PseudoItem[],
  Inorder: [
    { text: "Inorder(𝒙)", tabAmount: 0 }, // 0
    { text: "if 𝑥 ≠ 𝑁𝑈𝐿𝐿", tabAmount: 1 }, // 1
    { text: "Inorder(𝑥.𝑙𝑒𝑓𝑡)", tabAmount: 2 }, // 2
    { text: "visit(x.value)", tabAmount: 2 }, // 3
    { text: "Inorder(𝑥.𝑟𝑖𝑔ℎ𝑡)", tabAmount: 2 }, // 4
  ],
  Preorder: [
    { text: "Preorder(𝒙)", tabAmount: 0 }, // 0
    { text: "if 𝑥 ≠ 𝑁𝑈𝐿𝐿", tabAmount: 1 }, // 1
    { text: "visit(x.value)", tabAmount: 2 }, // 2
    { text: "Preorder(𝑥.𝑙𝑒𝑓𝑡)", tabAmount: 2 }, // 3
    { text: "Preorder(𝑥.𝑟𝑖𝑔ℎ𝑡)", tabAmount: 2 }, // 4
  ],
  Postorder: [
    { text: "Postorder(𝒙)", tabAmount: 0 }, // 0
    { text: "if 𝑥 ≠ 𝑁𝑈𝐿𝐿", tabAmount: 1 }, // 1
    { text: "Postorder(𝑥.𝑙𝑒𝑓𝑡)", tabAmount: 2 }, // 2
    { text: "Postorder(𝑥.𝑟𝑖𝑔ℎ𝑡)", tabAmount: 2 }, // 3
    { text: "visit(x.value)", tabAmount: 2 }, // 4
  ],
  RotateLeft: [
    { text: "𝑳𝒆𝒇𝒕 − 𝑹𝒐𝒕𝒂𝒕𝒆(𝑻,𝒙)", tabAmount: 0 }, // 0
    { text: "𝑦 ← 𝑥.𝑟𝑖𝑔ℎ𝒕", tabAmount: 1 }, // 1
    { text: "𝑥.𝑟𝑖𝑔ℎ𝑡 ← 𝑦.𝑙𝑒𝑓𝒕", tabAmount: 1 }, // 2
    { text: "if 𝑦.𝑙𝑒𝑓𝑡 ≠ 𝑁𝑈𝐿𝐿", tabAmount: 1 }, // 3
    { text: "(𝑦.𝑙𝑒𝑓𝑡).𝑝𝑎𝑟𝑒𝑛𝑡 ← 𝒙", tabAmount: 2 }, // 4
    { text: "𝑦.𝑝𝑎𝑟𝑒𝑛𝑡 ← 𝑥.𝑝𝑎𝑟𝑒𝑛𝑡", tabAmount: 1 }, //5
    { text: "if 𝑥. 𝑝𝑎𝑟𝑒𝑛𝑡 = 𝑁𝑈𝐿𝐿", tabAmount: 1 }, //6
    { text: "𝑇.𝑟𝑜𝑜𝑡 ← 𝑦", tabAmount: 2 }, // 7
    { text: "else if 𝑥 = (𝑥.𝑝𝑎𝑟𝑒𝑛𝑡).𝑙𝑒𝑓𝑡", tabAmount: 1 }, //8
    { text: "(𝑥.𝑝𝑎𝑟𝑒𝑛𝑡).𝑙𝑒𝑓𝑡 ← 𝑦", tabAmount: 2 }, //9,
    { text: "else", tabAmount: 1 }, //10
    { text: "(𝑥.𝑝𝑎𝑟𝑒𝑛𝑡).𝑟𝑖𝑔ℎ𝑡 ← 𝑦", tabAmount: 2 }, // 11
    { text: "𝑦.𝑙𝑒𝑓𝑡 ← 𝒙", tabAmount: 1 }, //12
    { text: "𝑥.𝑝𝑎𝑟𝑒𝑛𝑡 ← 𝑦", tabAmount: 1 }, //13
  ] as PseudoItem[],
  RotateRight: [
    { text: "𝑹𝒊𝒈𝒉𝒕 − 𝑹𝒐𝒕𝒂𝒕𝒆(𝑻,𝒙)", tabAmount: 0 }, // 0
    { text: "𝘹 ← 𝘺.𝘭𝘦𝘧𝘵", tabAmount: 1 }, // 1
    { text: "𝘹.𝘭𝘦𝘧𝘵 ← 𝘺.𝘳𝘪𝘨𝘩𝘵", tabAmount: 1 }, // 2
    { text: "𝘪𝘧 𝘺.𝘳𝘪𝘨𝘩𝘵 ≠ 𝘕𝘜𝘓𝘓", tabAmount: 1 }, // 3
    { text: "(𝘺.𝘳𝘪𝘨𝘩𝘵).𝘱𝘢𝘳𝘦𝘯𝘵 ← 𝘹", tabAmount: 2 }, // 4
    { text: "𝘺.𝘱𝘢𝘳𝘦𝘯𝘵 ← 𝘹.𝘱𝘢𝘳𝘦𝘯𝘵", tabAmount: 1 }, //5
    { text: "𝘪𝘧 𝘹.𝘱𝘢𝘳𝘦𝘯𝘵 = 𝘕𝘜𝘓𝘓", tabAmount: 1 }, //6
    { text: "𝘛.𝘳𝘰𝘰𝘵 ← 𝘺", tabAmount: 2 }, // 7
    { text: "𝘦𝘭𝘴𝘦 𝘪𝘧 𝘹 = (𝘹.𝘱𝘢𝘳𝘦𝘯𝘵).𝘳𝘪𝘨𝘩𝘵", tabAmount: 1 }, //8
    { text: "(𝘹.𝘱𝘢𝘳𝘦𝘯𝘵).𝘳𝘪𝘨𝘩𝘵 ← 𝘺", tabAmount: 2 }, //9,
    { text: "𝘦𝘭𝘴𝘦", tabAmount: 1 }, //10
    { text: "(𝘹.𝘱𝘢𝘳𝘦𝘯𝘵).𝘭𝘦𝘧𝘵 ← 𝘺", tabAmount: 2 }, // 11
    { text: "𝘺.𝘳𝘪𝘨𝘩𝘵 ← 𝘹", tabAmount: 1 }, //12
    { text: " 𝘹.𝘱𝘢𝘳𝘦𝘯𝘵 ← 𝘺", tabAmount: 1 }, //13
  ] as PseudoItem[],
};
export const BSTPseudoCodeList = {
  Search: [ "Search" ] as BSTAlgNames[],
  Insert: [ "Insert" ] as BSTAlgNames[],
  Delete: [ "Delete" ] as BSTAlgNames[],
  Preorder: [ "Preorder" ] as BSTAlgNames[],
  Postorder: [ "Postorder" ] as BSTAlgNames[],
  Inorder: [ "Inorder" ] as BSTAlgNames[],
  Min: [ "Min" ] as BSTAlgNames[],
  Max: [ "Max" ] as BSTAlgNames[],
  RotateLeft: [ "RotateLeft" ] as BSTAlgNames[],
  RotateRight: [ "RotateRight" ] as BSTAlgNames[],
  Successor: [ "Successor", "Min" ] as BSTAlgNames[],
  Predecessor: [ "Predecessor", "Max" ] as BSTAlgNames[],

};
export type BSTPseudoCodeKeys = keyof typeof BSTPseudoCodeList;
