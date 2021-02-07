import "./App.css";
import { useState } from "react";
import Tree from "react-d3-tree";
import grandparent from "./mockData";
import { Node } from "./types";
// import transformTreeData from "./transformTreeData";
import useStyles from "./useStyles";
import AddDeleteNodeDialog from "./AddDeleteNodeDialog";

function App() {
    const classes = useStyles();
    const [tree] = useState<Node>(grandparent);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    console.log("tree", tree);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const showDialog = () => setIsDialogOpen(true);
    const hideDialog = () => setIsDialogOpen(false);

    return (
        <>
            <AddDeleteNodeDialog isDialogOpen={isDialogOpen} hideDialog={hideDialog} selectedNode={selectedNode} />
            <Tree
                data={grandparent}
                orientation="vertical"
                translate={{
                    x: 1000,
                    y: 200,
                }}
                renderCustomNodeElement={(props) => {
                    const node = (props.nodeDatum as unknown) as Node;
                    const { name, spouse, living } = node;

                    return (
                        <g
                            onClick={() => {
                                console.log("props.nodeDatum", props.nodeDatum);
                                setSelectedNode(node);
                                showDialog();
                            }}>
                            <circle r="15" className={living ? classes.livingNode : classes.deadNode}></circle>
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
        </>
    );
}

export default App;
