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

import React, { useCallback } from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';

import { icons } from '../bpk-component-icon';
import BpkButton, { type BpkButtonProps } from '../bpk-component-button';
import CenterDecorator from '../../storybook/CenterDecorator';
import action from '../../storybook/addons/actions';

import BpkSnackbar, { SNACKBAR_LENGTHS, type BpkSnackbarOptions } from '.';

const styles = StyleSheet.create({
  btn: {
    marginBottom: spacingBase,
  },
});

type Props = {
  snackBar: BpkSnackbarOptions,
  showDismiss: boolean,
  button: $Shape<BpkButtonProps>,
};

const SnackbarContainer = ({ snackBar, showDismiss, button }: Props) => {
  const showSnackbar = useCallback(() => {
    BpkSnackbar.show(snackBar);
  }, [snackBar]);

  return (
    <View>
      <BpkButton
        style={styles.btn}
        title="Show"
        onPress={showSnackbar}
        {...button}
      />
      {showDismiss && (
        <BpkButton
          type="secondary"
          title="dismiss"
          onPress={() => BpkSnackbar.dismiss()}
        />
      )}
    </View>
  );
};

SnackbarContainer.defaultProps = {
  showDismiss: false,
  button: {},
};

storiesOf('bpk-component-snackbar', module)
  .addDecorator(CenterDecorator)
  .add('docs: default', () => (
    <SnackbarContainer
      snackBar={{
        text: 'Snackbar text',
      }}
    />
  ))
  .add('docs: with title and icon', () => (
    <SnackbarContainer
      snackBar={{
        text: 'Snackbar text',
        title: 'Title',
        icon: icons.flight,
      }}
    />
  ))
  .add('docs: action', () => (
    <SnackbarContainer
      snackBar={{
        text: 'Snackbar text',
        action: {
          text: 'Action',
          onPress: action('clicked'),
        },
      }}
    />
  ))
  .add('docs: icon action', () => (
    <SnackbarContainer
      snackBar={{
        text: 'Snackbar text',
        action: {
          icon: icons.close,
          accessibilityLabel: 'Close',
          onPress: action('clicked'),
        },
      }}
    />
  ))
  .add('dismiss', () => (
    <SnackbarContainer
      showDismiss
      snackBar={{
        text: 'Snackbar text',
        duration: SNACKBAR_LENGTHS.indefinite,
        action: {
          icon: icons.close,
          accessibilityLabel: 'Close',
          onPress: action('clicked'),
        },
      }}
    />
  ))
  .add('all durations', () => (
    <>
      {Object.keys(SNACKBAR_LENGTHS).map((duration) => (
        <SnackbarContainer
          key={SNACKBAR_LENGTHS[duration]}
          button={{ title: duration }}
          snackBar={{
            text: 'Snackbar text',
            duration: SNACKBAR_LENGTHS[duration],
            action: {
              icon: icons.close,
              accessibilityLabel: 'Close',
              onPress: action('clicked'),
            },
          }}
        />
      ))}
    </>
  ));
