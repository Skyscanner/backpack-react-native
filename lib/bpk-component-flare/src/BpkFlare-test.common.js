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

import React from 'react';
import { StyleSheet, View } from 'react-native';
import renderer from 'react-test-renderer';

import BpkFlare, { FLARE_POINTER_DIRECTIONS } from './BpkFlare';

const commonTests = () => {
  describe('BpkFlare', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(
          <BpkFlare>
            <View />
          </BpkFlare>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with pointerDirection=up', () => {
      const tree = renderer
        .create(
          <BpkFlare pointerDirection={FLARE_POINTER_DIRECTIONS.up}>
            <View />
          </BpkFlare>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with custom style', () => {
      const styles = StyleSheet.create({
        custom: {
          flex: 1,
        },
      });

      const tree = renderer
        .create(
          <BpkFlare style={styles.custom}>
            <View />
          </BpkFlare>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with arbitrary props', () => {
      const tree = renderer
        .create(
          <BpkFlare
            testID="123" // <- Arbitrary prop.
          >
            <View />
          </BpkFlare>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
};

// eslint-disable-next-line jest/no-export
export default commonTests;
