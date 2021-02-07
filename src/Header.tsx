import React, { useState } from "react";
import { AppBar, Toolbar, useScrollTrigger, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
interface Props {
	children: React.ReactElement;
}

const useStyles = makeStyles((theme) => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
		marginBottom: "3em",
	},

	typo: {
		color: theme.palette.warning.main,
		fontWeight: "bolder",
	},
}));

export default function Header() {
	const classes = useStyles();

	return (
		<React.Fragment>
			<AppBar position="fixed">
				<Toolbar disableGutters>
					<Box pl={5} display="flex" p={3} fontWeight="bold">
						<Typography variant="h4" className={classes.typo}>
							Ewresny App
						</Typography>
					</Box>
				</Toolbar>
			</AppBar>
			<div className={classes.toolbarMargin} />
		</React.Fragment>
	);
}
