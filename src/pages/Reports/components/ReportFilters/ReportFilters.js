import React, { memo } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import FilterSelect from 'components/UI/Selects/FilterSelect';
import useUserPermissions from 'utils/hooks/useUserPermission';

import useStyles from './styles';
import useReportFiltersLogic from './helpers';
import { REPORT_STATUSES } from './constants';
import { DatePicker } from '@material-ui/pickers';
import VektorTextField from 'components/UI/TextFields/VektorTextField';

const ReportFilters = ({ filter, setFilter }) => {
  const classes = useStyles();
  const { isAdmin } = useUserPermissions();
  const { organizationsData, projects, metaSystems, inputHandler } = useReportFiltersLogic(isAdmin, filter, setFilter);

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant="h3" color="textPrimary">
          Select records to download CSV
        </Typography>

        <div className={classes.container}>
          {isAdmin && (
            <FilterSelect
              label="By organization"
              placeholder="All organizations"
              name="organization"
              items={organizationsData}
              keys={{ label: 'name', value: '_id' }}
              value={filter?.organization || ''}
              onChange={inputHandler}
              className={classes.input}
            />
          )}
          <FilterSelect
            label="By project"
            placeholder="All projects"
            name="project"
            items={projects}
            keys={{ label: 'name', value: '_id' }}
            value={filter?.project || ''}
            onChange={inputHandler}
            className={classes.input}
          />
          <FilterSelect
            label="By System"
            placeholder="All systems"
            name="metaSystem"
            items={metaSystems}
            keys={{ label: 'name', value: '_id' }}
            value={filter?.metaSystem || ''}
            onChange={inputHandler}
            className={classes.input}
          />
          <FilterSelect
            label="By Status"
            placeholder="All statuses"
            name="status"
            items={REPORT_STATUSES}
            nullable={true}
            keys={{ label: 'name', value: '_id' }}
            value={filter?.status || ''}
            onChange={inputHandler}
            className={classes.input}
          />
          <DatePicker
            label="By End Date"
            variant="inline"
            format="MM/dd/yyyy"
            value={filter?.endDate}
            maxDate={new Date()}
            onChange={(newValue) => {
              inputHandler({ target: { name: 'endDate', value: newValue } });
            }}
            TextFieldComponent={VektorTextField}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(ReportFilters);
