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
import isNil from 'lodash/isNil';

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
  if (!isNil(event.nativeEvent.actionIndex)) {
    const index = event.nativeEvent.actionIndex;
    if (actions[index]) {
      actions[index].callback();
    }
  }
});

const BpkDialog = (props: Props) => {
  const { icon, ...rest } = props;

  if (!icon.iconId.startsWith('bpk_')) {
    throw Error('Invalid icon id. The icon id should start with "bpk_"');
  }

  if (!icon.iconColor.startsWith('bpk')) {
    throw Error('Invalid icon color. The icon color should start with "bpk"');
  }

  return (
    <NativeDialog
      icon={icon}
      onChange={createOnButtonClickHandler(props.actions)}
      {...rest}
    />
  );
};

BpkDialog.propTypes = commonPropTypes;
BpkDialog.defaultProps = commonDefaultProps;

export default BpkDialog;
