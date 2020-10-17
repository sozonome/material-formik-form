import {
  Grid,
  createStyles,
  makeStyles,
  Paper,
  Divider,
} from '@material-ui/core';
import { useFormik, FormikErrors } from 'formik';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

import Detail from '../components/sections/Detail';
import Products from '../components/sections/Products';
import Actions from '../components/sections/Actions';

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
  quantity: number;
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
      expirationDate: new Date().toLocaleDateString(),
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
            />

            <Divider />

            {/* Product Section */}
            {name.length && distributionCenter.length ? (
              <Products products={products} handleChange={handleChange} />
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
