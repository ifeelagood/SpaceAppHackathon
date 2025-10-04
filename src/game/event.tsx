const eventGraph = {
  nodes: [],
  edges: [],
  adjacencyList: new Map()  // id -> array of ids
};

function loadEventGraphFromFile(nodeFilename: string, edgeFilename: string) {

  eventGraph.nodes = [];
  eventGraph.edges = [];
  eventGraph.adjacencyList = new Map();
}


// const eventNodeExample = {
//   id: "start",
//   description: "Ready to start?",
//   leaf: false
// };

// const eventEdgeExample = {
//   eventId: "start",
//   to: "firstChoice",
//   effect: "resetResources"
// };



