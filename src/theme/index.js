import { createMuiTheme } from "@material-ui/core/styles";

import variant from "./variant";
import typography from "./typography";
import overrides from "./overrides";
import breakpoints from "./breakpoints";
import props from "./props";
import shadows from "./shadows";

const theme = createMuiTheme(
  {
    spacing: 4,
    breakpoints: breakpoints,
    overrides: overrides,
    props: props,
    typography: typography,
    shadows: shadows,
    palette: variant.palette,
    custom: variant.custom,
  },
  {
    name: variant.name,
    header: variant.header,
    footer: variant.footer,
    sidebar: variant.sidebar,
  }
);


export default theme;
