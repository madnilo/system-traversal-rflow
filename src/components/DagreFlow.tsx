"use client";

import { useLayoutedElements } from "@/utils/useLayoutedElements";
import {
  addEdge,
  Background,
  Connection,
  ConnectionLineType,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback } from "react";
import { initialEdges, initialNodes } from "./initialElements";

const Flow = () => {
  const { getLayoutedElements } = useLayoutedElements();

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements({
    nodes: initialNodes,
    edges: initialEdges,
    direction: "TB",
  });

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    [setEdges]
  );
  const onLayout = useCallback(
    (direction: "TB" | "LR") => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements({
          nodes,
          edges,
          direction,
        });

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [getLayoutedElements, nodes, edges, setNodes, setEdges]
  );

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        style={{}}
      >
        <Panel position="top-right">
          <button className="xy-theme__button" onClick={() => onLayout("TB")}>
            vertical layout
          </button>
          <button className="xy-theme__button" onClick={() => onLayout("LR")}>
            horizontal layout
          </button>
        </Panel>
        <Background />
      </ReactFlow>
    </div>
  );
};

export function DagreFlow() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
