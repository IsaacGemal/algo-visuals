import React, { useState, useEffect } from 'react'
import { bfs } from '../BasicSearches';


function BFS() {

    const [traversalOrder, setTraversalOrder] = useState([]);

    const graph = {
        A: ["B", "C"],
        B: ["A", "D", "E"],
        C: ["A", "F"],
        D: ["B", "G"],
        E: ["B", "F"],
        F: ["C", "E"],
        G: ["D"],
    };

    const nodePositions = {
        A: { x: 200, y: 100 },
        B: { x: 100, y: 200 },
        C: { x: 300, y: 200 },
        D: { x: 50, y: 300 },
        E: { x: 150, y: 300 },
        F: { x: 250, y: 300 },
        G: { x: 100, y: 350 },
    };

    const handleBFS = () => {
        const traversal = bfs(graph, 'A'); // Get the traversal order from your dfs function
        setTraversalOrder([]); // Clear the traversal order initially

        traversal.forEach((node, index) => {
            setTimeout(() => {
                // Update the traversal order step by step with delay
                setTraversalOrder(prev => [...prev, node]);
            }, index * 500); // 500ms delay between each node (adjust as needed)
        });
    };
    const Node = ({ node }) => {
        const isVisited = traversalOrder.includes(node);
        const fillColor = isVisited ? 'orange' : 'lightblue';

        return (
            <g key={node}>
                <circle cx={nodePositions[node].x} cy={nodePositions[node].y} r="20" fill={fillColor} stroke="blue" />
                <text x={nodePositions[node].x} y={nodePositions[node].y} textAnchor="middle" dy=".3em">{node}</text>
            </g>
        );
    };

    const Edge = ({ start, end }) => (
        <line
            key={`${start}-${end}`}
            x1={nodePositions[start].x}
            y1={nodePositions[start].y}
            x2={nodePositions[end].x}
            y2={nodePositions[end].y}
            stroke="gray"
        />
    );

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">DFS Graph Visualization</h2>
            <button onClick={handleBFS} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Run BFS</button>
            <svg width="400" height="400" className="border border-gray-300">
                {Object.entries(graph).map(([node, neighbors]) =>
                    neighbors.map(neighbor => <Edge key={`${node}-${neighbor}`} start={node} end={neighbor} />)
                )}
                {Object.keys(graph).map(node => <Node key={node} node={node} />)}
            </svg>
            <p className="mt-4">Traversal Order: {traversalOrder.join(' -> ')}</p>
        </div>
    )

}

export default BFS