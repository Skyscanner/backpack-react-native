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
import PropTypes from 'prop-types';

import {
  type BpkTextProps,
  propTypes as BpkTextPropTypes,
  defaultProps as BpkTextDefaultProps,
} from '../../bpk-component-text';
import { type Theme } from '../../bpk-theming';

import { themePropType } from './theming';

export type Props = {|
  ...$Exact<BpkTextProps>,
  accessibilityLabel: string,
  children: Node,
  onPress: () => mixed,
  theme: ?Theme,
|};

export const propTypes = {
  ...BpkTextPropTypes,
  accessibilityLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  theme: themePropType,
};

export const defaultProps = {
  ...BpkTextDefaultProps,
  theme: null,
};
