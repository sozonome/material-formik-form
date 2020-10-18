import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
  createStyles,
  TextareaAutosize,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import React from 'react';
import { DUMMY_EMPLOYEE_NAMES } from '../../constants/dummyDatas';
import { Employee, FormValueType } from '../../pages';

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

const distributionCenters = ['DC Tangerang', 'DC Cikarang'];
const paymentTypes = ['Bank Transfer', 'PayPal', 'GoPay', 'OVO'];

type DetailProps = {
  handleChange: any;
  setFieldValue: any;
} & Pick<
  FormValueType,
  'name' | 'distributionCenter' | 'paymentType' | 'expirationDate' | 'notes'
>;

const Detail = ({
  handleChange,
  name,
  distributionCenter,
  paymentType,
  expirationDate,
  notes,
  setFieldValue,
}: DetailProps) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.sectionWrapper}>
      <Grid item xs={2}>
        Detail
      </Grid>
      <Grid item xs={10}>
        <FormControl fullWidth required style={{ width: '90%' }}>
          <InputLabel shrink>Name</InputLabel>
          <Select value={name} name='name' placeholder="Name" onChange={handleChange}>
            {DUMMY_EMPLOYEE_NAMES.length ? (
              DUMMY_EMPLOYEE_NAMES.map(
                (dummyName: Employee, dummyEmployeeIndex) => (
                  <MenuItem
                    key={dummyEmployeeIndex}
                    value={dummyName.employee_name}
                  >
                    {dummyName.employee_name}
                  </MenuItem>
                )
              )
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
            placeholder="Distribution Center"
          >
            {name && name.length ? (
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

        {name && name.length && distributionCenter.length ? (
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
                    placeholder="Payment Type"
                  >
                    {paymentTypes.map(
                      (paymentType: string, paymentTypeIndex) => (
                        <MenuItem key={paymentTypeIndex} value={paymentType}>
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
                    format='dd/MM/yyyy'
                    onChange={(date) => setFieldValue('expirationDate', date)}
                    placeholder="Expired Date"
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item>
                <FormControl className={classes.formControlWrapper} fullWidth>
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
  );
};

export default Detail;
