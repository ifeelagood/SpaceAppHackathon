import fs from "node:fs";

const eventGraph = {
  nodes: [],
  edges: [],
  adjacencyList: new Map()  // id -> array of ids
};

function getEventGraph() {
  return eventGraph;
}

function parseCSV(csv: string) {
  const rows = csv
    .trim()
    .replace(/\r/g, '')
    .split("\n")
    .map(line => line.split(","));

  const header = rows[0];
  const dataRows = rows.slice(1);

  if (header === undefined) return [];

  return dataRows.map(row => {
    const obj: Record<string, string> = {};
    header.forEach((key, i) => {
      obj[key] = row[i] ?? "";
    });
    return obj;
  });
}

function loadEventGraphFromFile(nodeFilename: string, edgeFilename: string) {

  eventGraph.nodes = [];
  eventGraph.edges = [];
  eventGraph.adjacencyList = new Map();

  const nodeCsv = parseCSV(fs.readFileSync(nodeFilename, 'utf-8'));
  const edgeCsv = parseCSV(fs.readFileSync(nodeFilename, 'utf-8'));

  for (const record of nodeCsv) {
    console.log(record);
  }
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


export { getEventGraph, loadEventGraphFromFile }
