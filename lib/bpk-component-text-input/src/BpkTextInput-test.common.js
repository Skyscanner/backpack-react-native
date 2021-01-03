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
import TestRenderer from 'react-test-renderer';
import { StyleSheet, View } from 'react-native';
import { spacingSm } from 'bpk-tokens/tokens/base.react.native';
import TinyMask from 'tinymask';

import BpkThemeProvider from '../../bpk-theming';
import { describeEachColorScheme } from '../../bpk-test-utils';

import BpkTextInput, { formatValue } from './BpkTextInput';

const commonTests = () => {
  describe('formatValue', () => {
    it('should not format anything when there is no mask', () => {
      const expected = 'Skyscanner';
      const actual = formatValue('Skyscanner', null, null);
      expect(actual).toEqual(expected);
    });

    it('should not format anything when the mask contains "*"', () => {
      const mask = '99*99';
      const expected = '12-34';
      const actual = formatValue('12-34', mask, new TinyMask(mask));
      expect(actual).toEqual(expected);
    });

    /* The value here simulates entering '1234-5678', then cursoring back
       and removing the '3'. It should be correctly re-masked to make '1245-678'.
    */
    it('should mask correctly when given an usual value to mask (1)', () => {
      const mask = '9999-9999';
      const expected = '1245-678';
      const actual = formatValue('124-5678', mask, new TinyMask(mask));
      expect(actual).toEqual(expected);
    });

    /* The value here simulates entering 'abcd-efgh', then cursoring back
       and removing the 'c'. It should be correctly re-masked to make 'abde-fgh'.
    */
    it('should mask correctly when given an usual value to mask (2)', () => {
      const mask = 'AAAA-AAAA';
      const expected = 'abde-fgh';
      const actual = formatValue('abd-efgh', mask, new TinyMask(mask));
      expect(actual).toEqual(expected);
    });

    /* The value here simulates entering '12ab-56cd', then cursoring back
       and removing the 'a'. It should be correctly re-masked to make '12b5-6cd'.
    */
    it('should mask correctly when given an usual value to mask (3)', () => {
      const mask = 'SSSS-SSSS';
      const expected = '12b5-6cd';
      const actual = formatValue('12b-56cd', mask, new TinyMask(mask));
      expect(actual).toEqual(expected);
    });
  });

  describe('BpkTextInput', () => {
    describeEachColorScheme(BpkTextInput, (WithColorScheme) => {
      it('should render correctly', () => {
        const testRenderer = TestRenderer.create(
          <WithColorScheme label="Name" value="" />,
        );

        expect(testRenderer.toJSON()).toMatchSnapshot();
      });

      it('should render correctly with arbitrary props', () => {
        const testRenderer = TestRenderer.create(
          <WithColorScheme label="Name" value="" testId="arbitrary" />,
        );

        expect(testRenderer.toJSON()).toMatchSnapshot();
      });

      it('should render correctly with custom style', () => {
        const styles = StyleSheet.create({
          custom: {
            marginLeft: spacingSm,
          },
        });

        const testRenderer = TestRenderer.create(
          <WithColorScheme label="Name" value="" style={styles.custom} />,
        );

        expect(testRenderer.toJSON()).toMatchSnapshot();
      });

      it('should render correctly with value', () => {
        const testRenderer = TestRenderer.create(
          <WithColorScheme label="Name" value="Joe" />,
        );

        expect(testRenderer.toJSON()).toMatchSnapshot();
      });

      it('should render correctly with description', () => {
        const testRenderer = TestRenderer.create(
          <WithColorScheme
            label="Name"
            description="Who loves orange soda?"
            value="Kel loves orange soda"
          />,
        );

        expect(testRenderer.toJSON()).toMatchSnapshot();
      });

      it('should render correctly with description, valid=false and a validationMessage', () => {
        const testRenderer = TestRenderer.create(
          <WithColorScheme
            label="Name"
            description="Who loves orange soda?"
            value="Somebody other than Kel loves orange soda"
            valid={false}
            validationMessage="Nope"
          />,
        );

        expect(testRenderer.toJSON()).toMatchSnapshot();
      });

      it('should render correctly with valid', () => {
        const testRenderer = TestRenderer.create(
          <WithColorScheme label="Name" value="" valid />,
        );

        expect(testRenderer.toJSON()).toMatchSnapshot();
      });

      it('should render correctly with valid false', () => {
        const testRenderer = TestRenderer.create(
          <WithColorScheme label="Name" value="" valid={false} />,
        );

        expect(testRenderer.toJSON()).toMatchSnapshot();
      });

      it('should render correctly with valid false and a validation message', () => {
        const testRenderer = TestRenderer.create(
          <WithColorScheme
            label="Name"
            value=""
            valid={false}
            validationMessage="Nope"
          />,
        );

        expect(testRenderer.toJSON()).toMatchSnapshot();
      });

      it('should render correctly with editable=false', () => {
        const testRenderer = TestRenderer.create(
          <WithColorScheme label="Name" value="" editable={false} />,
        );

        expect(testRenderer.toJSON()).toMatchSnapshot();
      });

      it('should render correctly with inputRef set', () => {
        let inputRef = null; // eslint-disable-line no-unused-vars
        const testRenderer = TestRenderer.create(
          <WithColorScheme
            label="Name"
            value=""
            inputRef={(ref) => {
              inputRef = ref;
            }}
          />,
        );

        expect(testRenderer.toJSON()).toMatchSnapshot();
      });

      it('should ignore when placeholder is provided, as element is not focused', () => {
        const testRenderer = TestRenderer.create(
          <WithColorScheme label="Name" value="" placeholder="Placeholder" />,
        );

        expect(testRenderer.toJSON()).toMatchSnapshot();
      });

      it('should render correctly with `accessoryView`', () => {
        const testRenderer = TestRenderer.create(
          <WithColorScheme label="Name" value="" accessoryView={<View />} />,
        );

        expect(testRenderer.toJSON()).toMatchSnapshot();
      });

      it('should render correctly with mask="99/99"', () => {
        const testRenderer = TestRenderer.create(
          <WithColorScheme label="Name" value="1234" mask="99/99" />,
        );

        expect(testRenderer.toJSON()).toMatchSnapshot();
      });

      it('should render correctly with mask="9999-9999-9999-9999"', () => {
        const testRenderer = TestRenderer.create(
          <WithColorScheme
            label="Name"
            value="1234123412341234"
            mask="9999-9999-9999-9999"
          />,
        );

        expect(testRenderer.toJSON()).toMatchSnapshot();
      });

      it('should support theming', () => {
        const theme = {
          textInputFocusedColor: 'green',
        };
        const testRenderer = TestRenderer.create(
          <BpkThemeProvider theme={theme}>
            <WithColorScheme label="Name" value="" />
          </BpkThemeProvider>,
        );
        expect(testRenderer.toJSON()).toMatchSnapshot();
      });

      it('should support font theming', () => {
        const theme = {
          textFontFamily: 'relative',
        };
        const testRenderer = TestRenderer.create(
          <BpkThemeProvider theme={theme}>
            <WithColorScheme label="Name" value="" />
          </BpkThemeProvider>,
        );
        expect(testRenderer.toJSON()).toMatchSnapshot();
      });
    });
  });
};

// eslint-disable-next-line jest/no-export
export default commonTests;
