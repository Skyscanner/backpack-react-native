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

import React from 'react';
import renderer from 'react-test-renderer';
import BpkThemeProvider from 'react-native-bpk-theming';
import { spacingSm } from 'bpk-tokens/tokens/base.react.native';
import BpkText from 'react-native-bpk-component-text';
import { describeEachColorScheme } from 'react-native-bpk-test-utils';

import BpkButton from './BpkButton';
import { BUTTON_TYPES, ICON_ALIGNMENTS } from './common-types';

const onPressFn = jest.fn();

const commonTests = () => {
  jest.mock('Text', () => 'Text');

  describe('BpkButton', () => {
    describeEachColorScheme(BpkButton, BpkButtonWithColorScheme => {
      it('should render correctly', () => {
        const tree = renderer
          .create(
            <BpkButtonWithColorScheme
              title="Lorem ipsum"
              onPress={onPressFn}
            />,
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should support the "disabled" property', () => {
        const tree = renderer
          .create(
            <BpkButtonWithColorScheme
              disabled
              title="Lorem ipsum"
              onPress={onPressFn}
            />,
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should support overwriting styles', () => {
        const tree = renderer
          .create(
            <BpkButtonWithColorScheme
              title="Lorem ipsum"
              onPress={onPressFn}
              style={{ width: spacingSm }}
            />,
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      Object.keys(BUTTON_TYPES).forEach(buttonType => {
        it(`should render correctly with type="${buttonType}"`, () => {
          const tree = renderer
            .create(
              <BpkButtonWithColorScheme
                type={buttonType}
                title="Lorem ipsum"
                onPress={onPressFn}
              />,
            )
            .toJSON();
          expect(tree).toMatchSnapshot();
        });

        it(`should render correctly with type="${buttonType}" and disabled`, () => {
          const tree = renderer
            .create(
              <BpkButtonWithColorScheme
                disabled
                type={buttonType}
                title="Lorem ipsum"
                onPress={onPressFn}
              />,
            )
            .toJSON();
          expect(tree).toMatchSnapshot();
        });
      });
    });

    it('should support the "icon" property', () => {
      const tree = renderer
        .create(
          <BpkButton icon="baggage" title="Lorem ipsum" onPress={onPressFn} />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should support the "iconOnly" property', () => {
      const tree = renderer
        .create(
          <BpkButton
            iconOnly
            icon="baggage"
            title="Lorem ipsum"
            onPress={onPressFn}
          />,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should support having an icon as well as a title', () => {
      const tree = renderer
        .create(
          <BpkButton icon="baggage" title="Lorem ipsum" onPress={onPressFn} />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should support elements as icons', () => {
      const tree = renderer
        .create(
          <BpkButton
            title="Lorem ipsum"
            icon={<BpkText>foo</BpkText>}
            iconOnly
            onPress={onPressFn}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    Object.keys(ICON_ALIGNMENTS).forEach(alignmentType => {
      it(`should render correctly with iconAlignment="${alignmentType}"`, () => {
        const tree = renderer
          .create(
            <BpkButton
              type={BUTTON_TYPES.primary}
              title="Lorem ipsum"
              icon="baggage"
              iconAlignment={alignmentType}
              onPress={onPressFn}
            />,
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    it('should throw an error for invalid button type', () => {
      jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
      expect(() =>
        renderer.create(
          <BpkButton title="Lorem ipsum" type="silly" onPress={onPressFn} />,
        ),
      ).toThrow(
        '"silly" is not a valid button type. Valid types are primary, secondary, destructive, featured',
      );
    });
  });

  describe('BpkButtonThemed', () => {
    it('should render correctly', () => {
      const theme = {
        buttonPrimaryTextColor: 'red',
        buttonPrimaryGradientStartColor: 'green',
        buttonPrimaryGradientEndColor: 'blue',
        buttonBorderRadius: 4,
      };
      const tree = renderer
        .create(
          <BpkThemeProvider theme={theme}>
            <BpkButton title="Lorem ipsum" type="primary" onPress={onPressFn} />
          </BpkThemeProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should not apply border radius when a theme is applied', () => {
      const theme = {
        buttonPrimaryTextColor: 'red',
        buttonPrimaryGradientStartColor: 'green',
        buttonPrimaryGradientEndColor: 'blue',
        buttonBorderRadius: 4,
      };
      const tree = renderer
        .create(
          <BpkThemeProvider theme={theme}>
            <BpkButton
              iconOnly
              icon="baggage"
              title="Lorem ipsum"
              onPress={onPressFn}
            />
          </BpkThemeProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};

export default commonTests;
