import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import * as colors from '@material-ui/core/colors';
import { grey as defaultColor } from '@material-ui/core/colors';

const ColorButton = withStyles((theme) => ({
  root: {
    color: ({ colour: c, level: l = 700 }) => theme.palette.getContrastText(colors[c] ? colors[c][l] : defaultColor[l]),
    backgroundColor: ({ colour: c, level: l = 700 }) => (colors[c] ? colors[c][l] : defaultColor[l]),
    '&:hover': {
      backgroundColor: ({ colour: c, level: l = 700 }) => (colors[c] ? colors[c][l + 200] : defaultColor[l + 200]),
    },
  },
}))(Button);

export default ColorButton;
