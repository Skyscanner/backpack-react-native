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

import React from 'react';
import { StyleSheet } from 'react-native';
import renderer from 'react-test-renderer';

import BpkIcon, { icons } from '../../bpk-component-icon';
import { describeEachColorScheme } from '../../bpk-test-utils';

import BpkDismissibleChip from './BpkDismissibleChip';
import { CHIP_TYPES } from './common-types';

const commonTests = () => {
  const onPress = jest.fn();

  describe('BpkDismissibleChip', () => {
    describeEachColorScheme(BpkDismissibleChip, (WithColorScheme) => {
      it('should render correctly', () => {
        const tree = renderer
          .create(
            <WithColorScheme
              label="Label"
              accessibilityLabel="Dismiss"
              onPress={onPress}
            />,
          )
          .toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('should render outline correctly', () => {
        const tree = renderer
          .create(
            <WithColorScheme
              label="Label"
              accessibilityLabel="Dismiss"
              onPress={onPress}
              type={CHIP_TYPES.outline}
            />,
          )
          .toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('should render correctly with "disabled"', () => {
        const tree = renderer
          .create(
            <WithColorScheme
              disabled
              label="Label"
              accessibilityLabel="Dismiss"
              onPress={onPress}
            />,
          )
          .toJSON();

        expect(tree).toMatchSnapshot();
      });
    });

    it('should render correctly with custom style', () => {
      const styles = StyleSheet.create({
        custom: {
          flex: 1,
        },
        innerCustom: {
          // eslint-disable-next-line backpack/use-tokens
          backgroundColor: 'red',
        },
      });

      const tree = renderer
        .create(
          <BpkDismissibleChip
            accessibilityLabel="Dismiss"
            onPress={onPress}
            label="Label"
            style={styles.custom}
            innerChipStyle={styles.innerCustom}
          />,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with arbitrary props', () => {
      const tree = renderer
        .create(
          <BpkDismissibleChip
            onPress={onPress}
            label="Label"
            accessibilityLabel="Dismiss"
            testID="123" // <- Arbitrary prop.
          />,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with a supplied icon', () => {
      const tree = renderer
        .create(
          <BpkDismissibleChip
            onPress={onPress}
            label="Label"
            accessibilityLabel="Dismiss"
            leadingAccessoryView={<BpkIcon icon={icons.flight} />}
          />,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
};

// eslint-disable-next-line jest/no-export
export default commonTests;
