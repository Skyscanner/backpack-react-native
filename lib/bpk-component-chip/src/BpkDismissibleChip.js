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

import React from 'react';

import BpkIcon, { icons } from '../../bpk-component-icon';

import BpkChip from './BpkChip';
import {
  type Props as CommonProps,
  commonPropTypes,
  commonDefaultProps,
} from './common-types';

export type Props = CommonProps;

const BpkDismissibleChip = (props: Props) => {
  const { ...rest } = props;

  return (
    <BpkChip
      {...rest}
      trailingAccessoryView={<BpkIcon icon={icons.close} small />}
      large
      selected={false}
    />
  );
};

BpkDismissibleChip.propTypes = commonPropTypes;
BpkDismissibleChip.defaultProps = commonDefaultProps;

export default BpkDismissibleChip;
