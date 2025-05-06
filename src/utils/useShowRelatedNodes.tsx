import {
  getConnectedEdges,
  Node,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useState } from "react";
import { useFitViewMethod } from "./useFitViewMethod";

const useShowRelatedNodes = () => {
  const { getNodes, getEdges } = useReactFlow();
  const { fitView } = useFitViewMethod();
  const nodes = getNodes();
  const edges = getEdges();

  const [filteredNodes, setFilteredNodes, onFilteredNodesChange] =
    useNodesState<Node>(nodes);
  const [targetNodeId, setTargetNodeId] = useState<string>();

  useEffect(() => {
    fitView();
  }, [targetNodeId, fitView]);

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
      const filteredNodes = nodes
        .filter(
          (node) => node.id === nodeId || relatedNodeIds.includes(node.id)
        )
        .map((node) => ({
          ...node,
          data: {
            ...node.data,
            onNodeDoubleClick: () => {},
          },
        }));
      setFilteredNodes(filteredNodes);
    },
    [nodes, edges, setFilteredNodes]
  );

  const resetNodes = useCallback(() => {
    console.log("Resetting nodes");
    setFilteredNodes(nodes);
    setTargetNodeId(undefined);
  }, [nodes, setFilteredNodes]);

  useEffect(() => {
    console.log("[HOOK] Target node ID:", targetNodeId);
  }, [targetNodeId]);

  return {
    filteredNodes,
    targetNodeId,
    showRelatedNodes,
    resetNodes,
    onFilteredNodesChange,
  };
};

export { useShowRelatedNodes };
