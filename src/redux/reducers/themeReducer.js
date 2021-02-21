import * as types from "redux/types";
import THEMES from "utils/constants/theme";

const initialState = {
  currentTheme: THEMES.DEFAULT,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.THEME_SET:
      return {
        ...state,
        currentTheme: actions.payload,
      };

    default:
      return state;
  }
}
