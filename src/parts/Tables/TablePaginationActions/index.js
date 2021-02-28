import { memo, useCallback } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
    '& svg': {
      color: theme.palette.text.primary
    }
  },
}));

function TablePaginationActions({
  count,
  page,
  rowsPerPage,
  onChangePage
}) {
  const classes = useStyles();
  const theme = useTheme();

  const handleFirstPageButtonClick = useCallback((event) => {
    onChangePage(event, 0);
  }, [onChangePage]);

  const handleBackButtonClick = useCallback((event) => {
    onChangePage(event, page - 1);
  }, [page, onChangePage]);

  const handleNextButtonClick = useCallback((event) => {
    onChangePage(event, page + 1);
  }, [page, onChangePage]);

  const handleLastPageButtonClick = useCallback((event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }, [count, rowsPerPage, onChangePage]);

  return (
    <div className={classes.root}>
      <IconButton
        aria-label='first page'
        disabled={page === 0}
        onClick={handleFirstPageButtonClick}
      >
        {
          theme.direction === 'rtl'
            ? <LastPageIcon />
            : <FirstPageIcon />
        }
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {
          theme.direction === 'rtl'
            ? <KeyboardArrowRight />
            : <KeyboardArrowLeft />
        }
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {
          theme.direction === 'rtl'
            ? <KeyboardArrowLeft />
            : <KeyboardArrowRight />
        }
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {
          theme.direction === 'rtl'
            ? <FirstPageIcon />
            : <LastPageIcon />
        }
      </IconButton>
    </div>
  );
}

export default memo(TablePaginationActions);