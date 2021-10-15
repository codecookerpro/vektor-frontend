import React, { memo, useMemo } from 'react';
import { useStyles } from './styles';
import { Card, CardContent, Grid, TextField, Typography } from '@material-ui/core';
import inputHandler from '../inputHandler';
import moment from 'moment';

const IproSubmit = ({ sow = {}, title, setNotRequiredField }) => {
  const classes = useStyles();
  const iProSubmit = useMemo(() => sow?.[title?.value] || {}, [sow, title]);

  const onChange = (e) => {
    inputHandler(e, setNotRequiredField, title);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" className={classes.name}>
          {title.label}
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth name="contractName" label="Full Contract Name" onChange={onChange} defaultValue={iProSubmit.contractName || ''} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth name="contractType" label="Contract Type" onChange={onChange} defaultValue={iProSubmit.contractType || ''} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth name="processSteps" label="Process Steps" onChange={onChange} defaultValue={iProSubmit.processSteps || ''} />
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
              onChange={onChange}
              defaultValue={moment(iProSubmit.dateDesired).format('YYYY-MM-DD') || ''}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth name="capitalExpense" label="Capital Expense" onChange={onChange} defaultValue={iProSubmit.capitalExpense || ''} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              name="operationalExpense"
              label="Operational Expense"
              onChange={onChange}
              defaultValue={iProSubmit.operationalExpense || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth name="sowRagStatus" label="SOW RAG Status" onChange={onChange} defaultValue={iProSubmit.sowRagStatus || ''} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              name="licenseContract"
              label="License Contract"
              onChange={onChange}
              defaultValue={iProSubmit.licenseContract || ''}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField fullWidth name="comments" label="Comments" onChange={onChange} defaultValue={iProSubmit.comments || ''} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth name="iProReqNumber" label="iPro Req#" onChange={onChange} defaultValue={iProSubmit.iProReqNumber || ''} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth name="poNumber" label="PO#" onChange={onChange} defaultValue={iProSubmit.poNumber || ''} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth name="poStatus" label="PO Status" onChange={onChange} defaultValue={iProSubmit.poStatus || ''} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth name="contractNumber" label="Contract Number" onChange={onChange} defaultValue={iProSubmit.contractNumber || ''} />
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
              onChange={onChange}
              defaultValue={moment(iProSubmit.contractStartDate).format('YYYY-MM-DD') || ''}
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
              onChange={onChange}
              defaultValue={moment(iProSubmit.contractExpirationDate).format('YYYY-MM-DD') || ''}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default memo(IproSubmit);
