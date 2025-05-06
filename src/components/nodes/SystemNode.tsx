import { classNames } from "@/utils/helpers";
import { useShowRelatedNodes } from "@/utils/useShowRelatedNodes";
import { Handle, Node, Position, useNodeId } from "@xyflow/react";
import { forwardRef, useEffect } from "react";

type SystemNodeProps = Node<
  {
    label: string;
    id: string;
    onNodeDoubleClick: () => void;
  },
  "string"
>;

const SystemNode = forwardRef<HTMLDivElement, SystemNodeProps>(
  ({ data, selected }, ref) => {
    const nodeId = useNodeId();

    const { targetNodeId } = useShowRelatedNodes();

    useEffect(() => {
      console.log("[SYSTEM NODE] Target node ID:", targetNodeId);
    }, [targetNodeId]);

    return (
      <div
        ref={ref}
        className={classNames(
          "rounded-sm p-4 text-foreground-text bg-background-node",
          `w-72 h-16 flex flex-col items-center justify-center font-semibold text-lg`,
          !selected && "outline-0 ",
          !!selected && "outline-2 outline-amber-500"
        )}
        onDoubleClick={() => {
          data.onNodeDoubleClick();
        }}
      >
        <Handle type="target" position={Position.Top} />
        <div>
          <span>{data.label}</span>
        </div>
        <Handle type="source" position={Position.Bottom} />
      </div>
    );
  }
);

SystemNode.displayName = "SystemNode";
export default SystemNode;
