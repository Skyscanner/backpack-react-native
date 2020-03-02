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
import React, { type Node } from 'react';
import { Platform } from 'react-native';
import { USE_RELATIVE } from 'react-native-dotenv';

import BpkThemeProvider from '../src/js/bpk-theming';

type Props = {
  children: Node,
};

const relativeFontFamily =
  Platform.OS === 'android'
    ? 'skyscanner_relative_android'
    : 'SkyscannerRelativeiOS-Book';

const theme = {
  textFontFamily: relativeFontFamily,
};

const RelativeFontProvider = ({ children }: Props) => {
  // TODO: add iOS support
  if (USE_RELATIVE !== 'true' || Platform.OS === 'ios') {
    return children;
  }
  return <BpkThemeProvider theme={theme}>{children}</BpkThemeProvider>;
};

export default RelativeFontProvider;
