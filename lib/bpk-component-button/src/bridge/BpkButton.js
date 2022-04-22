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

import { DefaultPropsV2, PropTypesV2, type PropsV2 } from './common-types';
import NativeButton from './NativeButton';

const BpkButton = (props: PropsV2) => {
  const { disabled, ...rest } = props;

  const isEnabled = !disabled;

  return <NativeButton enabled={isEnabled} {...rest} />;
};

BpkButton.propTypes = PropTypesV2;
BpkButton.defaultProps = DefaultPropsV2;

export default BpkButton;
