import heapGif from "../../assets/Gallery/heapGif.gif";
import heapPhoto from "../../assets/Gallery/heapPhoto.png";
import queueGif from "../../assets/Gallery/queueGif.gif";
import queuePhoto from "../../assets/Gallery/queuePhoto.png";
import sortsGif from "../../assets/Gallery/sortsGif.gif";
import sortsPhoto from "../../assets/Gallery/sortsPhoto.png";
import stackGif from "../../assets/Gallery/stackGif.gif";
import stackPhoto from "../../assets/Gallery/stackPhoto.png";
import treeGif from "../../assets/Gallery/treeGif.gif";
import treePhoto from "../../assets/Gallery/treePhoto.png";
import linkedListPhoto from "../../assets/Gallery/LinkedListPhoto.png";
import linkedListGif from "../../assets/Gallery/LinkedListGif.gif";
import bfsPhoto from "../../assets/Gallery/bfsPhoto.png";
import bfsGif from "../../assets/Gallery/bfsGif.gif";
import dfsPhoto from "../../assets/Gallery/DFSPhoto.png";
import dfsGif from "../../assets/Gallery/DFSGif.gif";
import hashTablePhoto from "../../assets/Gallery/HashTablePhoto.png";
import hashTableGif from "../../assets/Gallery/HashTableGif.gif";
import BFImage from "../../assets/Gallery/BFImage.png";
import BFGif from "../../assets/Gallery/BFGif.gif";
import { RoutePaths } from "../../Routes/RoutePaths";

const HomePageData = [
  {
    title: "Stack",
    gif: stackGif,
    image: stackPhoto,
    url: RoutePaths.STACK,
    type: "Structure",
  },
  {
    title: "Queue",
    gif: queueGif,
    image: queuePhoto,
    url: "/queue",
    type: "Structure",
  },
  {
    title: "BST",
    gif: treeGif,
    image: treePhoto,
    url: "/bst",
    type: "Structure",
  },
  {
    title: "AVL",
    gif: treeGif,
    image: treePhoto,
    url: "/avl",
    type: "Structure",
  },
  {
    title: "Heap",
    gif: heapGif,
    image: heapPhoto,
    url: "/heap",
    type: "Structure",
  },
  {
    title: "Linked List",
    gif: linkedListGif,
    image: linkedListPhoto,
    url: RoutePaths.LINKED_LIST,
    type: "Structure",
  },
  {
    title: "Hash Table",
    gif: hashTableGif,
    image: hashTablePhoto,
    url: RoutePaths.HASH_TABLE,
    type: "Structure",
  },
  {
    title: "DFS",
    gif: dfsGif,
    image: dfsPhoto,
    url: RoutePaths.DFS,
    type: "Graph",
  },
  {
    title: "Bellman-Ford",
    gif: BFGif,
    image: BFImage,
    url: RoutePaths.BELLMAN_FORD,
    type: "Graph",
  },
  {
    title: "Prim",
    gif: BFGif,
    image: BFImage,
    url: RoutePaths.PRIM,
    type: "Graph",
  },
];

export default HomePageData;
