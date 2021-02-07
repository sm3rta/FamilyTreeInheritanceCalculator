import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	livingNode: {
		fill: "cyan",
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
	text: {
		strokeWidth: 0,
		fill: "black",
		fontFamily:
			"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
	},
}));

export default useStyles;
