// SEARCHES

import { circle } from "framer-motion/client";

// Lets go through some of the basic searches
// Linear search

const unsortedArray: number[] = [4, 2, 7, 1, 3, 9, 6, 5, 8];

function LinearSearch(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (unsortedArray[i] === target) {
      return i;
    }
  }
  return -1;
}

// Lets go through this step by step - we need a linear search function with callbacks
// We also need to export it
// We need to make it async

// We'll return a number that will be the index of the array. If it's not there return -1
// Dunno if this code is good or not
// export const LinearSearch2(arr: number[], target: number): number => {
//   for(let i = 0; i < arr.length; i++) {
//     if (arr[i] === target) {
//       return(i)
//     }
//   }
//   return -1;
// }

export const LinearSearch3 = async (
  arr: number[],
  target: number,
  onCompare: (currentIndex: number) => void,
  delay: number = 200
): Promise<number> => {
  for (let i = 0; i < arr.length; i++) {
    // Add a delay before each comparison
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Call the callback with the current index being compared
    onCompare(i);

    if (arr[i] === target) {
      return i; // Found the target
    }
  }
  return -1; // Target not found
};

export const bubbleSortWithCallback2 = async (
  array: number[],
  callback: (array: number[], indices: number[]) => void
): Promise<void> => {
  let arr = [...array];
  let n = arr.length;
  const delay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // Swap adjacent elements
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          // Pass the updated array and the indices being swapped to the callback
          callback([...arr], [j, j + 1]);
          // Add a delay to see the effect of the sort in steps
          await delay(500); // 500ms delay
        }
      }
    }
    // Reset the highlighted indices when sorting is done
    callback([...arr], []);
  };
  await bubbleSort();
};

// console.log(LinearSearch(unsortedArray, 54));

// Binary search!
// Like searching for things in a dictionary
// O(log(N)) time because you're splitting things in half every time
// The number of times you halve something till you get one element left is log2(N)
// Only works on sorted things

// First we get an array of sorted values
// They're sorted, but they're not uniform
// What's the fastest way to find a specific number (provided it's in the array) ?
// Binary search!

const sortedNumbers: number[] = [
  3, 8, 12, 15, 19, 24, 29, 33, 37, 42, 47, 52, 58, 63, 69, 73, 78, 85, 91, 97,
];

function BinarySearch(arr: number[], target: number): number {
  // Let's define our midpoint, left point and right point. For odd numbers, it'll choose the left number
  let mid = Math.floor(arr.length / 2);
  let l = 0;
  let r = arr.length - 1;

  console.log(`Target number is ${target} and we just ran into ${arr[mid]}`);

  while (l <= r) {
    // If l > r, it's not in the array
    if (target == arr[mid]) {
      console.log(`Target found at index ${mid}`);
      return mid;
    } else if (target < arr[mid]) {
      console.log(`Time for a new target! Let's go left.`);
      r = mid - 1; // We know mid isn't it, so we can go one less
      mid = Math.floor((l + r) / 2);
    } else {
      console.log(`Time for a new target! Let's go right.`);
      l = mid + 1; // Again we can go up by one.
      mid = Math.floor((l + r) / 2);
    }
  }
  return -1;
}

// console.log(BinarySearch(sortedNumbers, 63)); // 47 is the middle index fwiw

// Nice!
// Now lets get to the good stuff
// DFS! There's a lot of theory that is needed here, but at the end of the day implementing this will be the way to go.

// We'll be traversing everything vertically before going horizontally
// The concept of the stack is really important, and is needed to do DFS (and when you think about it, it makes sense)
// Think of the large stack of plates

// Two ways to store the data, adjacency list and an adjacency matrix - they each have their own tradeoffs
// Typically an adjacency list is more popular, though there are times where the matrix is a better option
// You should know the details between the two

// The adjaceny list is simple, it's just a list of all connections for each node.
// I will be storing it as an object

type Vertex = string; // You can change this to number if you prefer

// This is a purely abstract representation. You can't console log it as it only exists at typescript compile time.
interface AdjacencyList {
  [vertex: Vertex]: Vertex[];
}

const graph: AdjacencyList = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B", "G"],
  E: ["B", "F"],
  F: ["C", "E"],
  G: ["D"],
};

// Lets start off with the basics.

export function dfsOld(
  graph: AdjacencyList,
  currentVertex: Vertex,
  visited: Set<Vertex> = new Set()
): void {
  // Note that this function is technically void - the real output are the side effects, the console.log
  // Mark the current node as visited
  visited.add(currentVertex);
  console.log(currentVertex); // Print or process the node

  // Recur for all the vertices adjacent to this vertex
  for (const neighbor of currentVertex) {
    // For each of the neighbors of A...  // START IS A VERTEX! - FIRST ITERATION IS A!
    if (!visited.has(neighbor)) {
      dfsOld(graph, neighbor, visited);
    }
  }
}

// the actual dfs function im using
export function dfs(
  graph: AdjacencyList,
  currentVertex: Vertex,
  visited: Set<Vertex> = new Set<Vertex>(), // Specify Set<Vertex> type
  traversal: Vertex[] = [] // Specify Vertex[] type for traversal array
): Vertex[] {
  // Mark the current node as visited
  visited.add(currentVertex);
  traversal.push(currentVertex);

  // Recur for all the vertices adjacent to this vertex
  for (const neighbor of graph[currentVertex]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited, traversal);
    }
  }

  return traversal;
}

// To think of graph[currentVertex] think of arr[i], same exact thing

// Start DFS traversal from node 'A'
// dfsOld(graph, "D");

// And now, BFS

export function bfsOld(graph: AdjacencyList, start: Vertex): void {
  const visited: Set<Vertex> = new Set();
  const queue: Vertex[] = [start];

  // Mark the start node as visited
  visited.add(start);

  // Loop while there are nodes in the queue
  while (queue.length > 0) {
    const current = queue.shift()!; // Dequeue a vertex from the front
    console.log(current); // Print or process the node

    // Enqueue all unvisited adjacent vertices
    for (const neighbor of graph[current]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor); // Add the neighbor to the queue for future exploration
      }
    }
  }
}

// Start BFS traversal from node 'A'
bfsOld(graph, "A");

// now the final, working BFS
export function bfs(
  graph: AdjacencyList,
  startVertex: Vertex,
  visited: Set<Vertex> = new Set<Vertex>(), // Specify Set<Vertex> type
  traversal: Vertex[] = [] // Specify Vertex[] type for traversal array
): Vertex[] {
  const queue: Vertex[] = [startVertex]; // Queue to manage BFS

  // Mark the start node as visited
  visited.add(startVertex);

  while (queue.length > 0) {
    const currentVertex = queue.shift(); // Get the vertex at the front of the queue

    if (currentVertex !== undefined) {
      traversal.push(currentVertex);

      // Enqueue all unvisited neighbors of the current vertex
      for (const neighbor of graph[currentVertex]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }

  return traversal;
}
