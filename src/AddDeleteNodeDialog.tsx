import "./App.css";
import { useState } from "react";
import {
	Box,
	Button,
	Collapse,
	Dialog,
	DialogContent,
	DialogTitle,
	MenuItem,
	Select,
	Switch,
	TextField,
	Typography,
} from "@material-ui/core";
import { Gender, Node } from "./types";
// import transformTreeData from "./transformTreeData";
import useStyles from "./useStyles";
import * as yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { deleteNode, addNode } from "./functions";
import { inheritanceCalculation } from "./inhertitance-calculations";

interface AddDeleteNodeDialogProps {
	isDialogOpen: boolean;
	hideDialog: () => void;
	selectedNode: Node | null;
	setRoot: (node: Node | null) => void;
	setSelectedNode: (node: Node | null) => void;
}

const AddDeleteNodeDialog = (props: AddDeleteNodeDialogProps) => {
	const { isDialogOpen, hideDialog, selectedNode, setRoot, setSelectedNode } = props;
	const classes = useStyles();
	const [add, setAdd] = useState(false);
	const [type, setType] = useState("");

	const validationSchema = yup.object({
		name: yup.string().required("Name is required"),
		gender: yup.mixed().oneOf(Object.values(Gender)).required(),
		living: yup.boolean().required(),
		money: yup.number().required(),
	});
	const formik = useFormik({
		initialValues: {
			name: "",
			gender: Gender.MALE,
			living: true,
			money: 0,
		},
		validationSchema: validationSchema,
		onSubmit: () => {
			if (type === "child" || type === "spouse") {
				addNode(
					selectedNode,
					{
						...formik.values,
						parent: selectedNode,
						// @ts-ignore
						__rd3t: { collapsed: false },
					},
					type,
				);
			} else {
				setRoot({ ...formik.values, parent: null });
			}
			hideDialog();
		},
	});

	return (
		<Dialog open={isDialogOpen} onClose={hideDialog} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">{selectedNode ? "Add Or Delete Node" : "Add Root Node"}</DialogTitle>
			<DialogContent className={clsx(classes.centeredFlex, classes.columnFlex)}>
				{selectedNode && (
					<Box>
						<Button
							disabled={!selectedNode.spouse}
							className={clsx(classes.button, type === "child" && classes.selectedButton)}
							onClick={() => {
								setType("child");
								setAdd(true);
							}}
						>
							Add Child
						</Button>
						<Button
							className={clsx(classes.button, type === "spouse" && classes.selectedButton)}
							onClick={() => {
								setType("spouse");
								setAdd(true);
							}}
						>
							Add Spouse
						</Button>
					</Box>
				)}
				<Collapse in={add || !selectedNode}>
					<form onSubmit={formik.handleSubmit}>
						<TextField
							autoFocus
							margin="dense"
							variant="outlined"
							id="name"
							label="Name"
							type="text"
							fullWidth
							value={formik.values.name}
							onChange={formik.handleChange}
							error={formik.touched.name && Boolean(formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
						/>
						<Box className={clsx(classes.centeredFlex, classes.spaceBetween)}>
							<Typography>Is this person living?</Typography>
							<Switch
								id="living"
								// label="living"
								// type="text"
								// fullWidth
								value={formik.values.living}
								onChange={formik.handleChange}
								checked={formik.values.living}
								// error={formik.touched.living && Boolean(formik.errors.living)}
								// helperText={formik.touched.living && formik.errors.living}
							/>
						</Box>
						<Select
							margin="dense"
							id="gender"
							name="gender"
							label="Gender"
							type="text"
							fullWidth
							value={formik.values.gender}
							onChange={formik.handleChange}
							variant="outlined"
							error={formik.touched.gender && Boolean(formik.errors.gender)}
							// helperText={formik.touched.gender && formik.errors.gender}
						>
							<MenuItem value={Gender.MALE}>Male</MenuItem>
							<MenuItem value={Gender.FEMALE}>Female</MenuItem>
						</Select>
						<TextField
							variant="outlined"
							margin="dense"
							id="money"
							label="How much money does this person have?"
							type="number"
							fullWidth
							value={formik.values.money}
							onChange={formik.handleChange}
							error={formik.touched.money && Boolean(formik.errors.money)}
							helperText={formik.touched.money && formik.errors.money}
						/>

						<Button color="primary" variant="contained" fullWidth type="submit">
							Add Node
						</Button>
					</form>
				</Collapse>

				{selectedNode && (
					<>
						<Button
							className={classes.button}
							color="secondary"
							onClick={() => {
								if (selectedNode.parent) deleteNode(selectedNode);
								else {
									setRoot(null);
									setSelectedNode(null);
								}
							}}
							// onClick={deleteNode(selectedNode?.parent, selectedNode?.name)}>
							// onClick={console.log("ho")}
						>
							Delete
						</Button>
						<Box>
							<Button className={classes.button} onClick={() => selectedNode && inheritanceCalculation(selectedNode)}>
								Calculate Inheritance
							</Button>
							{selectedNode?.spouse && (
								<Button className={classes.button} onClick={() => selectedNode && inheritanceCalculation(selectedNode)}>
									Calculate Inheritance for spouse
								</Button>
							)}
						</Box>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default AddDeleteNodeDialog;
