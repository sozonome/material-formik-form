import {
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  createStyles,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(
  createStyles({
    card: {
      width: 275,
    },
  })
);

const Home = () => {
  const classes = useStyles();
  return (
    <Grid>
      <Typography variant="h4" style={{ fontWeight: "bold" }}>
        Hello
      </Typography>

      <Card className={classes.card} variant="outlined">
        <CardHeader title="Card Head" />
        <CardContent>
          <Typography>Hello</Typography>
        </CardContent>
        <CardActions>
          <Button>More</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Home;
