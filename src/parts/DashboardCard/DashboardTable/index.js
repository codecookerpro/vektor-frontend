import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { green, red } from '@material-ui/core/colors';
import {
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableHead,
  TableRow as MuiTableRow,
} from '@material-ui/core';

const TableRow = styled(MuiTableRow)`
  height: 42px;
`;

const TableCell = styled(MuiTableCell)`
  padding-top: 0;
  padding-bottom: 0;
`;

const GreenText = styled.span`
  color: ${() => green[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const RedText = styled.span`
  color: ${() => red[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const DashboardTable = () => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Source</TableCell>
          <TableCell align='right'>Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell component='th' scope='row'>
            Social
          </TableCell>
          <TableCell align='right'>
            <GreenText>+35%</GreenText>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell component='th' scope='row'>
            Search Engines
        </TableCell>
          <TableCell align='right'>
            <RedText>-12%</RedText>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell component='th' scope='row'>
            Direct
        </TableCell>
          <TableCell align='right'>
            <GreenText>+46%</GreenText>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell component='th' scope='row'>
            Other
          </TableCell>
          <TableCell align='right'>
            <GreenText>+24%</GreenText>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default memo(DashboardTable);
