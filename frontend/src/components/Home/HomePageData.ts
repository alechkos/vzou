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

const sortTypes = [
  {
    name: "Insertion Sort",
    url: "/insertionsort",
  },
  {
    name: "Counting Sort",
    url: "/countingsort",
  },
  {
    name: "Bucket Sort",
    url: "/bucketsort",
  },
  {
    name: "Merge Sort",
    url: "/mergesort",
  },
  {
    name: "Quick Sort",
    url: "/quicksort",
  },
  {
    name: "Radix Sort",
    url: "/radixsort",
  },
];

const HomePageData = [
  {
    title: "Stack",
    gif: stackGif,
    image: stackPhoto,
    url: RoutePaths.STACK,
  },
  {
    title: "Queue",
    gif: queueGif,
    image: queuePhoto,
    url: "/queue",
  },
  {
    title: "BST",
    gif: treeGif,
    image: treePhoto,
    url: "/bst",
  },
  {
    title: "Sorts",
    image: sortsPhoto,
    gif: sortsGif,
    url: "",
    description: "Click to see all the sort options",
    expended: true,
    expendedList: sortTypes,
  },
  {
    title: "AVL",
    gif: treeGif,
    image: treePhoto,
    url: "/avl",
  },
  {
    title: "Heap",
    gif: heapGif,
    image: heapPhoto,
    url: "/heap",
  },
  {
    title: "Linked List",
    gif: linkedListGif,
    image: linkedListPhoto,
    url: RoutePaths.LINKED_LIST,
  },
  {
    title: "Hash Table",
    gif: hashTableGif,
    image: hashTablePhoto,
    url: RoutePaths.HASH_TABLE,
  },
  {
    title: "DFS",
    gif: dfsGif,
    image: dfsPhoto,
    url: RoutePaths.DFS,
  },
  {
    title: "Bellman-Ford",
    gif: BFGif,
    image: BFImage,
    url: RoutePaths.BELLMAN_FORD,
  },
  {
    title: "Prim",
    gif: BFGif,
    image: BFImage,
    url: RoutePaths.PRIM,
  },
];

export default HomePageData;
