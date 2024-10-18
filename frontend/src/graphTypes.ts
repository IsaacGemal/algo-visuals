// graphTypes.ts

export interface Graph {
  [key: string]: string[]; // Each node is a string with an array of connected neighbors
}

export interface NodePositions {
  [key: string]: { x: number; y: number }; // Each node has an x, y position
}

export interface NodeProps {
  node: string;
}

export interface EdgeProps {
  start: string;
  end: string;
}
