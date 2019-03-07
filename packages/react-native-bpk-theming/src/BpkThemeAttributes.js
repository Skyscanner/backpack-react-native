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
};

export type Props = {
  children: Attributes => Node,
  theme: { primaryColor: string },
};

/**
 * A render prop component that provides certain values
 * from the nearest `BpkThemeProvider` with suitable defaults
 * if rendered without a `BpkThemeProvider`.
 *
 * Supported attributes:
 * + `primaryColor`
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

  return children({ primaryColor });
};

export default withTheme(BpkThemeAttributes);
