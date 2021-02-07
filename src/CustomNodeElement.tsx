import "./App.css";
import { Node } from "./types";
import useStyles from "./useStyles";
import { CustomNodeElementProps } from "react-d3-tree/lib/types/common";

const CustomNodeElement = (
  props: CustomNodeElementProps & {
    setSelectedNode: (node: Node) => void;
    showDialog: () => void;
  }
) => {
  const classes = useStyles();
  const { nodeDatum, setSelectedNode, showDialog } = props;
  const node = (nodeDatum as unknown) as Node;
  const { name, spouse, living } = node;

  return (
    <g
      onClick={() => {
        console.log("node", node);
        setSelectedNode(node);
        showDialog();
      }}
    >
      <circle
        r="15"
        className={living ? classes.livingNode : classes.deadNode}
      ></circle>
      <g className="rd3t-label">
        <text className="rd3t-label__title" textAnchor="start" x="30">
          {name}
        </text>
        {spouse && (
          <text className="rd3t-label__title" textAnchor="start" x="30" y="25">
            {` married to ${spouse.name}`}
          </text>
        )}
        <text className="rd3t-label__attributes"></text>
      </g>
    </g>
  );
};

export default CustomNodeElement;
