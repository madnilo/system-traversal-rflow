import { classNames } from "@/utils/helpers";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";

type SystemNode = Node<{ label: string }, "string">;

const handleStyle = { left: 10 };

function SystemNode(props: NodeProps<SystemNode>) {
  // const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
  //     console.log(evt?.target?.value);
  // }, []);

  const { selected, data } = props;
  console.log("data", props);

  return (
    <div
      className={classNames(
        "rounded-sm p-4 text-foreground-text",
        !selected && "outline-0 bg-background-node",
        selected && "outline-2 outline-amber-500 bg-background-node-selected"
      )}
    >
      <Handle type="target" position={Position.Top} />
      <div>
        {/* <label htmlFor="text">Text:</label>
                <input id="text" name="text" onChange={onChange} className="nodrag" />
                 */}
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
