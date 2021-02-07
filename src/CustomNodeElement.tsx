import "./App.css";
import { Gender, Node } from "./types";
import useStyles from "./useStyles";
import { CustomNodeElementProps } from "react-d3-tree/lib/types/common";

const CustomNodeElement = (
	props: CustomNodeElementProps & {
		setSelectedNode: (node: Node) => void;
		showDialog: () => void;
	},
) => {
	const classes = useStyles();
	const { nodeDatum, setSelectedNode, showDialog } = props;
	const node = (nodeDatum as unknown) as Node;
	const { name, spouse, living, money, gender } = node;

	return (
		<g
			onClick={() => {
				console.log("Clicked node", node);
				setSelectedNode(node);
				showDialog();
			}}
		>
			<circle r="20" className={living ? classes.livingNode : classes.deadNode}></circle>
			<g>
				<text className={classes.text} textAnchor="start" x="30">
					{name}
				</text>

				<text className={classes.text} textAnchor="start" x="30" y={25}>
					{`${gender === Gender.MALE ? "Male" : "Female"}`}
				</text>
				<text className={classes.text} textAnchor="start" x="30" y={50}>
					{`${money.toFixed(2)}`}
				</text>
				{spouse && (
					<>
						<text className={classes.text} textAnchor="start" x="30" y="75">
							{`married to ${spouse.name}`}
						</text>
						<text className={classes.text} textAnchor="start" x="30" y="100">
							{spouse.money}
						</text>
					</>
				)}

				<text className="rd3t-label__attributes"></text>
			</g>
		</g>
	);
};

export default CustomNodeElement;
