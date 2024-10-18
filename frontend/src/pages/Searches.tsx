import React, { useState } from 'react';
import LinearSearch from './LinearSearch';
import DFS from './DFS';
import BFS from './BFS';

const Searches: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="p-4">
            <select
                value={selectedOption}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
            >
                <option value="">Select an option</option>
                <option value="LinearSearch">LinearSearch</option>
                <option value="BinarySearch">BinarySearch</option>
                <option value="DFS">DFS</option>
                <option value="BFS">BFS</option>
            </select>
            <div className="mt-2">
                {selectedOption === 'LinearSearch' && <LinearSearch />}
                {selectedOption === 'BinarySearch' && <p>Binary Search content goes here</p>}
                {selectedOption === 'DFS' && <DFS />}
                {selectedOption === 'BFS' && <BFS />}
            </div>
        </div>
    )

}

export default Searches;