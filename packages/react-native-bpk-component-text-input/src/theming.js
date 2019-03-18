// @flow

import { makeThemePropType } from 'react-native-bpk-theming';

const REQUIRED_THEME_ATTRIBUTES = ['textInputFocusedColor'];

const themePropType = makeThemePropType(REQUIRED_THEME_ATTRIBUTES);

export { REQUIRED_THEME_ATTRIBUTES, themePropType };
