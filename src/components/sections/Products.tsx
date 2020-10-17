import {
  createStyles,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import React from 'react';
import { DUMMY_PRODUCTS } from '../../constants/dummyDatas';

const useStyles = makeStyles(
  createStyles({
    sectionWrapper: {
      padding: 12,
    },
    formControlWrapper: {
      margin: '1rem 0',
    },
  })
);

const Products = ({ products, handleChange }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.sectionWrapper}>
      <Grid item xs={2}>
        Products
      </Grid>

      <Grid item xs={10}>
        {products.map(({ name, unit, quantity }, productIndex) => (
          <Grid>
            {/* Name & Unit */}
            <Grid container>
              {/* Name */}
              <Grid item xs={8}>
                <FormControl fullWidth required style={{ width: '90%' }}>
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
                <FormControl fullWidth required style={{ width: '90%' }}>
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
                      <MenuItem value=''>No Data Available</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Qty, Price, Total */}
            <Grid container>
              <Grid item></Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Products;
