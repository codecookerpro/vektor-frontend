import { lazy } from 'react';
import LINKS from '../links';

const EditProfile = lazy(() => import(/* webpackChunkName: 'MaterialIcons' */ 'pages/Profile/EditProfile'));

const profileEditRoute = Object.freeze({
  id: LINKS.EDIT_PROFILE.TITLE,
  path: LINKS.EDIT_PROFILE.HREF,
  header: 'Edit profile',
  icon: null,
  containsHome: true,
  component: EditProfile,
  children: null,
});

export default profileEditRoute;
