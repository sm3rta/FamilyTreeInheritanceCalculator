import "./App.css";
import { useMemo, useState } from "react";
import Tree from "react-d3-tree";
import { Box } from "@material-ui/core";
import mockData from "./mockData";
import { Node } from "./types";
import transformTreeData from "./transformTreeData";

function App() {
  const [tree, setTree] = useState<Node>(mockData);
  const data = useMemo(() => transformTreeData(tree), [tree]);
  return (
    <Tree
      data={tree}
      orientation="vertical"
      translate={{
        x: 200,
        y: 200,
      }}
      // Statically apply same className(s) to all links
      // pathClassFunc={() => 'custom-link'}
      // Want to apply multiple static classes? `Array.join` is your friend :)
      // pathClassFunc={() => ['custom-link', 'extra-custom-link'].join(' ')}
      // Dynamically determine which `className` to pass based on the link's properties.
      // pathClassFunc={getDynamicPathClass}
    />
  );
}

export default App;
