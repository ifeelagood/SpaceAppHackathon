import fs from "node:fs";

import { parseCSV} from "../util/csv.js";
import type { CSVRow } from "../util/csv.js";

// Nodes must include an "id" column
type NodeRow = CSVRow & { id: string, description: string };

// Edges must include "from" and "to" columns (node ids)
type EdgeRow = CSVRow & { from: string; to: string, optionText: string, condition: string };

type NodeId = string;

class EventGraph {
  public nodes: NodeRow[] = [];
  public edges: EdgeRow[] = [];
  public adjacencyList: Map<NodeId, NodeId[]> = new Map<NodeId, NodeId[]>();
  
  constructor(nodeFilename : string, edgeFilename: string) {
    this.nodes = [];
    this.edges = [];
    this.adjacencyList = new Map<NodeId, NodeId[]>();

    // Read and parse
    const nodeCsv = parseCSV(fs.readFileSync(nodeFilename, "utf-8"));
    const edgeCsv = parseCSV(fs.readFileSync(edgeFilename, "utf-8")); // fixed: was nodeFilename

    // Validate nodes: require "id"

    for (const record of nodeCsv) {
      if (!record.id || record.id.trim() === "") {
        throw new Error(`Node row missing required "id": ${JSON.stringify(record)}`);
      }
      this.nodes.push(record as NodeRow);
    }

    // Track existing node ids
    const seenNodes = new Set<string>(this.nodes.map((n) => n.id));

    // Validate edges: require "from","to" and refer to existing nodes
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

      this.edges.push(record as EdgeRow);
    }

    // Build adjacency list
    for (const nodeId of seenNodes) {
      this.adjacencyList.set(nodeId, []);
    }
    for (const { from, to } of this.edges) {
      this.adjacencyList.get(from)!.push(to);
    }
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


export { EventGraph }