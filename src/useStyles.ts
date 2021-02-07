import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	livingNode: {
		fill: "lavender",
	},
	deadNode: {
		fill: "black",
	},
	button: {
		minWidth: 250,
		maxWidth: 250,
	},
	selectedButton: {
		color: "blue",
	},
	centeredFlex: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	columnFlex: { flexDirection: "column" },
	spaceBetween: {
		justifyContent: "space-between",
	},
}));

export default useStyles;
