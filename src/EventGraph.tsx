import * as React from "react";
import { parseCSV } from "./util/csv.js";
import type { CSVRow } from "./util/csv.js";

export type NodeId = string;
export type NodeRow = CSVRow & { id: string; description?: string };
export type EdgeRow = CSVRow & { from: string; to: string; optionText?: string; condition?: string };

export type EventGraphProps = {
  nodeCsvText: string;
  edgeCsvText: string;
  isConditionMet?: (edge: EdgeRow) => boolean;
  hideBlockedOptions?: boolean;
  initialNodeId?: string;
  onNavigate?: (from: NodeId, to: NodeId, via: EdgeRow) => void;
  className?: string;
};

type Built = {
  nodeById: Map<NodeId, NodeRow>;
  edgesByFrom: Map<NodeId, EdgeRow[]>;
  start: NodeId | "";
};

function build(nodeCsvText: string, edgeCsvText: string, initialNodeId?: string): Built {
  const nodes = parseCSV(nodeCsvText) as NodeRow[];
  const edges = parseCSV(edgeCsvText) as EdgeRow[];

  // Validate nodes
  const nodeById = new Map<NodeId, NodeRow>();
  for (const r of nodes) {
    if (!r.id || !String(r.id).trim()) {
      throw new Error(`Node row missing "id": ${JSON.stringify(r)}`);
    }
    nodeById.set(r.id, { ...r, description: r.description ?? "" });
  }

  // Validate edges
  const edgesByFrom = new Map<NodeId, EdgeRow[]>();
  for (const e of edges) {
    if (!e.from || !e.to) {
      throw new Error(`Edge row missing "from" or "to": ${JSON.stringify(e)}`);
    }
    if (!nodeById.has(e.from)) throw new Error(`Unknown "from" id: ${e.from}`);
    if (!nodeById.has(e.to)) throw new Error(`Unknown "to" id: ${e.to}`);
    (edgesByFrom.get(e.from) ?? edgesByFrom.set(e.from, []).get(e.from)!).push(e);
  }

  // Pick start
  const start =
    (initialNodeId && nodeById.has(initialNodeId) && initialNodeId) ||
    (nodeById.has("start") ? "start" : nodes[0]?.id || "");

  return { nodeById, edgesByFrom, start };
}

export default function EventGraph({
  nodeCsvText,
  edgeCsvText,
  isConditionMet,
  hideBlockedOptions = false,
  initialNodeId,
  onNavigate,
  className,
}: EventGraphProps) {
  const { nodeById, edgesByFrom, start } = React.useMemo(
    () => build(nodeCsvText, edgeCsvText, initialNodeId),
    [nodeCsvText, edgeCsvText, initialNodeId]
  );

  const [current, setCurrent] = React.useState<NodeId>(start);

  const currentNode = current ? nodeById.get(current) : undefined;
  const outgoing = current ? edgesByFrom.get(current) ?? [] : [];

  const move = (edge: EdgeRow) => {
    const from = current;
    const to = edge.to;
    setCurrent(to);
    onNavigate?.(from, to, edge);
  };

  if (!currentNode) {
    return (
      <div className={className}>
        <strong>No valid starting node.</strong> Ensure your nodes CSV has at least one row.
      </div>
    );
  }

  return (
    <div className={className}>
      <h2 style={{ margin: 0 }}>{currentNode.id}</h2>
      {currentNode.description ? (
        <p style={{ whiteSpace: "pre-wrap" }}>{currentNode.description}</p>
      ) : null}

      <div style={{ margin: "12px 0" }}>
        <label>
          Jump to:&nbsp;
          <select
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          >
            {Array.from(nodeById.keys()).map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </label>
      </div>

      <h3 style={{ marginTop: 16 }}>Options</h3>
      {outgoing.length === 0 ? (
        <div style={{ color: "#666" }}>No outgoing edges from this node.</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {outgoing
            .filter((e) => {
              const ok = isConditionMet ? !!isConditionMet(e) : true;
              return hideBlockedOptions ? ok : true;
            })
            .map((e, i) => {
              const allowed = isConditionMet ? !!isConditionMet(e) : true;
              const label = e.optionText?.trim() ? e.optionText : `→ ${e.to}`;
              return (
                <li key={`${e.from}:${e.to}:${i}`} style={{ marginBottom: 8 }}>
                  <button
                    onClick={() => move(e)}
                    disabled={!allowed}
                    title={!allowed && e.condition ? `Blocked: ${e.condition}` : undefined}
                  >
                    {label}
                  </button>{" "}
                  <small style={{ color: "#666" }}>
                    {e.from} → {e.to}
                    {e.condition ? ` • ${e.condition}` : ""}
                  </small>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}

export { EventGraph };