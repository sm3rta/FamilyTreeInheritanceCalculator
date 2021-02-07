import "./App.css";
import React, { useState } from "react";
import Tree from "react-d3-tree";
import grandparent from "./mockData";
import { Node } from "./types";
import AddDeleteNodeDialog from "./AddDeleteNodeDialog";
import CustomNodeElement from "./CustomNodeElement";
import { makeStyles } from "@material-ui/core";
import Header from "./Header";
import { inheritanceCalculation } from "./inhertitance-calculations";

const useStyles = makeStyles({
	n: {
		fill: "red",
	},
});

function App() {
	const [selectedNode, setSelectedNode] = useState<Node | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const showDialog = () => setIsDialogOpen(true);
	const hideDialog = () => setIsDialogOpen(false);
	console.log(inheritanceCalculation(grandparent));
	const [root, setRoot] = useState<Node | null>(null);
	const classes = useStyles();

	return (
		<>
			<Header />
			<AddDeleteNodeDialog
				isDialogOpen={isDialogOpen || !root}
				hideDialog={hideDialog}
				selectedNode={selectedNode}
				setRoot={setRoot}
				setSelectedNode={setSelectedNode}
			/>
			{root && (
				<Tree
					// data={root}
					rootNodeClassName={classes.n}
					data={grandparent}
					orientation="vertical"
					translate={{
						x: document.body.clientWidth / 2,
						y: document.body.clientHeight / 5,
					}}
					renderCustomNodeElement={(props) => (
						<CustomNodeElement {...props} setSelectedNode={setSelectedNode} showDialog={showDialog} />
					)}
					pathFunc="diagonal"
					collapsible={false}
					depthFactor={250}
				/>
			)}
		</>
	);
}

export default App;
