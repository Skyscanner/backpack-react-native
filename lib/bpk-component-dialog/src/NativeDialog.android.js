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
import { requireNativeComponent } from 'react-native';

import {
  nativePropsTypes,
  commonDefaultProps,
  type CommonProps,
} from './common-types';

const AndroidBPKDialogView = requireNativeComponent('AndroidBPKDialogView');

export type Props = {
  ...$Exact<CommonProps>,
};

const createActionHandler = (actions, scrim) => (event) => {
  if (event.nativeEvent.actionType === 'BUTTON_ACTION') {
    actions[event.nativeEvent.actionIndex].callback();
  } else if (event.nativeEvent.actionType === 'SCRIM_ACTION') {
    scrim.callback();
  }
};

const BpkDialog = (props: Props) => {
  const { icon, scrimAction, ...rest } = props;

  return (
    <AndroidBPKDialogView
      icon={{
        iconId: `bpk_${icon.iconId.replace(/-/g, '_')}`,
        iconColor: icon.iconColor.replace('color', 'bpk'),
      }}
      onChange={createActionHandler(props.actions, scrimAction)}
      scrimEnabled={scrimAction.enabled}
      {...rest}
    />
  );
};

BpkDialog.propTypes = nativePropsTypes;
BpkDialog.defaultProps = commonDefaultProps;

export default BpkDialog;
