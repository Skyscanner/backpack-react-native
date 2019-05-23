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
import type { Props } from './index';

const dialogTitle = 'Backpack Dialog';

const dialogDescription =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et luctus sem, quis pharetra lacus.';

const dialogIcon = {
  iconId: 'bpk_tick',
  iconColor: 'bpkGreen500',
};

const defaultScrimAction = {
  enabled: true,
  callback: () => console.warn('Scrim action'),
};

const positiveAction = {
  text: 'Yes',
  type: BUTTON_TYPE.primary,
  callback: () => console.warn('Action: Yes'),
};

const negativeAction = {
  text: 'No',
  type: BUTTON_TYPE.destructive,
  callback: () => console.warn('Action: No'),
};

class TriggerDialogComponent extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      title: props.title,
      description: props.description,
      icon: props.icon,
      actions: props.actions,
      scrimAction: props.scrimAction,
      isOpen: false,
    };
  }

  openDialog = () => this.setState({ isOpen: true });

  render() {
    const { type, title, description, icon, isOpen } = this.state;

    let actions = [];
    if (this.state.actions) {
      actions = this.state.actions.map(action => ({
        text: action.text,
        type: action.type,
        callback: () => {
          action.callback();
          this.setState({ isOpen: false });
        },
      }));
    }

    let scrimAction = null;
    if (this.state.scrimAction) {
      scrimAction = {
        enabled: this.state.scrimAction.enabled,
        callback: () => {
          this.state.scrimAction.callback();
          this.setState({ isOpen: false });
        },
      };
    }

    return (
      <View>
        <BpkButton onPress={this.openDialog} title="Show dialog" />
        <BpkDialog
          dialogType={type}
          title={title}
          description={description}
          icon={icon}
          actions={actions}
          scrimAction={scrimAction}
          isOpen={isOpen}
        />
      </View>
    );
  }
}

const generateAction = (buttonType: BUTTON_TYPE) => ({
  text: `${buttonType} action`,
  type: buttonType,
  callback: () => console.warn(buttonType),
});

storiesOf('react-native-bpk-component-dialog', module)
  .addDecorator(CenterDecorator)
  .add('docs:simple', () => (
    <TriggerDialogComponent
      type={DIALOG_TYPE.alert}
      title={dialogTitle}
      description={dialogDescription}
      icon={dialogIcon}
      actions={[positiveAction]}
    />
  ))
  .add('docs:option', () => (
    <TriggerDialogComponent
      type={DIALOG_TYPE.alert}
      title={dialogTitle}
      description={dialogDescription}
      icon={dialogIcon}
      actions={[positiveAction, negativeAction]}
    />
  ))
  .add('docs:only-title', () => (
    <TriggerDialogComponent
      type={DIALOG_TYPE.alert}
      title={dialogTitle}
      scrimAction={defaultScrimAction}
    />
  ))
  .add('docs:bottom', () => (
    <TriggerDialogComponent
      type={DIALOG_TYPE.bottomSheet}
      title={dialogTitle}
      description={dialogDescription}
      icon={dialogIcon}
      actions={[positiveAction, negativeAction]}
      scrimAction={defaultScrimAction}
    />
  ))
  .add('docs:all-buttons', () => (
    <TriggerDialogComponent
      type={DIALOG_TYPE.bottomSheet}
      title={dialogTitle}
      description={dialogDescription}
      icon={dialogIcon}
      actions={[
        generateAction(BUTTON_TYPE.primary),
        generateAction(BUTTON_TYPE.secondary),
        generateAction(BUTTON_TYPE.featured),
        generateAction(BUTTON_TYPE.destructive),
      ]}
      scrimAction={defaultScrimAction}
    />
  ));
