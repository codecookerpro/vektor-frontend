import { memo, useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableContainer } from '@material-ui/core';

import VektorTableHeader from 'parts/Tables/VektorTableHeader';
import { noop, SORT_DIRS } from 'utils/constants';

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 800,
  },
}));

const VektorSubTableContainer = ({ columns, children, onSort = noop, sticky }) => {
  const classes = useStyles();
  const [order, setOrder] = useState(SORT_DIRS.asc);
  const [orderBy, setOrderBy] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  const [stickyWidth, setStickyWidth] = useState(0);
  const [stickyTop, setStickyTop] = useState(0);
  const tbodyRef = useRef(null);
  const tableRef = useRef(null);

  const handleScroll = (e) => {
    if (tbodyRef.current) {
      const rect = tbodyRef.current.getBoundingClientRect();
      const theaderHeight = tableRef.current.children[0].clientHeight;

      if (rect.y <= stickyTop + theaderHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }
  };

  const handleTableScroll = (e) => {
    setScrollX(e.target.scrollLeft);
  };

  const handleTableResize = (e) => {
    setStickyWidth(tableRef.current.parentElement.clientWidth);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === SORT_DIRS.asc;
    const nextOrder = isAsc ? SORT_DIRS.desc : SORT_DIRS.asc;
    setOrder(nextOrder);
    setOrderBy(property);
    onSort(property, nextOrder);
  };

  // eslint-disable-next-line
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleTableResize);

    setStickyTop(window.document.getElementsByTagName('header')[0].clientHeight);
    setStickyWidth(tableRef.current.parentElement.clientWidth);
  });

  return (
    <TableContainer onScroll={handleTableScroll}>
      <Table ref={tableRef} className={classes.table} aria-label="custom pagination table">
        {sticky && isSticky && (
          <VektorTableHeader
            sticky={isSticky}
            scrollX={scrollX}
            stickyTop={stickyTop}
            stickyWidth={stickyWidth}
            columns={columns}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
        )}
        <VektorTableHeader columns={columns} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
        <TableBody ref={tbodyRef}>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(VektorSubTableContainer);
