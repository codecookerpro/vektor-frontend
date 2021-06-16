import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import * as colors from '@material-ui/core/colors';
import { grey as defaultColor } from '@material-ui/core/colors';

const ColorButton = withStyles((theme) => ({
  root: {
    color: (p) => theme.palette.getContrastText(colors[p.colour] ? colors[p.colour][700] : defaultColor[300]),
    backgroundColor: (p) => (colors[p.colour] ? colors[p.colour][700] : defaultColor[300]),
    '&:hover': {
      backgroundColor: (p) => (colors[p.colour] ? colors[p.colour][900] : defaultColor[500]),
    },
  },
}))(Button);

export default ColorButton;
