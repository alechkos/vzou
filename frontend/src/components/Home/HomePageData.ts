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
  /*
  TODO:
  
  {
    title: "Hash table",
    gif: hashGif,
    image: hashPhoto,
    url: "/login",
  },
  */
];

export default HomePageData;
