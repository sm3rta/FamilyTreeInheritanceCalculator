import "./App.css";
import { useState } from "react";
import Tree from "react-d3-tree";
import grandparent from "./mockData";
import { Node } from "./types";
import AddDeleteNodeDialog from "./AddDeleteNodeDialog";
import CustomNodeElement from "./CustomNodeElement";

function App() {
  const [tree] = useState<Node>(grandparent);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  console.log("tree", tree);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const showDialog = () => setIsDialogOpen(true);
  const hideDialog = () => setIsDialogOpen(false);

  return (
    <>
      <AddDeleteNodeDialog
        isDialogOpen={isDialogOpen}
        hideDialog={hideDialog}
        selectedNode={selectedNode}
      />
      <Tree
        data={tree}
        orientation="vertical"
        translate={{
          x: document.body.clientWidth / 2,
          y: document.body.clientHeight / 5,
        }}
        renderCustomNodeElement={(props) => (
          <CustomNodeElement
            {...props}
            setSelectedNode={setSelectedNode}
            showDialog={showDialog}
          />
        )}
        pathFunc="step"
        collapsible={false}
        enableLegacyTransitions
        // depthFactor={250}
        separation={{
          siblings: 1.25,
        }}
      />
    </>
  );
}

export default App;
