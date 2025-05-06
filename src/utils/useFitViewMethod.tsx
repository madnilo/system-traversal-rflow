import { useReactFlow } from "@xyflow/react";
import { TRANSITION_DURATION } from "../constants/values";

interface ReturnProps {
  fitView: () => void;
}

function useFitViewMethod(): ReturnProps {
  const { fitView, getNodes } = useReactFlow();

  return {
    fitView: () =>
      fitView({
        nodes: getNodes(),
        duration: TRANSITION_DURATION,
        padding: 0.4,
      }),
  };
}

export { useFitViewMethod };
