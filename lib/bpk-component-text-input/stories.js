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

import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import {
  lineColor,
  backgroundSecondaryColor,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';

import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../bpk-appearance';
import BpkThemeProvider from '../bpk-theming';
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

const StatefulBpkTextInput = (props: {
  initialValue: string,
  label: string,
}) => {
  const [value, setValue] = useState(props.initialValue);
  const onChange = (newValue) => {
    setValue(newValue);
  };
  return <BpkTextInput {...props} value={value} onChangeText={onChange} />;
};

storiesOf('bpk-component-text-input', module)
  .addDecorator(CenterDecorator)
  .add('docs:text-inputs', () => {
    const styles = useBpkDynamicStyleSheet(dynamicStyles);
    return (
      <ScrollView>
        <StatefulBpkTextInput
          label="Input"
          initialValue=""
          style={styles.input}
          placeholder="3 letter airport code"
        />
        <StatefulBpkTextInput
          label="Input with value and description"
          initialValue="Edinburgh"
          description="Enter your destination."
          style={styles.input}
        />
        <StatefulBpkTextInput
          label="Input with multiline value"
          initialValue="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
          multiline
          style={styles.input}
          autoGrow
        />
        <StatefulBpkTextInput
          label="Valid input"
          initialValue="Edinburgh"
          valid
          style={styles.input}
        />
        <StatefulBpkTextInput
          label="Invalid input"
          initialValue="Edinbvrgh"
          valid={false}
          validationMessage="'Edinbvrgh' is not a valid city."
          style={styles.input}
        />
        <StatefulBpkTextInput
          label="Non-editable input"
          initialValue=""
          editable={false}
          style={styles.input}
        />
        <StatefulBpkTextInput
          label="Password"
          initialValue="letmein"
          secureTextEntry
          style={styles.input}
        />
        <StatefulBpkTextInput
          label="Phone number"
          initialValue="+441234567890"
          keyboardType="phone-pad"
          style={styles.input}
        />
        <StatefulBpkTextInput
          label="Input with date mask"
          initialValue=""
          mask="99/99"
          maxLength={5}
          style={styles.input}
        />
        <StatefulBpkTextInput
          label="Input with card number mask"
          initialValue=""
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
          initialValue=""
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
  .add('Themed', () => {
    const styles = useBpkDynamicStyleSheet(dynamicStyles);
    return (
      <BpkThemeProvider theme={themeAttributes}>
        <ScrollView>
          <StatefulBpkTextInput
            label="Input"
            initialValue=""
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
