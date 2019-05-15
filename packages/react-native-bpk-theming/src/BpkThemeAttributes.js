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
import { colorBlue500 } from 'bpk-tokens/tokens/base.react.native';

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
  const colorGray50 =
    theme && theme.primaryColor != null ? theme.colorGray50 : colorBlue500;
  const colorGray100 =
    theme && theme.primaryColor != null ? theme.colorGray100 : colorBlue500;
  const colorGray300 =
    theme && theme.primaryColor != null ? theme.colorGray300 : colorBlue500;
  const colorGray500 =
    theme && theme.primaryColor != null ? theme.colorGray500 : colorBlue500;
  const colorGray700 =
    theme && theme.primaryColor != null ? theme.colorGray700 : colorBlue500;
  const colorGray900 =
    theme && theme.primaryColor != null ? theme.colorGray900 : colorBlue500;

  return children({
    primaryColor,
    colorGray50,
    colorGray100,
    colorGray300,
    colorGray500,
    colorGray700,
    colorGray900,
  });
};

export default withTheme(BpkThemeAttributes);
