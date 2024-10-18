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

export function dfs(
  graph: AdjacencyList,
  currentVertex: Vertex,
  target: Vertex,
  visited?: Set<Vertex>
): Set<Vertex> | void {
  if (!visited) visited = new Set();
  visited.add(currentVertex);
  const neighbors = graph[currentVertex];

  if (currentVertex == target) {
    return visited;
  }

  for (const neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      // ONLY RETURN THE SET IT THERE'S A SET; DO NOT RETURN VOID EARLY!!!
      const searchResult = dfs(graph, neighbor, target, visited);
      if (searchResult) return searchResult;
    }
  }
}

const test123 = dfs(graph, "A", "B");
console.log(test123);
