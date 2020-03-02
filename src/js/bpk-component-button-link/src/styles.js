/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import {
  primaryColor,
  colorSkyGrayTint04,
  colorBlackTint05,
  spacingSm,
  spacingXl,
} from 'bpk-tokens/tokens/base.react.native';

import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../../bpk-appearance';

const styles = BpkDynamicStyleSheet.create({
  view: {
    minHeight: spacingXl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewLarge: {
    minHeight: spacingXl + spacingSm,
  },
  viewLeading: {
    flexDirection: 'row-reverse',
  },
  text: {
    color: primaryColor,
  },
  textDisabled: {
    color: { light: colorSkyGrayTint04, dark: colorBlackTint05 },
  },
  icon: {
    color: primaryColor,
    marginLeft: spacingSm,
  },
  iconLeading: {
    marginLeft: 0,
    marginRight: spacingSm,
  },
});

const useStyles = () => useBpkDynamicStyleSheet(styles);

export default useStyles;
