import { Edge, MarkerType, Node } from "@xyflow/react";

// Initial edges
export const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: "#3ECF8E", strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#3ECF8E",
    },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
    style: { stroke: "#000000", strokeWidth: 2 },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
    style: { stroke: "#0070f3", strokeWidth: 2 },
  },
];

// Initial nodes
export const initialNodes: Node[] = [
  {
    id: "1",
    type: "system",
    data: { label: "Supabase Database" },
    position: { x: 250, y: 25 },
  },
  {
    id: "2",
    data: { label: "Next.js API Routes" },
    type: "system",
    position: { x: 250, y: 150 },
  },
  {
    id: "3",
    data: { label: "React Components" },
    position: { x: 250, y: 275 },
    type: "system",
  },
  {
    id: "4",
    type: "system",
    data: { label: "User Interface" },
    position: { x: 250, y: 400 },
  },
  {
    id: "5",
    type: "system",
    data: { label: "Nested" },
    position: { x: 250, y: 525 },
  },

  {
    id: "1p",
    position: { x: 200, y: 200 },
    data: { label: "Group Node" },
    width: 380,
    height: 200,
    type: "labeledGroupNode",
  },
  {
    id: "2p",
    position: { x: 50, y: 100 },
    data: { label: "Node" },
    type: "default",
    parentId: "1p",
    extent: "parent",
  },
  {
    id: "3p",
    position: { x: 200, y: 50 },
    data: { label: "Node" },
    type: "default",
    parentId: "1p",
    extent: "parent",
  },
];
