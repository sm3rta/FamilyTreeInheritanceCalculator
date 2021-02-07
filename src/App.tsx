import "./App.css";
import { SyntheticEvent, useMemo, useState } from "react";
import Tree from "react-d3-tree";
import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import grandparent from "./mockData";
import { Gender, Node } from "./types";
// import transformTreeData from "./transformTreeData";
import useStyles from "./useStyles";
import { AddNode } from "./functions";
import * as yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";

function App() {
  const classes = useStyles();
  const [tree, setTree] = useState<Node>(grandparent);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  console.log("tree", tree);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const showDialog = () => setIsDialogOpen(true);
  const hideDialog = () => setIsDialogOpen(false);

  const AddDeleteNodeDialog = () => {
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
      onSubmit: (values) => {
        if (type === "child") {
          // AddNode()
        }
        if (type === "spouse") {
          // AddNode()
        }
      },
    });

    return (
      <Dialog
        open={isDialogOpen}
        onClose={hideDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Or Delete Node</DialogTitle>
        <DialogContent
          className={clsx(classes.centeredFlex, classes.columnFlex)}
        >
          <Box>
            <Button
              className={clsx(
                classes.button,
                type === "child" && classes.selectedButton
              )}
              onClick={() => {
                setType("child");
                setAdd(true);
              }}
            >
              Add Child
            </Button>
            <Button
              className={clsx(
                classes.button,
                type === "spouse" && classes.selectedButton
              )}
              onClick={() => {
                setType("spouse");
                setAdd(true);
              }}
            >
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

              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Collapse>

          <Button className={classes.button} color="secondary">
            Delete
          </Button>
          <Box>
            <Button className={classes.button}>Calculate Inheritance</Button>
            {selectedNode?.spouse && (
              <Button className={classes.button}>
                Calculate Inheritance for spouse
              </Button>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <>
      <AddDeleteNodeDialog />
      <Tree
        data={tree}
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
              }}
            >
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
    </>
  );
}

export default App;
