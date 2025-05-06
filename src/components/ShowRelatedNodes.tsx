import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  ConnectionMode,
  Node,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback } from "react";
import { useShowRelatedNodes } from "../utils/useShowRelatedNodes";

const initialNodes: Node[] = [
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
  const [nodes, , onNodesChange] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const {
    filteredNodes,
    targetNodeId,
    showRelatedNodes,
    resetNodes,
    onFilteredNodesChange,
  } = useShowRelatedNodes();

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
        onNodesChange={targetNodeId ? onFilteredNodesChange : onNodesChange}
        edges={edges}
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
