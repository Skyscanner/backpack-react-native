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
  colorSkyBlue,
  colorSkyGrayTint07,
  colorSkyGrayTint06,
  colorSkyGrayTint05,
  colorSkyGrayTint04,
  colorSkyGrayTint03,
  colorSkyGrayTint02,
  colorSkyGrayTint01,
  colorSkyGray,
  fontFamily,
} from 'bpk-tokens/tokens/base.react.native';

import { withTheme } from './BpkThemeProvider';

type Attributes = {
  primaryColor: string,
  colorGray50: string,
  colorSkyGrayTint06: string,
  colorSkyGrayTint05: string,
  colorSkyGrayTint04: string,
  colorSkyGrayTint03: string,
  colorSkyGrayTint02: string,
  colorSkyGrayTint01: string,
  colorSkyGray: string,
  textFontFamily: string,
};

export type Props = {
  children: Attributes => Node,
  theme: {
    primaryColor: string,
    colorGray50: string,
    colorSkyGrayTint06: string,
    colorSkyGrayTint05: string,
    colorSkyGrayTint04: string,
    colorSkyGrayTint03: string,
    colorSkyGrayTint02: string,
    colorSkyGrayTint01: string,
    colorSkyGray: string,
    textFontFamily: string,
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
 * + `colorSkyGrayTint06`,
 * + `colorSkyGrayTint05`,
 * + `colorSkyGrayTint04`,
 * + `colorSkyGrayTint03`,
 * + `colorSkyGrayTint02`,
 * + `colorSkyGrayTint01`,
 * + `colorSkyGray`,
 * + `textFontFamily`,
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
    theme && theme.primaryColor != null ? theme.primaryColor : colorSkyBlue;
  const gray50 =
    theme && theme.colorSkyGrayTint07 != null
      ? theme.colorSkyGrayTint07
      : colorSkyGrayTint07;
  const gray100 =
    theme && theme.colorSkyGrayTint06 != null
      ? theme.colorSkyGrayTint06
      : colorSkyGrayTint06;
  const gray200 =
    theme && theme.colorSkyGrayTint05 != null
      ? theme.colorSkyGrayTint05
      : colorSkyGrayTint05;
  const gray300 =
    theme && theme.colorSkyGrayTint04 != null
      ? theme.colorSkyGrayTint04
      : colorSkyGrayTint04;
  const gray400 =
    theme && theme.colorSkyGrayTint03 != null
      ? theme.colorSkyGrayTint03
      : colorSkyGrayTint03;
  const gray500 =
    theme && theme.colorSkyGrayTint02 != null
      ? theme.colorSkyGrayTint02
      : colorSkyGrayTint02;
  const gray700 =
    theme && theme.colorSkyGrayTint01 != null
      ? theme.colorSkyGrayTint01
      : colorSkyGrayTint01;
  const gray900 =
    theme && theme.colorSkyGray != null ? theme.colorSkyGray : colorSkyGray;
  const textFontFamily =
    theme && theme.textFontFamily != null ? theme.textFontFamily : fontFamily;

  return children({
    primaryColor,
    colorGray50: gray50,
    colorSkyGrayTint06: gray100,
    colorSkyGrayTint05: gray200,
    colorSkyGrayTint04: gray300,
    colorSkyGrayTint03: gray400,
    colorSkyGrayTint02: gray500,
    colorSkyGrayTint01: gray700,
    colorSkyGray: gray900,
    textFontFamily,
  });
};

export default withTheme(BpkThemeAttributes);
