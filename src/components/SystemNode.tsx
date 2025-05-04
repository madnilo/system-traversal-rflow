import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import { useCallback } from 'react';

type SystemNode = Node<{ numdber: number }, 'number'>;


const handleStyle = { left: 10 };

function SystemNode({ }: NodeProps<SystemNode>) {
    const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        console.log(evt?.target?.value);
    }, []);

    return (
        <div className="animate-pulse">
            <Handle type="target" position={Position.Top} />
            <div>
                <label htmlFor="text">Text:</label>
                <input id="text" name="text" onChange={onChange} className="nodrag" />
            </div>
            <Handle type="source" position={Position.Bottom} id="a" />
            <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} />
        </div>
    );
}

export default SystemNode;