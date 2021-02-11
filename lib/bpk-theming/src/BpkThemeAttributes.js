/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
  colorSkyGray,
  colorSkyGrayTint01,
  colorSkyGrayTint02,
  colorSkyGrayTint03,
  colorSkyGrayTint04,
  colorSkyGrayTint05,
  colorSkyGrayTint06,
  colorSkyGrayTint07,
  fontFamily,
} from 'bpk-tokens/tokens/base.react.native';

import { withTheme } from './BpkThemeProvider';

type Attributes = {
  primaryColor: string,
  colorGray50: string,
  colorGray100: string,
  colorGray200: string,
  colorGray300: string,
  colorGray400: string,
  colorGray500: string,
  colorGray700: string,
  colorGray900: string,
  textFontFamily: string,
};

export type Props = {
  children: (Attributes) => Node,
  theme: {
    primaryColor: string,
    colorGray50: string,
    colorGray100: string,
    colorGray200: string,
    colorGray300: string,
    colorGray400: string,
    colorGray500: string,
    colorGray700: string,
    colorGray900: string,
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
 * + `colorGray100`,
 * + `colorGray200`,
 * + `colorGray300`,
 * + `colorGray400`,
 * + `colorGray500`,
 * + `colorGray700`,
 * + `colorGray900`,
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
  // eslint-disable-next-line no-console
  console.warn(
    'BpkThemeAttributes will be removed on 31st December 2020. Migration guide: https://github.com/Skyscanner/backpack-react-native/blob/main/lib/bpk-theming/MIGRATION-BpkThemeAttributes.md',
  );

  const { theme, children } = props;
  const primaryColor =
    theme && theme.primaryColor != null ? theme.primaryColor : colorSkyBlue;
  const gray50 =
    theme && theme.colorGray50 != null ? theme.colorGray50 : colorSkyGrayTint07;
  const gray100 =
    theme && theme.colorGray100 != null
      ? theme.colorGray100
      : colorSkyGrayTint06;
  const gray200 =
    theme && theme.colorGray200 != null
      ? theme.colorGray200
      : colorSkyGrayTint05;
  const gray300 =
    theme && theme.colorGray300 != null
      ? theme.colorGray300
      : colorSkyGrayTint04;
  const gray400 =
    theme && theme.colorGray400 != null
      ? theme.colorGray400
      : colorSkyGrayTint03;
  const gray500 =
    theme && theme.colorGray500 != null
      ? theme.colorGray500
      : colorSkyGrayTint02;
  const gray700 =
    theme && theme.colorGray700 != null
      ? theme.colorGray700
      : colorSkyGrayTint01;
  const gray900 =
    theme && theme.colorGray900 != null ? theme.colorGray900 : colorSkyGray;
  const textFontFamily =
    theme && theme.textFontFamily != null ? theme.textFontFamily : fontFamily;

  return children({
    primaryColor,
    colorGray50: gray50,
    colorGray100: gray100,
    colorGray200: gray200,
    colorGray300: gray300,
    colorGray400: gray400,
    colorGray500: gray500,
    colorGray700: gray700,
    colorGray900: gray900,
    textFontFamily,
  });
};

export default withTheme(BpkThemeAttributes);
