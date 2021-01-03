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

import React, { Component } from 'react';
import {
  requireNativeComponent,
  NativeModules,
  NativeEventEmitter,
  processColor,
} from 'react-native';
import type EmitterSubscription from 'react-native/Libraries/vendor/emitter/EmitterSubscription';
import isNil from 'lodash/isNil';
import { colors } from 'bpk-tokens/tokens/base.react.native';

import { commonPropTypes, type CommonProps } from './common-types';

const RCTBPKDialog = requireNativeComponent('RCTBPKDialog');

let uniqueModalIdentifier = 0;

const BpkDialogEventEmitter = NativeModules.BPKDialogEventsManager
  ? new NativeEventEmitter(NativeModules.BPKDialogEventsManager)
  : null;

export type Props = {
  ...$Exact<CommonProps>,
};

export type State = {
  ...$Exact<CommonProps>,
};

class BpkDialog extends Component<Props> {
  eventSubscriptions: Array<EmitterSubscription>;

  identifier: number;

  constructor(props: Props) {
    super(props);
    this.identifier = uniqueModalIdentifier;
    uniqueModalIdentifier += 1;
    this.eventSubscriptions = [];
  }

  componentDidMount() {
    if (BpkDialogEventEmitter) {
      const { actions, scrimAction } = this.props;
      this.eventSubscriptions.push(
        BpkDialogEventEmitter.addListener('bpkDialogAction', (event) => {
          if (
            !isNil(event.actionIndex) &&
            event.identifier === this.identifier
          ) {
            actions[event.actionIndex].callback();
          }
        }),
      );
      if (scrimAction) {
        this.eventSubscriptions.push(
          BpkDialogEventEmitter.addListener('bpkDialogScrim', (event) => {
            if (event.identifier === this.identifier) {
              scrimAction.callback();
            }
          }),
        );
      }
    }
  }

  componentWillUnmount() {
    this.eventSubscriptions.forEach((subscriber) => subscriber.remove());
  }

  render() {
    const { isOpen, scrimAction, icon, ...rest } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <RCTBPKDialog
        identifier={this.identifier}
        scrimEnabled={scrimAction ? scrimAction.enabled : false}
        iconId={icon.iconId}
        iconColor={processColor(colors[icon.iconColor])}
        {...rest}
      />
    );
  }
}

BpkDialog.propTypes = commonPropTypes;

export default BpkDialog;
