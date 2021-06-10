import keyMirror from 'keymirror';

export * from './emptyString';
export * from './equipment-categories';
export * from './equipment-types';
export * from './error-codes';
export * from './footer-menu';
export * from './image-paths';
export * from './links';
export * from './permissions';
export * from './popupText';
export * from './popupType';
export * from './projectModes';
export * from './table-environments';
export * from './validations';

export const FORM_MODE = keyMirror({
  create: null,
  update: null,
  view: null,
});
