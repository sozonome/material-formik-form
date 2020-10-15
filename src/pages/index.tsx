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
} from "@material-ui/core";
import clsx from "clsx";
import { useFormik, FormikErrors } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";

const useStyles = makeStyles(
  createStyles({
    wrapper: {
      padding: 8,
    },
    sectionWrapper: {
      padding: 12,
    },
    formControlWrapper: {
      margin: "1rem 0",
    },
    actionButtons: {
      justifyContent: "flex-end",
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

type FormValueType = {
  name: string;
  distributionCenter: string;
  paymentType: string;
  expirationDate: string;
  notes: string;
  productName: string;
  unit: string;
  quantity: number;
  price: number;
};

const Home = () => {
  const classes = useStyles();

  const { values, errors, handleChange, setFieldValue, dirty } = useFormik<
    FormValueType
  >({
    initialValues: {
      name: "Hello",
      distributionCenter: "",
      paymentType: "",
      expirationDate: "",
      notes: "",
      productName: "",
      unit: "",
      quantity: 0,
      price: 0,
    },
    validate: (formValues) => {
      const errorValidation: FormikErrors<FormValueType> = {};

      if (!formValues.name.length) {
        errorValidation.name = "Name must be filled";
      }
      if (!formValues.distributionCenter.length) {
        errorValidation.distributionCenter =
          "Distribution Center must be filled";
      }
      if (!formValues.paymentType.length) {
        errorValidation.paymentType = "Payment Type must be filled";
      }
      if (!formValues.expirationDate.length) {
        errorValidation.expirationDate = "Expiration Date must be filled";
      }
      if (!formValues.productName.length) {
        errorValidation.productName = "Product Name must be filled";
      }
      if (!formValues.unit.length) {
        errorValidation.unit = "Unit must be filled";
      }
      if (formValues.quantity === null || formValues.quantity === 0) {
        errorValidation.quantity = "Quantity must be more than 0";
      }
      if (formValues.price === null || formValues.price === 0) {
        errorValidation.price = "Price must be more than 0";
      }

      return errorValidation;
    },
    onSubmit: () => {},
  });

  const {
    name,
    distributionCenter,
    paymentType,
    expirationDate,
    notes,
    productName,
    unit,
    quantity,
    price,
  } = values;

  const [dummyNames, setDummyNames] = useState<Array<Employee>>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const distributionCenters = ["DC Tangerang", "DC Cikarang"];

  useEffect(() => {
    axios("https://dummy.restapiexample.com/api/v1/employees")
      .then((res) => {
        setDummyNames(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setTotalPrice(quantity * price);
  }, [price]);

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
                <FormControl fullWidth required style={{ width: "90%" }}>
                  <InputLabel shrink>Name</InputLabel>
                  <Select value={name} name="name" onChange={handleChange}>
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
                  required
                  className={classes.formControlWrapper}
                  style={{ width: "50%" }}
                >
                  <InputLabel shrink>Distribution Center</InputLabel>
                  <Select
                    value={distributionCenter}
                    name="distributionCenter"
                    onChange={handleChange}
                  >
                    {name.length ? (
                      distributionCenters.map((center: string) => (
                        <MenuItem value={center}>{center}</MenuItem>
                      ))
                    ) : (
                      <MenuItem value="">No Data Available</MenuItem>
                    )}
                  </Select>
                </FormControl>

                {name.length && distributionCenter.length ? (
                  <Grid container>
                    <Grid item xs={6}>
                      <FormControl
                        required
                        className={classes.formControlWrapper}
                        fullWidth
                      >
                        <InputLabel shrink>Payment Type</InputLabel>
                        <Select
                          value={distributionCenter}
                          name="distributionCenter"
                          onChange={handleChange}
                        >
                          {name.length ? (
                            distributionCenters.map((center: string) => (
                              <MenuItem value={center}>{center}</MenuItem>
                            ))
                          ) : (
                            <MenuItem value="">No Data Available</MenuItem>
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
                        <InputLabel shrink>Payment Type</InputLabel>
                        <Select
                          value={distributionCenter}
                          name="distributionCenter"
                          onChange={handleChange}
                        >
                          {name.length ? (
                            distributionCenters.map((center: string) => (
                              <MenuItem value={center}>{center}</MenuItem>
                            ))
                          ) : (
                            <MenuItem value="">No Data Available</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                ) : null}
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
                color="primary"
                disabled={!dirty || (dirty && Object.keys(errors).length > 0)}
                variant="contained"
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
