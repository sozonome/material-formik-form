import {
  Grid,
  createStyles,
  makeStyles,
  Paper,
  Divider,
} from "@material-ui/core";
import { useFormik } from "formik";
// import { useEffect, useState } from 'react';
// import axios from 'axios';
import * as yup from "yup";

import Detail, { DetailProps } from "../components/sections/Detail";
import Products, { ProductProps } from "../components/sections/Products";
import Actions, { ActionsProps } from "../components/sections/Actions";

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
  })
);

export type Employee = {
  id: number;
  employee_name: string;
  employee_salary: number;
  employee_age: number;
  profile_image: string;
};

export type ProductType = {
  name: string;
  unit: string;
  qty: number;
  price: number;
};

export type FormValueType = {
  name: string;
  distributionCenter: string;
  paymentType: string;
  expirationDate: string;
  notes: string;
  products: Array<ProductType>;
};

const initProduct = { name: "", unit: "", qty: 0, price: 0 };

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
      name: "",
      distributionCenter: "",
      paymentType: "",
      expirationDate: new Date().toLocaleDateString(),
      notes: "",
      products: [initProduct],
    },
    validationSchema: yup.object().shape<FormValueType>({
      name: yup.string().min(1).required(),
      distributionCenter: yup.string().min(1).required(),
      paymentType: yup.string().min(1).required(),
      expirationDate: yup.string().min(1).required(),
      notes: yup.string(),
      products: yup.array().of(
        yup.object().shape<ProductType>({
          name: yup.string().min(1).required(),
          unit: yup.string().min(1).required(),
          qty: yup.number().moreThan(0).required(),
          price: yup.number(),
        })
      ),
    }),
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

  const addProduct = () => {
    const updateProducts = [...values.products, initProduct];
    setFieldValue("products", updateProducts);
  };

  // const [dummyNames, setDummyNames] = useState<Array<Employee>>([]);

  // useEffect(() => {
  //   axios('https://dummy.restapiexample.com/api/v1/employees')
  //     .then((res) => {
  //       setDummyNames(res.data.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const detailProps: DetailProps = {
    name,
    distributionCenter,
    paymentType,
    expirationDate,
    notes,
    handleChange,
    setFieldValue,
    errors,
  };

  const productProps: ProductProps = {
    products,
    handleChange,
    setFieldValue,
    addProduct,
    errors,
  };

  const actionsProps: ActionsProps = {
    errors,
    dirty,
    resetForm,
  };

  return (
    <Grid className={classes.wrapper}>
      <Grid>
        <Paper className={classes.wrapper}>
          <Grid>
            <Detail {...detailProps} />
            <Divider />

            {name.length && distributionCenter.length ? (
              <Products {...productProps} />
            ) : null}
            <Divider />

            <Actions {...actionsProps} />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;
