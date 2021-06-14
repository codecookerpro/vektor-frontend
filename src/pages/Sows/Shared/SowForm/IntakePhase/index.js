import React, { memo } from 'react';
import { useStyles } from './styles';
import { Card, CardContent, Grid, TextField, Typography } from '@material-ui/core';
import inputHandler from '../inputHandler';

const IntakePhase = ({ mode, sow = {}, title, setNotRequiredField }) => {
  const classes = useStyles();

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
            <TextField
              fullWidth
              name="contractName"
              label="Full Contract Name"
              onChange={onChange}
              defaultValue={sow?.[title.value]?.contractName || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              name="contractType"
              label="Contract Type"
              onChange={onChange}
              defaultValue={sow?.[title.value]?.contractType || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              name="processSteps"
              label="Process Steps"
              onChange={onChange}
              defaultValue={sow?.[title.value]?.processSteps || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Date desired"
              type="datetime-local"
              name="dateDesired"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChange}
              defaultValue={sow?.[title.value]?.dateDesired || ''}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              name="capitalExpense"
              label="Capital Expense"
              onChange={onChange}
              defaultValue={sow?.[title.value]?.capitalExpense || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              name="operationalExpense"
              label="Operational Expense"
              onChange={onChange}
              defaultValue={sow?.[title.value]?.operationalExpense || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              name="sowRagStatus"
              label="SOW RAG Status"
              onChange={onChange}
              defaultValue={sow?.[title.value]?.sowRagStatus || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              name="licenseContract"
              label="License Contract"
              onChange={onChange}
              defaultValue={sow?.[title.value]?.licenseContract || ''}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={9}>
            <TextField fullWidth name="comments" label="Comments" onChange={onChange} defaultValue={sow?.[title.value]?.comments || ''} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth name="msaNumber" label="MSA#" onChange={onChange} defaultValue={sow?.[title.value]?.msaExpiration || ''} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              name="msaExpiration"
              label="MSA Expiration"
              onChange={onChange}
              defaultValue={sow?.[title.value]?.msaExpiration || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth name="fid" label="FID" onChange={onChange} defaultValue={sow?.[title.value]?.fid || ''} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth name="fidCodeDesc" label="FID Code-Desc" onChange={onChange} defaultValue={sow?.[title.value]?.fidCodeDesc || ''} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth name="pvidNumber" label="PVID#" onChange={onChange} defaultValue={sow?.[title.value]?.pvidNumber || ''} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default memo(IntakePhase);
