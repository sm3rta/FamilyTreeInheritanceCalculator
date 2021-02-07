import "./App.css";
import { useState } from "react";
import Tree from "react-d3-tree";
import grandparent from "./mockData";
import { Node } from "./types";
import AddDeleteNodeDialog from "./AddDeleteNodeDialog";
import CustomNodeElement from "./CustomNodeElement";
import { inheritanceCalculation } from "./inhertitance-calculations"; 
// import grandparent from './mockData'
function App() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const showDialog = () => setIsDialogOpen(true);
  const hideDialog = () => setIsDialogOpen(false);
  console.log(inheritanceCalculation(grandparent))
  return (
    <>
      <AddDeleteNodeDialog
        isDialogOpen={isDialogOpen}
        hideDialog={hideDialog}
        selectedNode={selectedNode}
      />
      <Tree
        data={grandparent}
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
        depthFactor={250}
      />
    </>
  );
}

export default App;
