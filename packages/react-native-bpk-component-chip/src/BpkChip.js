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

import React from 'react';
import PropTypes from 'prop-types';

import BpkChipWrapper from './BpkChipWrapper';
import {
  type Props as CommonProps,
  commonPropTypes,
  commonDefaultProps,
} from './common-types';

export type Props = {
  ...$Exact<CommonProps>,
  selected: boolean,
};

const BpkChip = (props: Props) => {
  const { ...rest } = props;

  return <BpkChipWrapper {...rest} dismissible={false} />;
};

BpkChip.propTypes = {
  ...commonPropTypes,
  selected: PropTypes.bool,
};

BpkChip.defaultProps = {
  ...commonDefaultProps,
  selected: false,
};

export default BpkChip;
