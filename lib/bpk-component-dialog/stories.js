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
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import BpkButton from '../bpk-component-button';
import { icons } from '../bpk-component-icon';
import BpkText from '../bpk-component-text';
import {
  BpkAppearanceConsumer,
  unpackBpkDynamicValue,
} from '../bpk-appearance';
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
  iconColor: 'colorMonteverde',
};

const destructiveIcon = {
  iconId: icons.trash,
  iconColor: 'colorPanjin',
};

const defaultScrimAction = {
  enabled: true,
  callback: () => {},
};

const disabledScrimAction = {
  enabled: false,
  callback: () => {},
};

type DialogState = {
  text: string,
  isOpen: boolean,
  actions: Array<ActionButton>,
  scrimAction: ScrimAction,
};

class TriggerDialogComponent extends Component<BpkDialogProps, DialogState> {
  constructor(props) {
    super(props);

    this.state = {
      actions: props.actions,
      scrimAction: props.scrimAction,
      isOpen: false,
      text: 'No action',
    };
  }

  openDialog = () => this.setState({ isOpen: true });

  render() {
    const { text, isOpen } = this.state;
    const { icon, dialogType, title, description } = this.props;

    let actions: Array<ActionButton> = [];
    if (this.state.actions) {
      actions = this.state.actions.map((action) => ({
        text: action.text,
        type: action.type,
        callback: () => {
          this.setState({
            isOpen: false,
            text: `Action: ${action.text}`,
          });
        },
      }));
    }

    const scrimAction: ScrimAction = {
      enabled: this.state.scrimAction.enabled,
      callback: () => {
        this.setState({
          isOpen: false,
          text: 'Scrim action',
        });
      },
    };

    return (
      <View>
        <BpkText>{text}</BpkText>
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
  callback: () => {},
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

storiesOf('bpk-component-dialog', module)
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
  .add('docs:no-scrim-action', () => (
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
  ))
  .add('dynamic-color', () => (
    <BpkAppearanceConsumer>
      {({ bpkAppearance }) => {
        const icon = {
          iconId: icons.trash,
          iconColor: unpackBpkDynamicValue(
            { light: 'colorPanjin', dark: 'colorMonteverde' },
            bpkAppearance,
          ),
        };
        return (
          <TriggerDialogComponent
            dialogType={DIALOG_TYPE.alert}
            title={dialogTitle}
            description={dialogDescription}
            icon={icon}
            actions={simpleAction}
            scrimAction={defaultScrimAction}
            isOpen
          />
        );
      }}
    </BpkAppearanceConsumer>
  ));
