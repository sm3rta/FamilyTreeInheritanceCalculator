import "./App.css";
import { SyntheticEvent, useMemo, useState } from "react";
import Tree from "react-d3-tree";
import { Box } from "@material-ui/core";
import grandparent from "./mockData";
import { Node } from "./types";
// import transformTreeData from "./transformTreeData";
import useStyles from "./useStyles";

function App() {
  const classes = useStyles();
  const [tree, setTree] = useState<Node>(grandparent);
  console.log("tree", tree);
  return (
    <Tree
      data={tree}
      orientation="vertical"
      translate={{
        x: 200,
        y: 200,
      }}
      renderCustomNodeElement={(props) => {
        const { name, spouse, living } = (props.nodeDatum as unknown) as Node;

        return (
          <g>
            <circle
              r="15"
              className={living ? classes.livingNode : classes.deadNode}
            ></circle>
            <g className="rd3t-label">
              <text className="rd3t-label__title" textAnchor="start" x="40">
                {name}
                {spouse && ` married to ${spouse.name}`}
              </text>
              <text className="rd3t-label__attributes"></text>
            </g>
          </g>
        );
      }}
      pathFunc="step"
      collapsible={false}
    />
  );
}

export default App;
