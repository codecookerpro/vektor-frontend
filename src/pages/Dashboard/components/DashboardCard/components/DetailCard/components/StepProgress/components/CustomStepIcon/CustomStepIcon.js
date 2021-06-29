import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useCustomStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 20,
    height: 20,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  active: {
    zIndex: 2,
    background: '#a6b884',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  activeLabel: {
    position: 'absolute',
    top: '-30px',
    color: 'black',
    whiteSpace: 'nowrap',
  },
  completed: {
    background: '#4d84c0',
  },
});

const CustomStepIcon = (props) => {
  const classes = useCustomStepIconStyles();
  const { active, completed, icon } = props;
  const left = icon < 3 ? 0 : 'inherit';
  const right = icon === 1 ? 'inherit' : 0;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {active && (
        <span className={classes.activeLabel} style={{ left, right }}>
          Current Date
        </span>
      )}
    </div>
  );
};

export default memo(CustomStepIcon);
