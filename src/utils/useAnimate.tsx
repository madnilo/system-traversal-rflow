import { Edge, Node, ReactFlowInstance, XYPosition } from "@xyflow/react";


interface AnimateParams {
    nodeId: string;
    position: XYPosition;
    duration: number;
}

const animate = ({getNode, setNodes}: ReactFlowInstance<Node, Edge>) => ({ nodeId, position, duration }: AnimateParams) => {
    const startTime = Date.now();

    const node = getNode(nodeId);

    if (!node) {
        return;
    }

    const startingPosition = node.position;

    function frame() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const newX = interpolate(startingPosition.x, position.x, progress);
        const newY = interpolate(startingPosition.y, position.y, progress);

        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === nodeId) {
                    return {
                        ...node,
                        position: {
                            x: newX,
                            y: newY,
                        },
                    };
                }

                return node;
            })
        );

        if (progress < 1) {
            requestAnimationFrame(frame);
        }
    }

    function interpolate(start: number, end: number, progress: number) {
        return start + (end - start) * progress;
    }

    requestAnimationFrame(frame);
}

interface AnimateProps {
    instance: ReactFlowInstance<Node, Edge>;
}
export function useAnimate({ instance }: AnimateProps) {
    return {
        animate: animate(instance)
    }
}