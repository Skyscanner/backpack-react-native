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
import PropTypes from 'prop-types';

type StringOrArray = string | Array<string>;

const SIZES = {
  icon: 'icon',
  xs: 'xs',
  sm: 'sm',
  base: 'base',
  lg: 'lg',
};

const ORIENTATION = {
  horizontal: 'horizontal',
  vertical: 'vertical',
};

export type Props = {
  title: StringOrArray,
  subtitle: StringOrArray,
  value: number,
  icon?: ?StringOrArray,
  size?: $Keys<typeof SIZES>,
  orientation?: $Keys<typeof ORIENTATION>,
};

export type NativeProps = {
  title: Array<string>,
  subtitle: Array<string>,
  value: number,
  icon: ?Array<string>,
  size: $Keys<typeof SIZES>,
  orientation: $Keys<typeof ORIENTATION>,
};

const arrayOrStringPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.string),
]);

export const propTypes = {
  title: arrayOrStringPropType.isRequired,
  subtitle: arrayOrStringPropType.isRequired,
  value: PropTypes.number.isRequired,
  icon: arrayOrStringPropType,
  size: PropTypes.oneOf(Object.values(SIZES)),
  orientation: PropTypes.oneOf(Object.values(ORIENTATION)),
};

export const defaultProps = {
  icon: null,
  size: SIZES.base,
  orientation: ORIENTATION.horizontal,
};
