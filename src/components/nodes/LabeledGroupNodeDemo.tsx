import { memo } from "react";

import { NodeProps } from "@xyflow/react";
import { GroupNode } from "./GroupNode";

const LabeledGroupNodeDemo = memo(({ selected }: NodeProps) => {
  return <GroupNode selected={selected} label="Label" />;
});

LabeledGroupNodeDemo.displayName = "LabeledGroupNodeDemo";

export default LabeledGroupNodeDemo;
