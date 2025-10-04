import fs from "node:fs";

import { parseCSV} from "../util/csv.js";
import type { CSVRow } from "../util/csv.js";

// Nodes must include an "id" column
type NodeRow = CSVRow & { id: string, description: string };

// Edges must include "from" and "to" columns (node ids)
type EdgeRow = CSVRow & { from: string; to: string, optionText: string, condition: string };

type NodeId = string;

interface EventGraph {
  nodes: NodeRow[];
  edges: EdgeRow[];
  adjacencyList: Map<NodeId, NodeId[]>;
}

function loadEventGraphFromFile(nodeFilename: string, edgeFilename: string): EventGraph {
  const eventGraph: EventGraph = {
    nodes: [],
    edges: [],
    adjacencyList: new Map<NodeId, NodeId[]>()
  };

  // Reset
  eventGraph.nodes = [];
  eventGraph.edges = [];
  eventGraph.adjacencyList = new Map<NodeId, NodeId[]>();

  // Read and parse
  const nodeCsv = parseCSV(fs.readFileSync(nodeFilename, "utf-8"));
  const edgeCsv = parseCSV(fs.readFileSync(edgeFilename, "utf-8")); // fixed: was nodeFilename

  // Validate nodes: require "id"
  const nodes: NodeRow[] = [];
  for (const record of nodeCsv) {
    if (!record.id || record.id.trim() === "") {
      throw new Error(`Node row missing required "id": ${JSON.stringify(record)}`);
    }
    nodes.push(record as NodeRow);
  }
  eventGraph.nodes = nodes;

  // Track existing node ids
  const seenNodes = new Set<string>(nodes.map((n) => n.id));

  // Validate edges: require "from","to" and refer to existing nodes
  const edges: EdgeRow[] = [];
  for (const record of edgeCsv) {
    const from = record.from;
    const to = record.to;

    if (!from || !to) {
      throw new Error(`Edge row missing "from" or "to": ${JSON.stringify(record)}`);
    }
    if (!seenNodes.has(from)) {
      throw new Error(`Edge refers to unknown "from" node id: ${from}`);
    }
    if (!seenNodes.has(to)) {
      throw new Error(`Edge refers to unknown "to" node id: ${to}`);
    }

    edges.push(record as EdgeRow);
  }
  eventGraph.edges = edges;

  // Build adjacency list
  for (const nodeId of seenNodes) {
    eventGraph.adjacencyList.set(nodeId, []);
  }
  for (const { from, to } of edges) {
    eventGraph.adjacencyList.get(from)!.push(to);
  }

  return eventGraph;
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


export { loadEventGraphFromFile }
export type { EventGraph, NodeRow, EdgeRow, NodeId }