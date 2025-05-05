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

const Flow = () => {
  const { getLayoutedElements } = useLayoutedElements();

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements();

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
  const onLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } =
      getLayoutedElements();

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  }, [getLayoutedElements, setNodes, setEdges]);

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
          <button className="xy-theme__button" onClick={() => onLayout()}>
            vertical layout
          </button>
          <button className="xy-theme__button" onClick={() => onLayout()}>
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
