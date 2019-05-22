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
import memoize from 'lodash/memoize';

import {
  commonPropTypes,
  commonDefaultProps,
  type CommonProps,
} from './common-types';
import NativeDialog from './NativeDialog';

export type Props = {
  ...$Exact<CommonProps>,
};

const createOnButtonClickHandler = memoize(actions => event => {
  if (event.nativeEvent) {
    const index = event.nativeEvent.actionIndex;
    if (actions[index]) {
      actions[index].callback();
    }
  }
});

const BpkDialog = (props: Props) => (
  <NativeDialog
    onChange={createOnButtonClickHandler(props.actions)}
    {...props}
  />
);

BpkDialog.propTypes = commonPropTypes;
BpkDialog.defaultProps = commonDefaultProps;

export default BpkDialog;
