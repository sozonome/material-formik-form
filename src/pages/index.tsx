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
  TextareaAutosize,
} from '@material-ui/core';
import clsx from 'clsx';
import { useFormik, FormikErrors } from 'formik';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { DUMMY_EMPLOYEE_NAMES } from '../constants/dummyEmployees';

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

type ProductType = {
  name: string;
  unit: string;
  quantity: number;
  price: number;
};

type FormValueType = {
  name: string;
  distributionCenter: string;
  paymentType: string;
  expirationDate: string;
  notes: string;
  products: Array<ProductType>;
};

const Home = () => {
  const classes = useStyles();

  const {
    values,
    errors,
    handleChange,
    setFieldValue,
    dirty,
    resetForm,
  } = useFormik<FormValueType>({
    initialValues: {
      name: '',
      distributionCenter: '',
      paymentType: '',
      expirationDate: new Date().toDateString(),
      notes: '',
      products: [{ name: '', unit: '', quantity: 0, price: 0 }],
    },
    validate: (formValues: FormValueType) => {
      const errorValidation: FormikErrors<FormValueType> = {};

      if (!formValues.name.length) {
        errorValidation.name = 'Name must be filled';
      }
      if (!formValues.distributionCenter.length) {
        errorValidation.distributionCenter =
          'Distribution Center must be filled';
      }
      if (!formValues.paymentType.length) {
        errorValidation.paymentType = 'Payment Type must be filled';
      }
      if (!formValues.expirationDate.length) {
        errorValidation.expirationDate = 'Expiration Date must be filled';
      }

      formValues.products.forEach((product, index) => {
        if (!product.name.length) {
          (errorValidation.products[index] as FormikErrors<ProductType>).name =
            'Product Name must be filled';
        }
        if (!product.unit.length) {
          (errorValidation.products[index] as FormikErrors<ProductType>).unit =
            'Unit must be filled';
        }
        if (product.quantity === null || product.quantity === 0) {
          (errorValidation.products[index] as FormikErrors<
            ProductType
          >).quantity = 'Quantity must be more than 0';
        }
        if (product.price === null || product.price === 0) {
          (errorValidation.products[index] as FormikErrors<ProductType>).price =
            'Price must be more than 0';
        }
      });

      return errorValidation;
    },
    onSubmit: (formValues: FormValueType) => {
      console.log(formValues);
    },
  });

  const {
    name,
    distributionCenter,
    paymentType,
    expirationDate,
    notes,
    products,
  } = values;

  // const [dummyNames, setDummyNames] = useState<Array<Employee>>([]);

  const distributionCenters = ['DC Tangerang', 'DC Cikarang'];
  const paymentTypes = ['Bank Transfer', 'PayPal', 'GoPay', 'OVO'];

  // useEffect(() => {
  //   axios('https://dummy.restapiexample.com/api/v1/employees')
  //     .then((res) => {
  //       setDummyNames(res.data.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

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
                <FormControl fullWidth required style={{ width: '90%' }}>
                  <InputLabel shrink>Name</InputLabel>
                  <Select value={name} name='name' onChange={handleChange}>
                    {DUMMY_EMPLOYEE_NAMES.length ? (
                      DUMMY_EMPLOYEE_NAMES.map((dummyName: Employee) => (
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
                  required
                  className={classes.formControlWrapper}
                  style={{ width: '50%' }}
                >
                  <InputLabel shrink>Distribution Center</InputLabel>
                  <Select
                    value={distributionCenter}
                    name='distributionCenter'
                    onChange={handleChange}
                  >
                    {name.length ? (
                      distributionCenters.map((center: string, centerIndex) => (
                        <MenuItem key={centerIndex} value={center}>
                          {center}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value=''>No Data Available</MenuItem>
                    )}
                  </Select>
                </FormControl>

                {name.length && distributionCenter.length ? (
                  <Grid>
                    <Grid container>
                      <Grid item xs={6}>
                        <FormControl
                          required
                          className={classes.formControlWrapper}
                          fullWidth
                        >
                          <InputLabel shrink>Payment Type</InputLabel>
                          <Select
                            value={paymentType}
                            name='paymentType'
                            onChange={handleChange}
                          >
                            {paymentTypes.map(
                              (paymentType: string, paymentTypeIndex) => (
                                <MenuItem
                                  key={paymentTypeIndex}
                                  value={paymentType}
                                >
                                  {paymentType}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl
                          required
                          className={classes.formControlWrapper}
                          fullWidth
                        >
                          <InputLabel shrink>Expired Date</InputLabel>
                          <KeyboardDatePicker
                            margin='normal'
                            name='expirationDate'
                            value={expirationDate}
                            onChange={(date) =>
                              setFieldValue('expirationDate', date)
                            }
                          />
                        </FormControl>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item>
                        <FormControl
                          required
                          className={classes.formControlWrapper}
                          fullWidth
                        >
                          <InputLabel shrink>Notes</InputLabel>
                          <TextareaAutosize
                            name='notes'
                            value={notes}
                            rowsMin={6}
                            style={{
                              maxWidth: '800px',
                              minWidth: '60vw',
                            }}
                            onChange={handleChange}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>

            <Divider />

            {name.length && distributionCenter.length ? (
              <Grid container className={classes.sectionWrapper}>
                <Grid item xs={2}>
                  Products
                </Grid>

                <Grid item xs={10}>
                  {products.map(({name, unit, quantity}) => (
                    <Grid>
                      <Grid container>
                        <Grid item>
                          <FormControl
                            fullWidth
                            required
                            style={{ width: '90%' }}
                          >
                            <InputLabel shrink>Name</InputLabel>
                            <Select
                              value={name}
                              name='name'
                              onChange={handleChange}
                            >
                              {DUMMY_EMPLOYEE_NAMES.length ? (
                                DUMMY_EMPLOYEE_NAMES.map(
                                  (dummyName: Employee) => (
                                    <MenuItem value={dummyName.employee_name}>
                                      {dummyName.employee_name}
                                    </MenuItem>
                                  )
                                )
                              ) : (
                                <CircularProgress />
                              )}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ) : null}

            <Divider />

            <Grid
              container
              className={clsx(classes.sectionWrapper, classes.actionButtons)}
            >
              <Button onClick={() => resetForm()}>Clear</Button>
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
