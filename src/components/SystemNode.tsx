import { classNames } from "@/utils/helpers";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";

type SystemNode = Node<{ label: string }, "string">;

const handleStyle = { left: 10 };

function SystemNode(props: NodeProps<SystemNode>) {
  const { selected, data } = props;

  return (
    <div
      className={classNames(
        "rounded-sm p-4 text-foreground-text",
        `w-72 h-16 flex flex-col items-center justify-center font-semibold text-lg`,
        !selected && "outline-0 bg-background-node",
        selected && "outline-2 outline-amber-500 bg-background-node-selected"
      )}
    >
      <Handle type="target" position={Position.Top} />
      <div>
        <span>{data.label}</span>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </div>
  );
}

export default SystemNode;
