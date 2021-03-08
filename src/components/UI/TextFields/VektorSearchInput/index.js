import { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

import VektorTextField from "components/UI/TextFields/VektorTextField";

const useStyles = makeStyles((theme) => ({
  searchIcon: {
    color: theme.custom.palette.grey,
    marginRight: theme.spacing(2),
  },
}));

const VektorSearchInput = ({ ...rest }) => {
  const classes = useStyles();

  return (
    <VektorTextField
      InputProps={{
        startAdornment: <SearchIcon className={classes.searchIcon} />,
      }}
      {...rest}
    />
  );
};

export default memo(VektorSearchInput);
