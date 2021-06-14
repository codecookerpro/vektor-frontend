import React, { memo } from 'react';
import { useStyles } from './styles';
import { Card, CardContent, Grid, TextField, Typography } from '@material-ui/core';

const IproSubmit = ({ mode, sow = {}, title, setNotRequiredField }) => {
  const classes = useStyles();

  const inputHandler = (event) => {
    const { value, name } = event.target;
    setNotRequiredField((prev) => ({
      ...prev,
      [title.value]: {
        ...prev[title.value],
        [name]: value,
      },
    }));
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" className={classes.name}>
          {title.label}
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              name="contractName"
              label="Full Contract Name"
              onChange={inputHandler}
              defaultValue={sow?.[title.value]?.contactName || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              name="contractType"
              label="Contract Type"
              onChange={inputHandler}
              defaultValue={sow?.[title.value]?.contactType || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              name="processSteps"
              label="Process Steps"
              onChange={inputHandler}
              defaultValue={sow?.[title.value]?.processSteps || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Date desired"
              type="date"
              name="dateDesired"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={inputHandler}
              defaultValue={sow?.[title.value]?.dateDesired || ''}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              name="capitalExpense"
              label="Capital Expense"
              onChange={inputHandler}
              defaultValue={sow?.[title.value]?.capitalExpense || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              name="operationalExpense"
              label="Operational Expense"
              onChange={inputHandler}
              defaultValue={sow?.[title.value]?.operationalExpense || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              name="sowRagStatus"
              label="SOW RAG Status"
              onChange={inputHandler}
              defaultValue={sow?.[title.value]?.sowRagStatus || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              name="licenseContract"
              label="License Contract"
              onChange={inputHandler}
              defaultValue={sow?.[title.value]?.licenseContract || ''}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField fullWidth name="comments" label="Comments" onChange={inputHandler} defaultValue={sow?.[title.value]?.comments || ''} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              name="iProReqNumber"
              label="iPro Req#"
              onChange={inputHandler}
              defaultValue={sow?.[title.value]?.iProReqNumber || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth name="poNumber" label="PO#" onChange={inputHandler} defaultValue={sow?.[title.value]?.poNumber || ''} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth name="poStatus" label="PO Status" onChange={inputHandler} defaultValue={sow?.[title.value]?.poStatus || ''} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              name="contractNumber"
              label="Contract Number"
              onChange={inputHandler}
              defaultValue={sow?.[title.value]?.contractNumber || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Contract Start Date"
              type="date"
              name="contractStartDate"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={inputHandler}
              defaultValue={sow?.[title.value]?.contractStartDate || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Contract Expiration Date"
              type="date"
              name="contractExpirationDate"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={inputHandler}
              defaultValue={sow?.[title.value]?.contractExpirationDate || ''}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default memo(IproSubmit);
