import { Node, useReactFlow } from "@xyflow/react";

export function useAddNode() {
  const { setNodes, getNodes } = useReactFlow();

  const nodes = getNodes();

  const addNode = (name: string) => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      data: { label: name },
      type: "system",
      position: { x: Math.random() * 50, y: Math.random() * 50 },
    };

    setNodes((prev) => [...prev, newNode]);
  };

  return { addNode };
}
