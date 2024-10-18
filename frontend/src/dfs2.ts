/*

Input is an object, the object has a key value pair, an adjacency list
The funciton also takes a currentVertex as an input - we need that to start it!
Lastly the function takes an optional parameter, a Set.

First, add the current vertex to the set (so we don't get an infinite loop)

then console.log it (for each iteration that's how the function outputs)

Then we need to read the graph object, find the nodes that are adjacent to the current vertex and go through them one by one.
As we go through them we check to make sure it's not in the set! They get added in each iteration.
Lastly, we call dfs *inside* of the for loop - that is the fundemental recusion / lesson here.
In that dfs, we call next neighbor / adjacent node from the starting vertex.
Once we have this, we have a fully functional program!


Depth First Search:
1. add the currentVertex to the set of visited vertices
2. for each neighbor
3. if we have not visited the neighbor...
4. repeat

*/
