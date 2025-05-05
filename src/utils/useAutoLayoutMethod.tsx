import { TRANSITION_DURATION } from "./constants";
import { useAnimate } from "./useAnimate";
import { useLayoutedElements } from "./useLayoutedElements";

interface ReturnProps {
  refreshLayout: () => void;
}

function useAutoLayoutMethod(): ReturnProps {
  const { getLayoutedElements } = useLayoutedElements();
  const { animate } = useAnimate();

  const layoutedElements = getLayoutedElements();

  const refreshLayout = () => {
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
  };

  return { refreshLayout };
}

export { useAutoLayoutMethod };
