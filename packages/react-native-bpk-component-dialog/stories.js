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

import React, { Component } from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import BpkButton from 'react-native-bpk-component-button';

import CenterDecorator from '../../storybook/CenterDecorator';

import BpkDialog, { DIALOG_TYPE, BUTTON_TYPE } from './index';

const dialogTitle = 'Backpack Dialog';

const dialogDescription =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et luctus sem, quis pharetra lacus.';

const dialogIcon = {
  iconId: 'bpk_tick',
  iconColor: 'bpkGreen500',
};

const generateBpkDialog = (open: boolean, actions) => (
  <BpkDialog
    dialogType={DIALOG_TYPE.alert}
    title={dialogTitle}
    description={dialogDescription}
    icon={dialogIcon}
    actions={actions}
    scrimAction={{
      enabled: true,
      callback: () => {
        console.warn('Scrim');
      },
    }}
    isOpen={open}
  />
);

class TriggerComponent extends Component<> {
  constructor(props) {
    super(props);

    this.state = {
      dialogIsOpen: false,
    };
  }

  action = () => {
    this.setState({ dialogIsOpen: true });
  };

  render() {
    return (
      <View>
        <BpkButton onPress={this.action} title="Show dialog" />
        {generateBpkDialog(this.state.dialogIsOpen, [
          {
            text: 'Yes',
            type: BUTTON_TYPE.primary,
            callback: () => {
              console.warn('Action: Yes');
              this.setState({ dialogIsOpen: false });
            },
          },
          {
            text: 'No',
            type: BUTTON_TYPE.destructive,
            callback: () => {
              console.warn('Action: No');
              this.setState({ dialogIsOpen: false });
            },
          },
        ])}
      </View>
    );
  }
}

storiesOf('react-native-bpk-component-dialog', module)
  .addDecorator(CenterDecorator)
  .add('docs:single', () => <TriggerComponent />);
