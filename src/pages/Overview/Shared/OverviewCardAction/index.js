
import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import LinkButton from 'components/UI/Buttons/LinkButton'

const useStyles = makeStyles((theme) => ({
  mainLink: {
    padding: theme.spacing(1.5, 4),
    color: theme.custom.palette.black,
    backgroundColor: theme.custom.palette.grey
  },
  subLink: {
    margin: theme.spacing(0, 2)
  }
}));

const OverviewCardAction = ({
  mainLabel,
  mainLink,
  subLabel,
  subLink
}) => {
  const classes = useStyles();

  return (
    <div>
      <LinkButton
        to={mainLink}
        className={classes.mainLink}
      >
        {mainLabel}
      </LinkButton>
      <LinkButton
        to={subLink}
        className={classes.subLink}
      >
        {subLabel}
      </LinkButton>
    </div>
  )
}

export default memo(OverviewCardAction)