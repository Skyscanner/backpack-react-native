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
import { Image, Modal, StyleSheet, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import {
  spacingBase,
  backgroundColor,
} from 'bpk-tokens/tokens/base.react.native';
import { useBpkDynamicValue } from 'react-native-bpk-appearance';

import CenterDecorator from '../../storybook/CenterDecorator';

import { type Id, type Code } from './src/common-types';
import BpkPhoneNumberInput, {
  type Props,
  propTypes as phoneNumberInputPropTypes,
} from './src/BpkPhoneNumberInput';

import { BpkDialingCodeList } from './index';

const styles = StyleSheet.create({
  fullOuter: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: spacingBase,
  },
});

const { value: _ignored, ...propTypes } = phoneNumberInputPropTypes;

class StatefulBpkPhoneNumberInput extends Component<
  {
    initialValue: string,
    label: string,
    ...$Exact<$Diff<Props, { value: string }>>,
  },
  { value: string },
> {
  static propTypes = {
    ...propTypes,
    initialValue: PropTypes.string.isRequired,
  };

  static defaultProps = BpkPhoneNumberInput.defaultProps;

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
      <BpkPhoneNumberInput
        {...this.props}
        value={this.state.value}
        onChangeText={this.onChange}
      />
    );
  }
}

// Sample dialing codes, with some long ones to demonstrate how the
// component handles them.
const codes = [
  { id: 'DZ', dialingCode: '+213', name: 'Algeria' },
  { id: 'AD', dialingCode: '+376', name: 'Andorra' },
  { id: 'AU', dialingCode: '+61', name: 'Australia' },
  { id: 'BE', dialingCode: '+32', name: 'Belgium' },
  { id: 'CA', dialingCode: '+1', name: 'Canada' },
  { id: 'CD', dialingCode: '+243', name: 'Democratic Republic of the Congo' },
  { id: 'EG', dialingCode: '+20', name: 'Egypt' },
  { id: 'IS', dialingCode: '+354', name: 'Iceland' },
  {
    id: 'IPTCS',
    dialingCode: '+991',
    name:
      'International Telecommunications Public Correspondence Service trial (IPTCS)',
  },
  { id: 'IT', dialingCode: '+39', name: 'Italy' },
  { id: 'JP', dialingCode: '+81', name: 'Japan' },
  {
    id: 'VC',
    dialingCode: '+1784',
    name: 'Saint Vincent and the Grenadines',
  },
  { id: 'SE', dialingCode: '+46', name: 'Sweden' },
  { id: 'GB', dialingCode: '+44', name: 'United Kingdom' },
  { id: 'VI', dialingCode: '+1340', name: 'United States Virgin Islands' },
  { id: 'WK', dialingCode: '+99', name: 'Wakanda' },
];

const getFlagUriFromCountryCode = countryCode =>
  `https://images.skyscnr.com/images/country/flag/header/${countryCode.toLowerCase()}.png`;

// eslint-disable-next-line react/no-multi-comp
class StatefulBpkDialingCodeList extends React.Component<
  {},
  {
    selectedId: ?Id,
  },
> {
  constructor() {
    super();
    this.state = { selectedId: 'AU' };
  }

  render() {
    return (
      <BpkDialingCodeList
        dialingCodes={codes}
        selectedId={this.state.selectedId}
        onItemPress={item => {
          action(`${item.name} selected`);
          this.setState({ selectedId: item.id });
        }}
        renderFlag={item => (
          <Image // eslint-disable-line backpack/use-components
            source={{ uri: getFlagUriFromCountryCode(item.id) }}
          />
        )}
      />
    );
  }
}

type FullyIntegratedProps = {
  initiallySelectedId: Id,
  codes: Array<Code>,
};

// eslint-disable-next-line react/no-multi-comp
const FullyIntegrated = (props: FullyIntegratedProps) => {
  const [selectedId, setSelectedId] = useState(props.initiallySelectedId);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const onPhoneNumberChange = useCallback((value: string) => {
    setPhoneNumber(value);
  }, []);

  const onItemPicked = useCallback((item: Code) => {
    setPickerOpen(false);
    setSelectedId(item.id);
  }, []);

  const openPicker = useCallback(() => {
    setPickerOpen(true);
  }, []);

  const closePicker = useCallback(() => {
    setPickerOpen(false);
  }, []);

  const renderFlag = useCallback(
    item => (
      // eslint-disable-next-line backpack/use-components
      <Image source={{ uri: getFlagUriFromCountryCode(item.id) }} />
    ),
    [],
  );

  const modalBackground = useBpkDynamicValue(backgroundColor);

  return (
    <View style={styles.fullOuter}>
      <Modal
        visible={pickerOpen}
        animationType="slide"
        onRequestClose={closePicker}
      >
        <View style={{ backgroundColor: modalBackground }}>
          <BpkDialingCodeList
            dialingCodes={props.codes}
            onItemPress={onItemPicked}
            renderFlag={renderFlag}
            selectedId={selectedId}
          />
        </View>
      </Modal>
      <BpkPhoneNumberInput
        label="Phone number"
        value={phoneNumber}
        onDialingCodePress={openPicker}
        // $FlowFixMe, because this is a story :/
        dialingCode={props.codes.find(code => code.id === selectedId)}
        renderFlag={renderFlag}
        onChangeText={onPhoneNumberChange}
      />
    </View>
  );
};

storiesOf('react-native-bpk-component-phone-input/Integrated', module).add(
  'Full component example',
  () => <FullyIntegrated initiallySelectedId="CA" codes={codes} />,
);

storiesOf(
  'react-native-bpk-component-phone-input/BpkDialingCodeList',
  module,
).add('docs:dialing-code-list', () => <StatefulBpkDialingCodeList />);

storiesOf(
  'react-native-bpk-component-phone-input/BpkDialingCodeListItem',
  module,
);

storiesOf('react-native-bpk-component-phone-input/BpkPhoneNumberInput', module)
  .addDecorator(CenterDecorator)
  .add('docs:phone-number-input', () => (
    <StatefulBpkPhoneNumberInput
      placeholder="4XX XXX XXX"
      label="Phone number"
      initialValue=""
      keyboardType="phone-pad"
      dialingCode={{ dialingCode: '+61', id: 'au', name: 'Australia' }}
      renderFlag={() => (
        <Image // eslint-disable-line backpack/use-components
          source={{ uri: getFlagUriFromCountryCode('AU') }}
        />
      )}
      onDialingCodePress={action('Dialing code pressed')}
    />
  ))
  .add('non-editable', () => (
    <StatefulBpkPhoneNumberInput
      label="Phone number"
      initialValue=""
      keyboardType="phone-pad"
      dialingCode={{ dialingCode: '+61', id: 'au', name: 'Australia' }}
      renderFlag={() => (
        <Image // eslint-disable-line backpack/use-components
          source={{ uri: getFlagUriFromCountryCode('AU') }}
        />
      )}
      editable={false}
      onDialingCodePress={action('Dialing code pressed')}
    />
  ));
