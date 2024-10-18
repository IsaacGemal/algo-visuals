import { useState } from 'react';
import { binarysearch } from '../BasicSearches';

function BinarySearch() {
    const [demoArray] = useState<number[]>(() => {
        const uniqueNumbers = new Set<number>();
        while (uniqueNumbers.size < 20) {
            uniqueNumbers.add(Math.floor(Math.random() * 50));
        }
        return Array.from(uniqueNumbers).sort((a, b) => a - b);
    });

    const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
    const [target] = useState<number>(Math.floor(Math.random() * 20)); // Random target number
    const [searchResult, setSearchResult] = useState<string | null>(null);

    const handleClick = () => {
        const [result, steps]: [number, number[]] = binarysearch(demoArray, target);

        let i = 0;
        const intervalId = setInterval(() => {
            if (i < steps.length) {
                setHighlightedIndices([steps[i]]);
                i++;
            } else {
                clearInterval(intervalId);
                if (result === -1) {
                    setSearchResult("Target not found");
                } else {
                    setSearchResult(`Target found at index ${result}`);
                }
            }
        }, 250);
    };

    return (
        <>
            <h2>
                Binary search finds an item in a sorted list by dividing the search interval in half.
            </h2>
            <div className="flex">
                {demoArray.map((item, index) => (
                    <div
                        key={index}
                        className={`w-12 h-12 border border-black p-5 flex justify-center items-center ${highlightedIndices.includes(index) ? 'bg-yellow-300' : ''}`}
                    >
                        {item}
                    </div>
                ))}
            </div>
            <h1 className="mb-4 text-gray-800">
                We're searching for the target number{' '}
                <span className="font-bold">{target}</span>
            </h1>
            <button
                onClick={handleClick}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
                Press to get started
            </button>
            <div className="flex flex-col items-center">
                {searchResult && (
                    <div className="mt-4 text-lg font-bold text-green-600">
                        {searchResult}
                    </div>
                )}
            </div>
        </>
    );
}

export default BinarySearch;
