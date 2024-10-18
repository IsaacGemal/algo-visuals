// This page will house the basic logic that I'll use to for the sorts.
// Lets start with the basics!

// Bubble sort! As easy as it gets
// Look at an element
// Look at the next one
// If the second one is smaller, swap them
// Repeat until sorted

function bubbleSort(unsortedArray: number[]): number[] {
  for (let i = 0; i < unsortedArray.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < unsortedArray.length - 1 - i; j++) {
      console.log(
        `Lets compare ${unsortedArray[j]} and ${unsortedArray[j + 1]}`
      );
      if (unsortedArray[j] > unsortedArray[j + 1]) {
        console.log(`Swapping ${unsortedArray[j]} and ${unsortedArray[j + 1]}`);
        swapped = true;
        [unsortedArray[j], unsortedArray[j + 1]] = [
          unsortedArray[j + 1],
          unsortedArray[j],
        ];
      }
    }
    if (!swapped) break;
  }

  console.log("Sorting complete:", unsortedArray);
  return unsortedArray;
}

// const unsortedArray: number[] = [5, 2, 8, 3, 1, 6, 4, 9];
// bubbleSort(unsortedArray);

// Time for selection sort!
// Lets bring back our unsorted array
// Actually lets just make a new array cause otherwise we have issues with const and all that

// Selection sort is simple
// In-place sorting algorithm
// Keeps track of the minimum value during each loop
// Takes the smallest value and moves it to the start
// Loop through the array, find the next smallest value, and place it right after the last sorted value
// We have two sections: the sorted and unsorted parts
// Eventually, the entire array is sorted

const Array2: number[] = [3, 11, 4, 1, 5, 9, 11, 6]; // Added array type annotations for fun

// Lets start simple
// Loop through all elements, find the min value, and swap it with the first spot

export function bubbleSortWithCallback(
  unsortedArray: number[],
  callback: (array: number[]) => void
): number[] {
  for (let i = 0; i < unsortedArray.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < unsortedArray.length - 1 - i; j++) {
      if (unsortedArray[j] > unsortedArray[j + 1]) {
        callback(unsortedArray);
        swapped = true;
        [unsortedArray[j], unsortedArray[j + 1]] = [
          unsortedArray[j + 1],
          unsortedArray[j],
        ];
      }
    }
    if (!swapped) break;
  }

  // console.log("Sorting complete:", unsortedArray);
  return unsortedArray;
}

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

// const unsortedArray: number[] = [5, 2, 8, 3, 1, 6, 4, 9];
// bubbleSort(unsortedArray);

// Time for selection sort!
// Lets bring back our unsorted array
// Actually lets just make a new array cause otherwise we have issues with const and all that

// Selection sort is simple
// In-place sorting algorithm
// Keeps track of the minimum value during each loop
// Takes the smallest value and moves it to the start
// Loop through the array, find the next smallest value, and place it right after the last sorted value
// We have two sections: the sorted and unsorted parts
// Eventually, the entire array is sorted

// const Array2: number[] = [3, 11, 4, 1, 5, 9, 11, 6]; // Added array type annotations for fun

// // Lets start simple
// // Loop through all elements, find the min value, and swap it with the first spot

// const newArr: number[] = [1, 2, 3, 4, 5];

// for (let i = 0; i < newArr.length; i++) {
//   console.log(i);
// }
