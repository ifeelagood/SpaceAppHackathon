import * as React from "react";
import { EventGraph } from "../game/event.js";

export const WebEventGraph: React.FC = () => {
  const [edgeData, setEdgeData] = React.useState<string | undefined>();
  const [nodeData, setNodeData] = React.useState<string | undefined>();

  // Load edges
  React.useEffect(() => {
    fetch("/edges.csv")
      .then((res) => res.text())
      .then((csvText) => {
        setEdgeData(csvText);
      });
  }, []);

  // Load nodes
  React.useEffect(() => {
    fetch("/nodes.csv")
      .then((res) => res.text())
      .then((csvText) => {
        setNodeData(csvText);
      });
  }, []);

  // Create EventGraph once both CSVs are loaded
  const eventGraph = React.useMemo(() => {
    if (!edgeData || !nodeData) return null;
    try {
      return new EventGraph(nodeData, edgeData); // node first, edge second
    } catch (err) {
      console.error("Failed to construct EventGraph:", err);
      return null;
    }
  }, [nodeData, edgeData]);

  if (!eventGraph) {
    return <div>Loading event graph...</div>;
  }

  return (
    <div>
      <h2>Event Graph</h2>
      <p>{eventGraph.nodes[0].description}</p>
    </div>
  );
};