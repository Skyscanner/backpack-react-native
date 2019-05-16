/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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

import { type Node } from 'react';
import {
  colorBlue500,
  colorGray50,
  colorGray100,
  colorGray300,
  colorGray500,
  colorGray700,
  colorGray900,
} from 'bpk-tokens/tokens/base.react.native';

import { withTheme } from './BpkThemeProvider';

type Attributes = {
  primaryColor: string,
  colorGray50: string,
  colorGray100: string,
  colorGray300: string,
  colorGray500: string,
  colorGray700: string,
  colorGray900: string,
};

export type Props = {
  children: Attributes => Node,
  theme: {
    primaryColor: string,
    colorGray50: string,
    colorGray100: string,
    colorGray300: string,
    colorGray500: string,
    colorGray700: string,
    colorGray900: string,
  },
};

/**
 * A render prop component that provides certain values
 * from the nearest `BpkThemeProvider` with suitable defaults
 * if rendered without a `BpkThemeProvider`.
 *
 * Supported attributes:
 * + `primaryColor`
 * + `colorGray50`,
 * + `colorGray100`,
 * + `colorGray300`,
 * + `colorGray500`,
 * + `colorGray700`,
 * + `colorGray900`,
 *
 * @example
 * <BpkThemeAttributes>
 *  {({ primaryColor }) => <View style={{ backgroundColor: primaryColor }} />}
 * </BpkThemeAttributes>
 *
 * @param {Object} props `children` prop is used as render prop.
 * @return {Node} The return value of `props.children`
 *
 */
const BpkThemeAttributes = (props: Props) => {
  const { theme, children } = props;
  const primaryColor =
    theme && theme.primaryColor != null ? theme.primaryColor : colorBlue500;
  const gray50 =
    theme && theme.colorGray50 != null ? theme.colorGray50 : colorGray50;
  const gray100 =
    theme && theme.colorGray100 != null ? theme.colorGray100 : colorGray100;
  const gray300 =
    theme && theme.colorGray300 != null ? theme.colorGray300 : colorGray300;
  const gray500 =
    theme && theme.colorGray500 != null ? theme.colorGray500 : colorGray500;
  const gray700 =
    theme && theme.colorGray700 != null ? theme.colorGray700 : colorGray700;
  const gray900 =
    theme && theme.colorGray900 != null ? theme.colorGray900 : colorGray900;

  return children({
    primaryColor,
    colorGray50: gray50,
    colorGray100: gray100,
    colorGray300: gray300,
    colorGray500: gray500,
    colorGray700: gray700,
    colorGray900: gray900,
  });
};

export default withTheme(BpkThemeAttributes);
