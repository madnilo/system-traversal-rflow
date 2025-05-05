import dagre from "@dagrejs/dagre";
import { Edge, Node, Position, useReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

export const nodeWidth = 288;
export const nodeHeight = 64;

export interface LayoutedElements {
  getNodes: () => Node[];
  getEdges: () => Edge[];
  direction?: "TB" | "LR";
}
export interface ReturnProps {
  nodes: Node[];
  edges: Edge[];
}

const getLayoutedElements =
  ({ getNodes, getEdges, direction = "TB" }: LayoutedElements) =>
  (): ReturnProps => {
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction });

    const nodes = getNodes();
    const edges = getEdges();

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const newNodes = nodes
      .filter((node) => !node.parentId)
      .map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        const newNode = {
          ...node,
          targetPosition: isHorizontal ? Position.Left : Position.Top,
          sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
          // We are shifting the dagre node position (anchor=center center) to the top left
          // so it matches the React Flow node anchor point (top left).
          position: {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
          },
        };

        return newNode;
      });

    return { nodes: newNodes, edges };
  };

export const useLayoutedElements = () => {
  const { getNodes, getEdges } = useReactFlow();
  return {
    getLayoutedElements: getLayoutedElements({
      getEdges,
      getNodes,
      direction: "TB",
    }),
  };
};
