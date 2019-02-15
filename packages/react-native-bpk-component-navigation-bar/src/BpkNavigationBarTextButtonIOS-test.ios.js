/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
import renderer from 'react-test-renderer';

import BpkNavigationBarTextButtonIOS, {
  BUTTON_TYPES,
} from './BpkNavigationBarTextButtonIOS.ios';

jest.mock('bpk-tokens/tokens/base.react.native', () =>
  jest.requireActual('bpk-tokens/tokens/base.react.native.android.js'),
);

describe('iOS', () => {
  describe('BpkNavigationBarTextButtonIOS', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(
          <BpkNavigationBarTextButtonIOS
            title="Edit"
            leading={false}
            onPress={jest.fn()}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly leading configuration', () => {
      const tree = renderer
        .create(
          <BpkNavigationBarTextButtonIOS
            title="Cancel"
            leading
            onPress={jest.fn()}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly emphasize', () => {
      const tree = renderer
        .create(
          <BpkNavigationBarTextButtonIOS
            title="Done"
            emphasize
            leading={false}
            onPress={jest.fn()}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly disabled', () => {
      const tree = renderer
        .create(
          <BpkNavigationBarTextButtonIOS
            title="Done"
            leading={false}
            onPress={jest.fn()}
            disabled
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with type="primary"', () => {
      const tree = renderer
        .create(
          <BpkNavigationBarTextButtonIOS
            title="Done"
            leading={false}
            onPress={jest.fn()}
            type={BUTTON_TYPES.primary}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with type="primary" and disabled', () => {
      const tree = renderer
        .create(
          <BpkNavigationBarTextButtonIOS
            title="Done"
            leading={false}
            onPress={jest.fn()}
            type={BUTTON_TYPES.primary}
            disabled
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should respect "tintColor" over "type"', () => {
      const tree = renderer
        .create(
          <BpkNavigationBarTextButtonIOS
            title="Done"
            leading={false}
            onPress={jest.fn()}
            type={BUTTON_TYPES.primary}
            tintColor="red"
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should respect "disabledTintColor" over "type"', () => {
      const tree = renderer
        .create(
          <BpkNavigationBarTextButtonIOS
            title="Done"
            leading={false}
            onPress={jest.fn()}
            disabledTintColor="red"
            type={BUTTON_TYPES.primary}
            disabled
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should respect "primaryTintColor" over "tintColor" if type="primary"', () => {
      const tree = renderer
        .create(
          <BpkNavigationBarTextButtonIOS
            title="Done"
            leading={false}
            onPress={jest.fn()}
            type={BUTTON_TYPES.primary}
            tintColor="red"
            disabledTintColor="yellow"
            primaryTintColor="blue"
            primaryDisabledTintColor="green"
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should respect "primaryDisabledTintColor" over "disabledTintColor" if type="primary" and disabled=true', () => {
      const tree = renderer
        .create(
          <BpkNavigationBarTextButtonIOS
            title="Done"
            leading={false}
            onPress={jest.fn()}
            type={BUTTON_TYPES.primary}
            tintColor="red"
            disabledTintColor="yellow"
            primaryTintColor="blue"
            primaryDisabledTintColor="green"
            disabled
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should respect "tintColor" over "primaryTintColor" if type="default"', () => {
      const tree = renderer
        .create(
          <BpkNavigationBarTextButtonIOS
            title="Done"
            leading={false}
            onPress={jest.fn()}
            tintColor="red"
            disabledTintColor="yellow"
            primaryTintColor="blue"
            primaryDisabledTintColor="green"
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should respect "disabledTintColor" over "primaryDisabledTintColor" if type="default" and disabled=true', () => {
      const tree = renderer
        .create(
          <BpkNavigationBarTextButtonIOS
            title="Done"
            leading={false}
            onPress={jest.fn()}
            tintColor="red"
            disabledTintColor="yellow"
            primaryTintColor="blue"
            primaryDisabledTintColor="green"
            disabled
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
