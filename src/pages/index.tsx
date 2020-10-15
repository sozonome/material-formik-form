import {
  Grid,
  createStyles,
  makeStyles,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from '@material-ui/core';
import clsx from 'clsx';
import { useFormik, FormikErrors } from 'formik';
import { useEffect, useState } from 'react';
import axios from 'axios';

const useStyles = makeStyles(
  createStyles({
    wrapper: {
      padding: 8,
    },
    sectionWrapper: {
      padding: 12,
    },
    formControlWrapper: {
      margin: '1rem 0',
    },
    actionButtons: {
      justifyContent: 'flex-end',
    },
    card: {
      width: 275,
    },
  })
);

type Employee = {
  id: number;
  employee_name: string;
  employee_salary: number;
  employee_age: number;
  profile_image: string;
};

const Home = () => {
  const classes = useStyles();

  const { values, errors, handleChange, setFieldValue, dirty } = useFormik({
    initialValues: {
      name: '',
      distributionCenter: '',
    },
    validate: (formValues) => {
      const errorValidation: FormikErrors<any> = {};
      if (formValues.name === '') {
        errorValidation.name = 'hey';
      }
      return errorValidation;
    },
    onSubmit: () => {},
  });

  const { name, distributionCenter } = values;

  const [dummyNames, setDummyNames] = useState<Array<Employee>>([]);

  const distributionCenters = ['DC Tangerang', 'DC Cikarang'];

  useEffect(() => {
    axios('http://dummy.restapiexample.com/api/v1/employees')
      .then((res) => {
        setDummyNames(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Grid className={classes.wrapper}>
      <Grid>
        <Paper className={classes.wrapper}>
          <Grid>
            <Grid container className={classes.sectionWrapper}>
              <Grid item xs={2}>
                Detail
              </Grid>
              <Grid item xs={10}>
                <FormControl fullWidth required>
                  <InputLabel shrink>Name</InputLabel>
                  <Select
                    variant='outlined'
                    value={name}
                    name='name'
                    onChange={handleChange}
                  >
                    {dummyNames.length ? (
                      dummyNames.map((dummyName: Employee) => (
                        <MenuItem value={dummyName.employee_name}>
                          {dummyName.employee_name}
                        </MenuItem>
                      ))
                    ) : (
                      <CircularProgress />
                    )}
                  </Select>
                </FormControl>

                <FormControl
                  fullWidth
                  required
                  className={classes.formControlWrapper}
                >
                  <InputLabel shrink>Name</InputLabel>
                  <Select
                    variant='outlined'
                    value={distributionCenter}
                    name='distributionCenter'
                    onChange={handleChange}
                  >
                    {name.length ? (
                      distributionCenters.map((center: string) => (
                        <MenuItem value={center}>{center}</MenuItem>
                      ))
                    ) : (
                      <MenuItem value=''>No Data Available</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Divider />

            {name.length && distributionCenter.length ? (
              <Grid container className={classes.sectionWrapper}>
                <Grid item>Products</Grid>
              </Grid>
            ) : null}

            <Divider />

            <Grid
              container
              className={clsx(classes.sectionWrapper, classes.actionButtons)}
            >
              <Button>Cancel</Button>
              <Button
                color='primary'
                disabled={!dirty || (dirty && Object.keys(errors).length > 0)}
                variant='contained'
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;
