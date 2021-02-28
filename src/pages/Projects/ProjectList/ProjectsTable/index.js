import { memo, useState } from 'react'
import {
  Card,
  CardContent,
  TableCell,
  TableRow,
  Typography
} from '@material-ui/core'

import VektorChip from 'components/VektorChip'
import LinkButton from 'components/UI/Buttons/LinkButton'
import VektorTableContainer from 'parts/Tables/VektorTableContainer'
import * as TABLE_ENVIRONMENTS from 'utils/constants/table-environments'
import LINKS from 'utils/constants/links';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'organization', label: 'Organization', minWidth: 100 },
  { id: 'number', label: 'Number', minWidth: 170 },
  { id: 'finished', label: 'Finished', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 170 },
];

const ProjectsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(TABLE_ENVIRONMENTS.ROWS_PER_PAGE);

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' color='textPrimary' gutterBottom>
          {`${results.length} projects`}
        </Typography>
        <VektorTableContainer
          columns={columns}
          rowCounts={results.length}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        >
          {
            (
              rowsPerPage > 0
                ? results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : results
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell
                  component='th'
                  scope='row'
                >
                  <LinkButton to={LINKS.ADD_PROJECT.HREF}>
                    {row.name}
                  </LinkButton>
                </TableCell>
                <TableCell>
                  {row.organization}
                </TableCell>
                <TableCell>
                  {row.number}
                </TableCell>
                <TableCell>
                  {
                    row.finished
                    ? <VektorChip label='Finished' color='success' />
                    : <VektorChip label='Not Finished' color='error' />
                  }
                </TableCell>
                <TableCell>
                  {row.status * 100}%
              </TableCell>
              </TableRow>
            ))
          }
        </VektorTableContainer>
      </CardContent>
    </Card>
  );
}

export default memo(ProjectsTable);

const results = [
  {
    id: '0001',
    name: 'BCPF ECQ',
    organization: 'Falcon',
    number: 'T-00001',
    finished: true,
    status: 1
  },
  {
    id: '0002',
    name: 'B100-sFAT',
    organization: 'SPL-B100',
    number: '20-SPL-001	',
    finished: false,
    status: 0.65
  },
  {
    id: '0003',
    name: 'IG Max_Test',
    organization: 'Voxsync',
    number: '30-492-l',
    finished: true,
    status: 1
  },
  {
    id: '0004',
    name: 'AGE',
    organization: 'SPL-B100',
    number: 'SN-320',
    finished: false,
    status: 0.54
  },
  {
    id: '0005',
    name: 'BCPF ECQ',
    organization: 'Voxsync',
    number: 'MP-9303',
    finished: false,
    status: 0.12
  },
  {
    id: '0006',
    name: 'Audio 90',
    organization: 'Falcon',
    number: 'P-49-LP',
    finished: false,
    status: 0.43
  },
  {
    id: '0007',
    name: 'BWE-OP',
    organization: 'Falcon',
    number: 'PEJ',
    finished: true,
    status: 1
  },
  {
    id: '0008',
    name: 'BCPF ECQ',
    organization: 'HE-93',
    number: 'N091293',
    finished: false,
    status: 0.31
  },
  {
    id: '0009',
    name: 'M23',
    organization: 'OP-0098',
    number: 'P-P-324',
    finished: false,
    status: 0.65
  },
  {
    id: '0010',
    name: 'MPECQ',
    organization: 'Falcon',
    number: 'T-00001de',
    finished: false,
    status: 0.3
  },
  {
    id: '0011',
    name: 'B100-sFATD',
    organization: 'SPL-B100',
    number: '20-SPL-001',
    finished: false,
    status: 0.25
  },
]