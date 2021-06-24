import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ColorButton = withStyles((theme) => {
  const btnPal = theme.custom.buttonPalette;
  return {
    root: {
      color: ({ colour }) => btnPal[colour].contrastText,
      backgroundColor: ({ colour }) => btnPal[colour].main,
      '&:hover': {
        backgroundColor: ({ colour }) => btnPal[colour].dark,
      },
      '&:active': {
        backgroundColor: ({ colour }) => btnPal[colour].light,
      },
    },
  };
})(Button);

export default ColorButton;
