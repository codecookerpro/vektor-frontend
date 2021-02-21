import * as types from "redux/types";

export function setTheme(value) {
  return {
    type: types.THEME_SET,
    payload: value,
  };
}
