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
import BpkThemeProvider from '../../bpk-theming';
import { describeEachColorScheme } from '../../bpk-test-utils';

import BpkChip from './BpkChip';
import { CHIP_TYPES } from './common-types';

const commonTests = () => {
  const onPress = jest.fn();

  describe('BpkChip', () => {
    describeEachColorScheme(BpkChip, (WithColorScheme) => {
      it('should render correctly', () => {
        const tree = renderer
          .create(
            <WithColorScheme
              label="Label"
              accessibilityLabel="Accessibility label"
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
              accessibilityLabel="Accessibility label"
              onPress={onPress}
              type={CHIP_TYPES.outline}
            />,
          )
          .toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('should render correctly with "selected"', () => {
        const tree = renderer
          .create(
            <WithColorScheme
              selected
              label="Label"
              accessibilityLabel="Accessibility label"
              onPress={onPress}
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
              accessibilityLabel="Accessibility label"
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
      });

      const tree = renderer
        .create(
          <BpkChip
            onPress={onPress}
            label="Label"
            accessibilityLabel="Accessibility label"
            style={styles.custom}
          />,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with arbitrary props', () => {
      const tree = renderer
        .create(
          <BpkChip
            onPress={onPress}
            label="Label"
            accessibilityLabel="Accessibility label"
            testID="123" // <- Arbitrary prop.
          />,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with leadingAccessoryView', () => {
      const tree = renderer
        .create(
          <BpkChip
            onPress={onPress}
            label="Label"
            accessibilityLabel="Accessibility label"
            leadingAccessoryView={<BpkIcon icon={icons.flight} />}
          />,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with trailingAccessoryView', () => {
      const tree = renderer
        .create(
          <BpkChip
            onPress={onPress}
            label="Label"
            accessibilityLabel="Accessibility label"
            trailingAccessoryView={<BpkIcon icon={icons.flight} />}
          />,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should support theming when selected', () => {
      const theme = {
        chipSelectedBackgroundColor: 'red',
        chipSelectedTextColor: 'yellow',
        chipOutlineSelectedBackgroundColor: 'orange',
        chipOutlineSelectedTextColor: 'blue',
        textFontFamily: 'relative',
        colorSkyGrayTint04: '#B3BABD',
        colorSkyGrayTint02: '#657176',
        colorSkyGrayTint01: '#4B5458',
      };
      const tree = renderer
        .create(
          <BpkThemeProvider theme={theme}>
            <BpkChip
              selected
              label="Label"
              accessibilityLabel="Accessibility label"
              onPress={onPress}
            />
          </BpkThemeProvider>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
};

// eslint-disable-next-line jest/no-export
export default commonTests;
