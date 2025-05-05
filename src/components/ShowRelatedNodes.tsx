import { useFitViewMethod } from "@/utils/useFitViewMethod";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  ConnectionMode,
  getConnectedEdges,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useState } from "react";

const initialNodes = [
  { id: "1", data: { label: "Node 1" }, position: { x: 100, y: 100 } },
  { id: "2", data: { label: "Node 2" }, position: { x: 300, y: 100 } },
  { id: "3", data: { label: "Node 3" }, position: { x: 100, y: 300 } },
  { id: "4", data: { label: "Node 4" }, position: { x: 300, y: 300 } },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
];

const ShowRelatedNodes = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [filteredNodes, setFilteredNodes, onFilteredNodesChange] =
    useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [targetNodeId, setTargetNodeId] = useState<string>();

  const { fitView } = useFitViewMethod();

  useEffect(() => {
    console.log("Nodes:", nodes);
    console.log("Edges:", edges);
    console.log("Target Node ID:", targetNodeId);
  }, [nodes, edges, targetNodeId]);

  const showRelatedNodes = useCallback(
    (nodeId: string) => {
      console.log("Showing related nodes for:", nodeId);
      setTargetNodeId(nodeId);
      const connectedEdges = getConnectedEdges(
        nodes.find((node) => node.id === nodeId)
          ? [nodes.find((node) => node.id === nodeId)!]
          : [],
        edges
      );
      const relatedNodeIds = connectedEdges.reduce((acc, edge) => {
        if (edge.source !== nodeId) acc.push(edge.source);
        if (edge.target !== nodeId) acc.push(edge.target);
        return acc;
      }, [] as string[]);

      // Remove duplicates
      const filteredNodes = nodes.filter(
        (node) => node.id === nodeId || relatedNodeIds.includes(node.id)
      );
      setFilteredNodes(filteredNodes);
    },
    [nodes, edges, setFilteredNodes]
  );

  useEffect(() => {
    if (targetNodeId) {
      fitView();
    }
  }, [targetNodeId, fitView]);

  const resetNodes = useCallback(() => {
    console.log("Resetting nodes");
    setNodes(initialNodes);
    setTargetNodeId(undefined);
  }, [setNodes]);

  // Handle new connections between nodes
  const onConnect = useCallback(
    (params: Connection) => {
      console.log(params);
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
        onInit={(i) => i.zoomTo(-4)}
        nodes={targetNodeId ? filteredNodes : nodes}
        edges={edges}
        onNodesChange={targetNodeId ? onFilteredNodesChange : onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />

        <Panel
          position="top-right"
          className="bg-background-panel p-2 rounded-md shadow-md"
        >
          <button
            onClick={() => showRelatedNodes("1")}
            className="rounded bg-blue-500 text-white px-4 py-2 disabled:opacity-50 mr-1"
          >
            Show related to Node 1
          </button>
          <button
            onClick={() => showRelatedNodes("2")}
            className="rounded bg-blue-500 text-white px-4 py-2 disabled:opacity-50 mr-1"
          >
            Show related to Node 2
          </button>
          <button
            onClick={resetNodes}
            className="rounded bg-blue-500 text-white px-4 py-2 disabled:opacity-50 mr-1"
          >
            Show all nodes
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default ShowRelatedNodes;
