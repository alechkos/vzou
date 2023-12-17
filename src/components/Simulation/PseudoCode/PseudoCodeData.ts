import { PseudoItem } from "./pc-helpers";


export const QuickSortPseudoCode: PseudoItem[] = [
  { text: "Quicksort (𝐴, 𝑝, 𝑟 ):", tabAmount: 0 },
  { text: "if (𝑝 < 𝑟):", tabAmount: 1 },
  { text: "𝑞 = partition (𝐴, 𝑝, 𝑟 )", tabAmount: 2 },
  { text: "Quicksort (𝐴, 𝑝, 𝑞 − 1)", tabAmount: 2 },
  { text: "Quicksort (𝐴, 𝑞 + 1, 𝑟 )", tabAmount: 2 },
  { text: "", tabAmount: 1 },
  { text: "", tabAmount: 1 },
  { text: "Partition(𝐴, 𝑝, 𝑟 ):", tabAmount: 0 },
  { text: "𝑖 = 𝑝 − 1", tabAmount: 1 },
  { text: "for (𝑗 = 𝑝 to 𝑟 − 1)", tabAmount: 1 },
  { text: "if (𝐴[𝑗] ≤ 𝐴[𝑟]):", tabAmount: 2 },
  { text: "𝑖 = 𝑖 + 1", tabAmount: 3 },
  { text: "exchange 𝐴[𝑖] with 𝐴[ 𝑗]", tabAmount: 3 },
  { text: "exchange 𝐴[𝑖 + 1] with 𝐴[𝑟]", tabAmount: 1 },
  { text: "return 𝑖 + 1", tabAmount: 1 },
];

export const InsertionSortPseudoCode: PseudoItem[] = [
  { text: "InsertionSort (int[ ] arr):", tabAmount: 0 },
  { text: "for (i=1; i<arr.length; i++):", tabAmount: 1 },
  { text: "key = arr[i]", tabAmount: 2 },
  { text: "j = i-1", tabAmount: 2 },
  { text: "while (j>=0 and arr[j]>key):", tabAmount: 2 },
  { text: "arr[j+1] = arr[j]", tabAmount: 3 },
  { text: "j = j-1", tabAmount: 3 },
  { text: "arr[j+1] = key", tabAmount: 2 },
];

export const CountingSortPseudoCode: PseudoItem[] = [
  { text: "CountingSort (A, B, K):", tabAmount: 0 },
  { text: "C = Array of K zeros", tabAmount: 1 },
  { text: "for (i=0; i<A.length; i++):", tabAmount: 1 },
  { text: "index = A[i]", tabAmount: 2 },
  { text: "C[index] = C[index] + 1", tabAmount: 2 },
  { text: "", tabAmount: 1 },
  { text: "for (i=1; i<=K; i++):", tabAmount: 1 },
  { text: "C[i] = C[i] + C[i-1]", tabAmount: 2 },
  { text: "", tabAmount: 1 },
  { text: "for (i=A.length-1; i>=0; i--):", tabAmount: 1 },
  { text: "value = A[i]", tabAmount: 2 },
  { text: "C[value]--", tabAmount: 2 },
  { text: "index = C[value]", tabAmount: 2 },
  { text: "B[index] = value", tabAmount: 2 },
];

export const BucketSortPseudoCode: PseudoItem[] = [
  { text: "K = 4, max_value=20", tabAmount: 0 },
  { text: "", tabAmount: 1 },
  { text: "BucketSort (arr):", tabAmount: 0 },
  { text: "buckets ← Array of K buckets", tabAmount: 1 },
  { text: "M ← 1 + max_value", tabAmount: 1 },
  { text: "while(arr.length):", tabAmount: 1 },
  { text: "index ← ⌊k * arr[0] / M)⌋", tabAmount: 2 },
  { text: "buckets[index].insert(arr[0])", tabAmount: 2 },
  { text: "arr.remove(0)", tabAmount: 2 },
  { text: "", tabAmount: 1 },
  { text: "for (i=0; i<K; i++):", tabAmount: 1 },
  { text: "Buckets[i].sort()", tabAmount: 2 },
  { text: "", tabAmount: 1 },
  { text: "for (i=0; i<K; i++):", tabAmount: 1 },
  { text: "arr.concat(buckets[i])", tabAmount: 2 },
];

export const RadixSortPseudoCode: PseudoItem[] = [
  { text: "RadixSort (arr,d):", tabAmount: 0 },
  { text: "for (i = 0 ; i < d ; i++):", tabAmount: 1 },
  { text: "/* sort arr by digit i */", tabAmount: 2 },
  { text: "Extract relevant digits", tabAmount: 2 },
  { text: "countingSort(arr,i)", tabAmount: 2 },
];

export const mergeSortPseudoCode: PseudoItem[] = [
  { text: "MergeSort (arr, left, right):", tabAmount: 0 },
  { text: "if (left < rigth ):", tabAmount: 1 },
  { text: "mid = (left + right) / 2 ", tabAmount: 2 },
  { text: "MergeSort(arr, left, mid)", tabAmount: 2 },
  { text: "MergeSort(arr, mid + 1, right)", tabAmount: 2 },
  { text: "Merge(arr, left, mid, right)", tabAmount: 2 },
  { text: "", tabAmount: 1 },
  { text: "", tabAmount: 1 },
  { text: "Merge(arr, left, mid, right):", tabAmount: 0 },
  { text: "L = arr[left...mid]", tabAmount: 1 },
  { text: "R = arr[mid+1...right]", tabAmount: 1 },
  { text: "i = j = k = 0", tabAmount: 1 },
  { text: "while (i< len(L) and j<len(R):", tabAmount: 1 },
  { text: "if (L[i] <= R[j]):", tabAmount: 2 },
  { text: "arr[k] = L[i]", tabAmount: 3 },
  { text: "i++", tabAmount: 3 },
  { text: "else:", tabAmount: 2 },
  { text: "arr[k] = R[j]", tabAmount: 3 },
  { text: "j++", tabAmount: 3 },
  { text: "k++", tabAmount: 2 },
  { text: "while (i< len(L):", tabAmount: 1 },
  { text: "arr[k] = L[i]", tabAmount: 2 },
  { text: "i++", tabAmount: 2 },
  { text: "k++", tabAmount: 2 },
  { text: "while (j< len(R):", tabAmount: 1 },
  { text: "arr[k] = R[j]", tabAmount: 2 },
  { text: "j++", tabAmount: 2 },
  { text: "k++", tabAmount: 2 },
];

export const stackPseudoCode: PseudoItem[] = [
  { text: "N = 10", tabAmount: 0 },
  { text: "", tabAmount: 1 },
  { text: "Pop(stack):", tabAmount: 0 },
  { text: "if (!stack.isEmpty()):", tabAmount: 1 },
  { text: "value = stack[top]", tabAmount: 2 },
  { text: "top = top - 1", tabAmount: 2 },
  { text: "return value", tabAmount: 2 },
  { text: "", tabAmount: 1 },
  { text: "", tabAmount: 1 },
  { text: "Push(stack, value):", tabAmount: 0 },
  { text: "if (top < N)", tabAmount: 1 },
  { text: "top = top + 1", tabAmount: 2 },
  { text: "stack[top] = value", tabAmount: 2 },
];

export const queuePseudoCode: PseudoItem[] = [
  { text: "N = 10", tabAmount: 0 },
  { text: "", tabAmount: 1 },
  { text: "Dequeue(queue):", tabAmount: 0 },
  { text: "if (!queue.isEmpty()):", tabAmount: 1 },
  { text: "value = queue[head]", tabAmount: 2 },
  { text: "head = head + 1", tabAmount: 2 },
  { text: "return value", tabAmount: 2 },
  { text: "", tabAmount: 1 },
  { text: "", tabAmount: 1 },
  { text: "Enqueue(queue, value):", tabAmount: 0 },
  { text: "if (tail < N)", tabAmount: 1 },
  { text: "tail = tail + 1", tabAmount: 2 },
  { text: "queue[tail] = value", tabAmount: 2 },
];
