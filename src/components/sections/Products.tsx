import {
  Button,
  createStyles,
  Divider,
  FormControl,
  Grid,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { FormikErrors } from "formik";
import React, { useEffect } from "react";
import { DUMMY_PRODUCTS } from "../../constants/dummyDatas";
import { FormValueType, ProductType } from "../../pages";

const useStyles = makeStyles(
  createStyles({
    sectionWrapper: {
      padding: 12,
    },
    formControlWrapper: {
      margin: "1rem 0",
    },
    addButton: {
      backgroundColor: "orange",
    },
  })
);

export type ProductProps = {
  products: Array<ProductType>;
  handleChange: any;
  setFieldValue: any;
  addProduct: () => void;
  errors: FormikErrors<FormValueType>;
};

const Products = ({
  products,
  handleChange,
  setFieldValue,
  addProduct,
  errors,
}: ProductProps) => {
  const classes = useStyles();
  // const getPrice = (productIndex: number) => {
  //   if (
  //     products[productIndex].name.length &&
  //     products[productIndex].unit.length
  //   ) {
  //     const selectedPrice = DUMMY_PRODUCTS.filter(
  //       (dummyProduct) =>
  //         dummyProduct.product_name === products[productIndex].name
  //     )[0].units.filter((unit) => unit.name === products[productIndex].unit)[0]
  //       .price;
  //     return selectedPrice;
  //   } else {
  //     return 0;
  //   }
  // };

  const getTotalPrice = () => {
    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += product.qty * product.price;
    });
    return totalPrice;
  };

  useEffect(() => {
    products.map((product, productIndex) => {
      if (product.name.length && product.unit.length) {
        const selectedPrice = DUMMY_PRODUCTS.filter(
          (dummyProduct) => dummyProduct.product_name === product.name
        )[0].units.filter((unit) => unit.name === product.unit)[0].price;
        setFieldValue(`products[${productIndex}].price`, selectedPrice);
      }
    });
  }, [products]);

  const getError = (index: number) => {
    if (errors.products) {
      return errors.products[index] as FormikErrors<ProductType>;
    } else {
      return undefined;
    }
  };

  const handleChangeProductName = (
    event: React.ChangeEvent<{
      name?: string;
      value: unknown;
    }>,
    index: number
  ) => {
    setFieldValue(`products[${index}].name`, event.target.value);
    setFieldValue(`products[${index}].unit`, "");
    setFieldValue(`products[${index}].price`, 0);
  };

  return (
    <Grid container className={classes.sectionWrapper}>
      <Grid item xs={2}>
        Products
      </Grid>

      <Grid item xs={10}>
        {products.map(({ name, unit, qty, price }, productIndex: number) => (
          <Grid key={productIndex}>
            {/* Name & Unit */}
            <Grid container spacing={2}>
              {/* Name */}
              <Grid item xs={8}>
                <FormControl fullWidth required style={{ width: "90%" }}>
                  <InputLabel
                    error={
                      getError(productIndex) &&
                      getError(productIndex).name !== undefined
                    }
                    shrink
                  >
                    Product Name
                  </InputLabel>
                  <Select
                    value={name}
                    name={`products[${productIndex}].name`}
                    onChange={(event) =>
                      handleChangeProductName(event, productIndex)
                    }
                  >
                    {DUMMY_PRODUCTS
                      // .filter((dummyProduct, checkIndex) => {
                      // filter by selected product
                      //   for (let i = 0; i < products.length; i++) {
                      //     if (
                      //       dummyProduct.product_name === products[i].name &&
                      //       i !== productIndex
                      //     ) {
                      //       console.log('false', {
                      //         productIndex,
                      //         checkIndex,
                      //         i,
                      //         dummyName: dummyProduct.product_name,
                      //         productName: products[i].name,
                      //       });
                      //       return false;
                      //     }
                      //   }
                      //   return true;
                      // })
                      .map((dummyProduct, dummyProductIndex) => (
                        <MenuItem
                          key={dummyProductIndex}
                          value={dummyProduct.product_name}
                        >
                          {dummyProduct.product_name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Unit */}
              <Grid item xs={4}>
                <FormControl fullWidth required style={{ width: "90%" }}>
                  <InputLabel
                    error={
                      getError(productIndex) &&
                      getError(productIndex).unit !== undefined
                    }
                    shrink
                  >
                    Unit
                  </InputLabel>
                  <Select
                    value={unit}
                    name={`products[${productIndex}].unit`}
                    onChange={handleChange}
                  >
                    {products[productIndex].name.length ? (
                      DUMMY_PRODUCTS.filter(
                        (dummyProduct) =>
                          dummyProduct.product_name ===
                          products[productIndex].name
                      )[0]
                        .units.filter((filterUnit) => {
                          for (let i = 0; i < products.length; i++) {
                            for (let j = 0; j < DUMMY_PRODUCTS.length; j++) {
                              if (
                                products[i].name ===
                                DUMMY_PRODUCTS[j].product_name
                              ) {
                                for (
                                  let k = 0;
                                  k < DUMMY_PRODUCTS[j].units.length;
                                  k++
                                ) {
                                  if (
                                    products[i].unit === filterUnit.name &&
                                    i !== productIndex
                                  ) {
                                    return false;
                                  }
                                }
                              }
                            }
                          }
                          return true;
                        })
                        .map((unit, unitIndex) => (
                          <MenuItem key={unitIndex} value={unit.name}>
                            {unit.name}
                          </MenuItem>
                        ))
                    ) : (
                      <MenuItem value="">No Data Available</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Qty, Price, Total */}
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <FormControl fullWidth required>
                  <InputLabel
                    error={
                      getError(productIndex) &&
                      getError(productIndex).qty !== undefined
                    }
                    shrink
                  >
                    Quantity
                  </InputLabel>
                  <Input
                    type="number"
                    name={`products[${productIndex}].qty`}
                    value={qty}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <FormControl fullWidth required>
                  <InputLabel shrink>Price</InputLabel>
                  <Input value={price} />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth required>
                  <InputLabel shrink>Total Price</InputLabel>
                  <Input
                    type="number"
                    name={`products[${productIndex}].qty`}
                    value={qty * price}
                    disabled
                    inputProps={{
                      style: { textAlign: "right" },
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              style={{ marginTop: 12, justifyContent: "flex-end" }}
            >
              <Grid item xs={6}>
                <Divider />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="inherit">Total Nett Price</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{ justifyContent: "flex-end", textAlign: "right" }}
                  >
                    <Typography>
                      <b>{qty * price}</b>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}

        <Button onClick={addProduct} className={classes.addButton}>
          New Item
          <AddIcon />
        </Button>

        <Grid
          container
          spacing={2}
          style={{ marginTop: 12, justifyContent: "flex-end" }}
        >
          <Grid item xs={6}>
            <Divider />
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="inherit">Total</Typography>
              </Grid>
              <Grid
                item
                xs={6}
                style={{ justifyContent: "flex-end", textAlign: "right" }}
              >
                <Typography>
                  <b>{getTotalPrice()}</b>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Products;
