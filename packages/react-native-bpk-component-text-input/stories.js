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

import React, { Component, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import {
  lineColor,
  backgroundSecondaryColor,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';
import BpkThemeProvider from 'react-native-bpk-theming';
import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from 'react-native-bpk-appearance';

import CenterDecorator from '../../storybook/CenterDecorator';
import themeAttributes from '../../storybook/themeAttributes';

import BpkTextInput from './index';

const dynamicStyles = BpkDynamicStyleSheet.create({
  input: {
    marginBottom: spacingBase,
  },
  accessoryView: {
    flex: 0.3,
    backgroundColor: backgroundSecondaryColor,
    borderColor: lineColor,
    borderWidth: 1, // eslint-disable-line backpack/use-tokens
  },
});

class StatefulBpkTextInput extends Component<
  { initialValue: string | typeof undefined, label: string },
  { value: string | typeof undefined },
> {
  static propTypes = {
    initialValue: PropTypes.string,
  };

  static defaultProps = {
    initialValue: undefined,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.initialValue,
    };
  }

  onChange = value => {
    this.setState(() => ({ value }));
  };

  render() {
    return (
      <BpkTextInput
        {...this.props}
        value={this.state.value}
        onChangeText={this.onChange}
      />
    );
  }
}

storiesOf('react-native-bpk-component-text-input', module)
  .addDecorator(CenterDecorator)
  .add('docs:text-inputs', () => {
    const styles = useBpkDynamicStyleSheet(dynamicStyles);
    return (
      <ScrollView>
        <StatefulBpkTextInput
          onChange={action('changed')}
          label="Input"
          style={styles.input}
          placeholder="3 letter airport code"
        />
        <StatefulBpkTextInput
          onChange={action('changed')}
          label="Input with value and description"
          initialValue="Edinburgh"
          description="Enter your destination."
          style={styles.input}
        />
        <StatefulBpkTextInput
          onChange={action('changed')}
          label="Input with multiline value"
          initialValue="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." // eslint-disable-line max-len
          multiline
          style={styles.input}
          autoGrow
        />
        <StatefulBpkTextInput
          onChange={action('changed')}
          label="Valid input"
          valid
          style={styles.input}
        />
        <StatefulBpkTextInput
          onChange={action('changed')}
          label="Invalid input"
          initialValue="Edinbvrgh"
          valid={false}
          validationMessage="'Edinbvrgh' is not a valid city."
          style={styles.input}
        />
        <StatefulBpkTextInput
          onChange={action('changed')}
          label="Non-editable input"
          editable={false}
          style={styles.input}
        />
        <StatefulBpkTextInput
          onChange={action('changed')}
          label="Password"
          initialValue="letmein"
          secureTextEntry
          style={styles.input}
        />
        <StatefulBpkTextInput
          onChange={action('changed')}
          label="Phone number"
          initialValue="+441234567890"
          keyboardType="phone-pad"
          style={styles.input}
        />
        <StatefulBpkTextInput
          onChange={action('changed')}
          label="Input with date mask"
          mask="99/99"
          maxLength={5}
          style={styles.input}
        />
        <StatefulBpkTextInput
          onChange={action('changed')}
          label="Input with card number mask"
          mask="9999-9999-9999-9999"
          maxLength={19}
          style={styles.input}
        />
      </ScrollView>
    );
  })
  .add('docs:text-inputs-with-accessory-view', () => {
    const styles = useBpkDynamicStyleSheet(dynamicStyles);
    return (
      <ScrollView>
        <StatefulBpkTextInput
          label="Phone number"
          initialValue="+441234567890"
          keyboardType="phone-pad"
          style={styles.input}
          accessoryView={<View style={styles.accessoryView} />}
        />
        <StatefulBpkTextInput
          label="Phone number"
          keyboardType="phone-pad"
          style={styles.input}
          placeholder="E.g. 1234567890"
          accessoryView={<View style={styles.accessoryView} />}
        />
        <StatefulBpkTextInput
          label="Invalid input"
          initialValue="ashdk"
          valid={false}
          validationMessage="Invalid phone number."
          style={styles.input}
          accessoryView={<View style={styles.accessoryView} />}
        />
      </ScrollView>
    );
  })
  .add('With forced value', () => {
    const [value, setValue] = useState('');
    const onChange = useCallback((e: any) => {
      const { text } = e.nativeEvent;
      if (!text || text.length === 0) {
        setValue('');
      } else {
        setValue(text.replace(/./g, '*'));
      }
    }, []);
    const styles = useBpkDynamicStyleSheet(dynamicStyles);

    return (
      <BpkTextInput
        label="Hidden input"
        style={styles.input}
        value={value}
        onChange={onChange}
      />
    );
  })
  .add('Uncontrolled', () => {
    const styles = useBpkDynamicStyleSheet(dynamicStyles);
    return (
      <BpkTextInput
        label="Uncontrolled"
        style={[styles.input]}
        onChange={action('changed')}
      />
    );
  })
  .add('Themed', () => {
    const styles = useBpkDynamicStyleSheet(dynamicStyles);
    return (
      <BpkThemeProvider theme={themeAttributes}>
        <ScrollView>
          <StatefulBpkTextInput
            label="Input"
            style={styles.input}
            placeholder="3 letter airport code"
          />
          <StatefulBpkTextInput
            label="Invalid input"
            initialValue="Edinbvrgh"
            valid={false}
            validationMessage="'Edinbvrgh' is not a valid city."
            style={styles.input}
          />
        </ScrollView>
      </BpkThemeProvider>
    );
  });
