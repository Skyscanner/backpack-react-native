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
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react-native';
import {
  colorMonteverde,
  spacingBase,
  spacingMd,
} from 'bpk-tokens/tokens/base.react.native';

import BpkButton from '../bpk-component-button';
import CenterDecorator from '../../storybook/CenterDecorator';

import { type PickerValue } from './src/common-types';

import BpkPicker, { BpkPickerItem } from './index';

const styles = StyleSheet.create({
  picker: {
    marginBottom: spacingBase,
  },
  triggerElementWithPrice: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceText: {
    color: colorMonteverde,
    paddingRight: spacingMd,
  },
});

type Props = {
  disabled: boolean,
  selectedValue: PickerValue,
  style: ?any,
};

type State = {
  isOpen: boolean,
  value: PickerValue,
};

class StatefulBpkPicker extends Component<Props, State> {
  static propTypes = {
    disabled: PropTypes.bool,
    selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: ViewPropTypes.style,
  };

  static defaultProps = {
    disabled: false,
    selectedValue: null,
    style: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      value: props.selectedValue,
    };
  }

  openPicker = () => {
    this.setState({ isOpen: true });
  };

  closePicker = () => {
    this.setState({ isOpen: false });
  };

  updateValue = (value) => {
    this.setState({ value });
  };

  render() {
    const { disabled, selectedValue, style, ...rest } = this.props;
    const data = {
      // $FlowFixMe because this is just a story
      1: 'Option 1',
      // $FlowFixMe because this is just a story
      2: 'Option 2',
      // $FlowFixMe because this is just a story
      3: 'Option 3',
      // $FlowFixMe because this is just a story
      4: 'Option 4',
      // $FlowFixMe because this is just a story
      5: 'Option 5',
      // $FlowFixMe because this is just a story
      6: 'Option 6',
      // $FlowFixMe because this is just a story
      7: 'Option 7',
      // $FlowFixMe because this is just a story
      8: 'Option 8',
    };
    return (
      <View style={style}>
        <BpkButton
          onPress={this.openPicker}
          title={
            this.state.value && data[this.state.value]
              ? `Selected: ${data[this.state.value]}`
              : 'Open picker'
          }
        />
        <BpkPicker
          isOpen={this.state.isOpen}
          onClose={this.closePicker}
          selectedValue={this.state.value}
          onValueChange={this.updateValue}
          doneLabel="Done"
          {...rest}
        >
          <BpkPickerItem label="Choose an option" />
          {Object.keys(data).map((key) => (
            <BpkPickerItem key={key} value={key} label={data[key]} />
          ))}
        </BpkPicker>
      </View>
    );
  }
}

storiesOf('bpk-component-picker', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => (
    <View>
      <StatefulBpkPicker style={styles.picker} />
    </View>
  ))
  .add('picker-closed', () => (
    <View>
      <StatefulBpkPicker style={styles.picker} />
    </View>
  ));
