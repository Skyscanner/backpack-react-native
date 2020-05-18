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

import { type Node } from 'react';
import PropTypes from 'prop-types';

import { type Theme } from '../../bpk-theming';
import { themePropType } from '../../bpk-component-text/src/theming';

export type Props = {
  children: Node,
  onPress: () => mixed,
  accessibilityLabel: ?string,
  theme: ?Theme,
};

export const propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  accessibilityLabel: PropTypes.string,
  theme: themePropType,
};

export const defaultProps = {
  accessibilityLabel: null,
  theme: null,
};
