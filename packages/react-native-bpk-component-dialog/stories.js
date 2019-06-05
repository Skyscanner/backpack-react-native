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
import { icons } from 'react-native-bpk-component-icon';

import CenterDecorator from '../../storybook/CenterDecorator';

import BpkDialog, { DIALOG_TYPE, BUTTON_TYPE } from './index';
import type {
  BpkDialogProps,
  ButtonType,
  ActionButton,
  ScrimAction,
} from './index';

const dialogTitle = 'Backpack Dialog';

const dialogDescription =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et luctus sem, quis pharetra lacus.';

const dialogIcon = {
  iconId: icons.tick,
  iconColor: 'bpkGreen500',
};

const destructiveIcon = {
  iconId: icons.trash,
  iconColor: 'bpkRed500',
};

const defaultScrimAction = {
  enabled: true,
  callback: () => console.warn('Scrim action'),
};

const disabledScrimAction = {
  enabled: false,
  callback: () => {},
};

type DialogState = BpkDialogProps;

class TriggerDialogComponent extends Component<BpkDialogProps, DialogState> {
  constructor(props) {
    super(props);

    this.state = {
      dialogType: props.type,
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
    const { dialogType, title, description, icon, isOpen } = this.state;

    let actions: Array<ActionButton> = [];
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

    const scrimAction: ScrimAction = {
      enabled: this.state.scrimAction.enabled,
      callback: () => {
        if (this.state.scrimAction) {
          this.state.scrimAction.callback();
        }
        this.setState({ isOpen: false });
      },
    };

    return (
      <View>
        <BpkButton onPress={this.openDialog} title="Show dialog" />
        <BpkDialog
          dialogType={dialogType}
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

const generateAction = (buttonType: ButtonType) => ({
  text: `${buttonType} action`,
  type: buttonType,
  callback: () => console.warn(buttonType),
});

const simpleAction: Array<ActionButton> = [
  generateAction(BUTTON_TYPE.primary),
  generateAction(BUTTON_TYPE.destructive),
];

const allActions: Array<ActionButton> = [
  generateAction(BUTTON_TYPE.primary),
  generateAction(BUTTON_TYPE.secondary),
  generateAction(BUTTON_TYPE.featured),
  generateAction(BUTTON_TYPE.destructive),
];

storiesOf('react-native-bpk-component-dialog', module)
  .addDecorator(CenterDecorator)
  .add('docs:simple', () => (
    <TriggerDialogComponent
      dialogType={DIALOG_TYPE.alert}
      title={dialogTitle}
      description={dialogDescription}
      icon={dialogIcon}
      actions={[generateAction(BUTTON_TYPE.primary)]}
      scrimAction={defaultScrimAction}
      isOpen
    />
  ))
  .add('docs:option', () => (
    <TriggerDialogComponent
      dialogType={DIALOG_TYPE.alert}
      title={dialogTitle}
      description={dialogDescription}
      icon={destructiveIcon}
      actions={simpleAction}
      scrimAction={defaultScrimAction}
      isOpen
    />
  ))
  .add('docs:no-scrim', () => (
    <TriggerDialogComponent
      dialogType={DIALOG_TYPE.alert}
      title={dialogTitle}
      description={dialogDescription}
      icon={destructiveIcon}
      actions={simpleAction}
      scrimAction={disabledScrimAction}
      isOpen
    />
  ))
  .add('docs:only-title', () => (
    <TriggerDialogComponent
      dialogType={DIALOG_TYPE.alert}
      title={dialogTitle}
      description={null}
      icon={dialogIcon}
      scrimAction={defaultScrimAction}
      actions={[]}
      isOpen
    />
  ))
  .add('docs:bottom', () => (
    <TriggerDialogComponent
      dialogType={DIALOG_TYPE.bottomSheet}
      title={dialogTitle}
      description={dialogDescription}
      icon={dialogIcon}
      actions={simpleAction}
      scrimAction={defaultScrimAction}
      isOpen
    />
  ))
  .add('docs:all-buttons', () => (
    <TriggerDialogComponent
      dialogType={DIALOG_TYPE.bottomSheet}
      title={dialogTitle}
      description={dialogDescription}
      icon={dialogIcon}
      actions={allActions}
      scrimAction={defaultScrimAction}
      isOpen
    />
  ));
