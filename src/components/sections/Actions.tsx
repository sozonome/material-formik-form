import { Button, createStyles, Grid, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles(
  createStyles({
    sectionWrapper: {
      padding: 12,
    },
    actionButtons: {
      justifyContent: "flex-end",
    },
  })
);

type ActionsProps = {
  dirty: boolean;
  resetForm: any;
  errors: any;
};

const Actions = ({ dirty, resetForm, errors }: ActionsProps) => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={clsx(classes.sectionWrapper, classes.actionButtons)}
    >
      <Button onClick={() => resetForm()}>Clear</Button>
      <Button>Cancel</Button>
      <Button
        color="primary"
        disabled={Object.keys(errors).length > 0}
        variant="contained"
      >
        Confirm
      </Button>
    </Grid>
  );
};

export default Actions;
