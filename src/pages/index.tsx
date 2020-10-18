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

import Detail from "../components/sections/Detail";
import Products from "../components/sections/Products";
import Actions from "../components/sections/Actions";

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

  return (
    <Grid className={classes.wrapper}>
      <Grid>
        {/* Wrapper */}
        <Paper className={classes.wrapper}>
          <Grid>
            {/* Detail Section */}
            <Detail
              name={name}
              distributionCenter={distributionCenter}
              paymentType={paymentType}
              expirationDate={expirationDate}
              notes={notes}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              errors={errors}
            />

            <Divider />

            {/* Product Section */}
            {name.length && distributionCenter.length ? (
              <Products
                products={products}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                addProduct={addProduct}
                errors={errors}
              />
            ) : null}

            <Divider />

            <Actions errors={errors} dirty={dirty} resetForm={resetForm} />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;
