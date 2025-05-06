import { useEffect } from "react";
import { TRANSITION_DURATION } from "../constants/values";
import { useAnimate } from "./useAnimate";
import { useLayoutedElements } from "./useLayoutedElements";

function useAutoLayout() {
  const { getLayoutedElements } = useLayoutedElements();
  const { animate } = useAnimate();
  //   const { fitView } = useReactFlow();

  const layoutedElements = getLayoutedElements();

  useEffect(() => {
    console.log("layoutedElements", layoutedElements);
    layoutedElements.nodes.map((node) =>
      animate({
        nodeId: node.id,
        position: {
          x: node.position.x,
          y: node.position.y,
        },
        duration: TRANSITION_DURATION,
      })
    );

    // fitView({ nodes: layoutedElements.nodes, duration: 100 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutedElements.nodes.length, layoutedElements.edges.length]);
}

export { useAutoLayout };
