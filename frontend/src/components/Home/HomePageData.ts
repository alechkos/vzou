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
import djikstraPhoto from "../../assets/Gallery/DjikstraPhoto.png";
import djikstraGif from "../../assets/Gallery/djikstraGif.gif";
import bfsGif from "../../assets/Gallery/bfsGif.gif";
import dfsPhoto from "../../assets/Gallery/DFSPhoto.png";
import dfsGif from "../../assets/Gallery/DFSGif.gif";
import hashTablePhoto from "../../assets/Gallery/HashTablePhoto.png";
import hashTableGif from "../../assets/Gallery/HashTableGif.gif";
import BFImage from "../../assets/Gallery/BFImage.png";
import BFGif from "../../assets/Gallery/BFGif.gif";
import insertionSortGif from "../../assets/Gallery/insertionSortGif.gif";
import insertionSortImg from "../../assets/Gallery/insertionSortImage.png";
import countingSortGif from "../../assets/Gallery/countingSortGif.gif";
import countingSortImg from "../../assets/Gallery/countingSortImg.png";
import bucketSortGif from "../../assets/Gallery/bucketSortGif.gif";
import bucketSortImg from "../../assets/Gallery/bucketSortImg.png";
import mergeSortGif from "../../assets/Gallery/mergeSortGif.gif";
import mergeSortImg from "../../assets/Gallery/mergeSortImg.png";
import quickSortGif from "../../assets/Gallery/quickSortGif.gif";
import quickSortImg from "../../assets/Gallery/quickSortImg.png";
import radixSortGif from "../../assets/Gallery/radixSortGif.gif";
import radixSortImg from "../../assets/Gallery/radixSortImg.png";
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
  {
    title: "Kruskal",
    gif: BFGif,
    image: BFImage,
    url: RoutePaths.KRUSKAL,
    type: "Graph",
  },
  {
    title: "Insertion Sort",
    gif: insertionSortGif,
    image: insertionSortImg,
    url: RoutePaths.INSERTION_SORT,
    type: "Sort",
  },
  {
    title: "Counting Sort",
    gif: countingSortGif,
    image: countingSortImg,
    url: RoutePaths.COUNTING_SORT,
    type: "Sort",
  },
  {
    title: "Bucket Sort",
    gif: bucketSortGif,
    image: bucketSortImg,
    url: RoutePaths.BUCKET_SORT,
    type: "Sort",
  },
  {
    title: "Merge Sort",
    gif: mergeSortGif,
    image: mergeSortImg,
    url: RoutePaths.MERGE_SORT,
    type: "Sort",
  },
  {
    title: "Quick Sort",
    gif: quickSortGif,
    image: quickSortImg,
    url: RoutePaths.QUICK_SORT,
    type: "Sort",
  },
  {
    title: "Radix Sort",
    gif: radixSortGif,
    image: radixSortImg,
    url: RoutePaths.RADIX_SORT,
    type: "Sort",
  },
  {
    title: "BFS",
    gif: bfsGif,
    image: bfsPhoto,
    url: RoutePaths.BFS,
    type: "Graph"
  },
  {
    title: "Djikstra",
    gif: djikstraGif,
    image: djikstraPhoto,
    url: RoutePaths.DJIKSTRA,
    type: "Graph"
  },
];

export default HomePageData;
