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
    style: {
      background: "#3ECF8E",
      color: "white",
      border: "1px solid #107969",
      borderRadius: "8px",
      padding: "10px",
      width: 180,
    },
  },
  {
    id: "2",
    data: { label: "Next.js API Routes" },
    type: "system",
    position: { x: 250, y: 150 },
    style: {
      background: "#000000",
      color: "white",
      border: "1px solid #333",
      borderRadius: "8px",
      padding: "10px",
      width: 180,
    },
  },
  {
    id: "3",
    data: { label: "React Components" },
    position: { x: 250, y: 275 },
    type: "system",
    style: {
      background: "#0070f3",
      color: "white",
      border: "1px solid #0050a3",
      borderRadius: "8px",
      padding: "10px",
      width: 180,
    },
  },
  {
    id: "4",
    type: "system",
    data: { label: "User Interface" },
    position: { x: 250, y: 400 },
    style: {
      background: "#6b21a8",
      color: "white",
      border: "1px solid #4a1072",
      borderRadius: "8px",
      padding: "10px",
      width: 180,
    },
  },
  {
    id: "5",
    type: "system",
    data: { label: "Nested" },
    position: { x: 250, y: 525 },
    style: {
      background: "#3ECF8E",
      color: "white",
      border: "1px solid #107969",
      borderRadius: "8px",
      padding: "10px",
      width: 180,
    },
  },
];
