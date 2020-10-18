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
import React, { useEffect } from "react";
import { DUMMY_PRODUCTS } from "../../constants/dummyDatas";
import { ProductType } from "../../pages";

const useStyles = makeStyles(
  createStyles({
    sectionWrapper: {
      padding: 12,
    },
    formControlWrapper: {
      margin: "1rem 0",
    },
    alignRight: {},
  })
);

type ProductProps = {
  products: Array<ProductType>;
  handleChange: any;
  setFieldValue: any;
  addProduct: () => void;
};

const Products = ({
  products,
  handleChange,
  setFieldValue,
  addProduct,
}: ProductProps) => {
  const classes = useStyles();
  const getPrice = (productIndex: number) => {
    if (
      products[productIndex].name.length &&
      products[productIndex].unit.length
    ) {
      const selectedPrice = DUMMY_PRODUCTS.filter(
        (dummyProduct) =>
          dummyProduct.product_name === products[productIndex].name
      )[0].units.filter((unit) => unit.name === products[productIndex].unit)[0]
        .price;
      return selectedPrice;
    } else {
      return 0;
    }
  };

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
                  <InputLabel shrink>Product Name</InputLabel>
                  <Select
                    value={name}
                    name={`products[${productIndex}].name`}
                    onChange={handleChange}
                  >
                    {DUMMY_PRODUCTS.map((dummyProduct, dummyProductIndex) => (
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
                  <InputLabel shrink>Unit</InputLabel>
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
                      )[0].units.map((unit, unitIndex) => (
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
                  <InputLabel shrink>Quantity</InputLabel>
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
                  {
                    <Input
                      name={`products[${productIndex}].price`}
                      value={getPrice(productIndex)}
                      onChange={handleChange}
                    />
                  }
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth required>
                  <InputLabel
                    shrink
                    classes={{ formControl: classes.alignRight }}
                  >
                    Total Price
                  </InputLabel>
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

        <Button onClick={addProduct}>
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
