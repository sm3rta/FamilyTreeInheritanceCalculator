import "./App.css";
import { useState } from "react";
import { Box, Button, Collapse, Dialog, DialogContent, DialogTitle, MenuItem, Select, Switch, TextField, Typography } from "@material-ui/core";
import { Gender, Node } from "./types";
// import transformTreeData from "./transformTreeData";
import useStyles from "./useStyles";
import * as yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { DeleteNode, AddNode } from "./functions";

interface AddDeleteNodeDialogProps {
    isDialogOpen: boolean;
    hideDialog: () => void;
    selectedNode: Node | null;
}

const AddDeleteNodeDialog = (props: AddDeleteNodeDialogProps) => {
    const { isDialogOpen, hideDialog, selectedNode } = props;
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
            if (type === "child") {
                // AddNode()
            }
            if (type === "spouse") {
                // AddNode()
            }
        },
    });

    return (
        <Dialog open={isDialogOpen} onClose={hideDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Or Delete Node</DialogTitle>
            <DialogContent className={clsx(classes.centeredFlex, classes.columnFlex)}>
                <Box>
                    <Button
                        className={clsx(classes.button, type === "child" && classes.selectedButton)}
                        onClick={() => {
                            setType("child");
                            setAdd(true);
                            AddNode(selectedNode, { ...formik.values, parent: selectedNode });
                        }}>
                        Add Child
                    </Button>
                    <Button
                        className={clsx(classes.button, type === "spouse" && classes.selectedButton)}
                        onClick={() => {
                            setType("spouse");
                            setAdd(true);
                        }}>
                        Add Spouse
                    </Button>
                </Box>
                <Collapse in={add}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
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
                            Submit
                        </Button>
                    </form>
                </Collapse>

                <Button
                    className={classes.button}
                    color="secondary"
                    onClick={() => {
                        DeleteNode(selectedNode?.parent, selectedNode?.name);
                    }}
                    // onClick={DeleteNode(selectedNode?.parent, selectedNode?.name)}>
                    // onClick={console.log("ho")}
                >
                    Delete
                </Button>
                <Box>
                    <Button className={classes.button}>Calculate Inheritance</Button>
                    {selectedNode?.spouse && <Button className={classes.button}>Calculate Inheritance for spouse</Button>}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default AddDeleteNodeDialog;
