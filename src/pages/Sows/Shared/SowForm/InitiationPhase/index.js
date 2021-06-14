import React, { memo } from 'react';
import { useStyles } from './styles';
import { Card, CardContent, Grid, TextField, Typography } from '@material-ui/core';

const InitiationPhase = ({ mode, sow = {}, title, setNotRequiredField }) => {
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
              type="datetime-local"
              name="dateDesired"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={inputHandler}
              defaultValue={sow?.[title.value]?.dateDesired || ''}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth name="ownerBrm" label="Owner/BRM" onChange={inputHandler} defaultValue={sow?.[title.value]?.ownerBrm || ''} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              name="projectManager"
              label="? Project Manager"
              onChange={inputHandler}
              defaultValue={sow?.[title.value]?.projectManager || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth name="vendorName" label="Vendor Name" onChange={inputHandler} defaultValue={sow?.[title.value]?.vendorName || ''} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              name="costCenterCodeDesc"
              label="Cost Center Code-Desc"
              onChange={inputHandler}
              defaultValue={sow?.[title.value]?.costCenterCodeDesc || ''}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth name="abac" label="ABAC" onChange={inputHandler} defaultValue={sow?.[title.value]?.abac || ''} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth name="infoSec" label="InfoSec" onChange={inputHandler} defaultValue={sow?.[title.value]?.infoSec || ''} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth name="cdaNda" label="CDA/NDA" onChange={inputHandler} defaultValue={sow?.[title.value]?.cdaNda || ''} />
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
              label="? License Contract"
              onChange={inputHandler}
              defaultValue={sow?.[title.value]?.licenseContract || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth name="comments" label="Comments" onChange={inputHandler} defaultValue={sow?.[title.value]?.comments || ''} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default memo(InitiationPhase);
