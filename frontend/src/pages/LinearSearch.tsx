import React, { useState } from 'react';
import { LinearSearch3 } from '../BasicSearches';

function LinearSearch() {
    const [demoArray, setDemoArray] = useState(
        Array.from({ length: 8 }, () => Math.floor(Math.random() * 11))
    );
    const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
    const [target, setTarget] = useState(Math.floor(Math.random() * 11)); // Random target number
    const [searchResult, setSearchResult] = useState<string | null>(null);


    const handleClick = () => {
        LinearSearch3(demoArray, target, (currentIndex) => {
            setHighlightedIndices([currentIndex]); // Set the current index being compared
        }).then((result) => {
            if (result === -1) {
                setSearchResult("Target not found");
            } else {
                setSearchResult(`Target found at index ${result}`);
            }
        });
    };


    return (
        <>
            <h2>
                Linear search is as simple as it gets. Check each position one by one until you find the item.
            </h2>
            <div className="flex">
                {demoArray.map((item, index) => (
                    <div
                        key={index}
                        className={`w-12 h-12 border border-black p-5 flex justify-center items-center ${highlightedIndices.includes(index) ? 'bg-yellow-300' : ''
                            }`}
                    >
                        {item}
                    </div>
                ))}
            </div>
            <h1 className="mb-4 text-gray-800">
                All we need is a target, which in this instance will be the number{' '}
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

export default LinearSearch;
