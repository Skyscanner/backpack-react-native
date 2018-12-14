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

import React from 'react';
import { StyleSheet } from 'react-native';
import renderer from 'react-test-renderer';
import BpkText from 'react-native-bpk-component-text';

import BpkCard from './BpkCard';
import CORNER_STYLES from './BpkCardCornerStyles';

const commonTests = () => {
  const onPress = jest.fn();

  describe('BpkCard', () => {
    const content = (
      <BpkText>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkText>
    );

    it('should render correctly', () => {
      const tree = renderer
        .create(
          <BpkCard onPress={onPress} accessibilityLabel="Example Card">
            {content}
          </BpkCard>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render correctly without padding', () => {
      const tree = renderer
        .create(
          <BpkCard
            onPress={onPress}
            padded={false}
            accessibilityLabel="Example Card"
          >
            {content}
          </BpkCard>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with the "focused" state', () => {
      const tree = renderer
        .create(
          <BpkCard onPress={onPress} focused accessibilityLabel="Example Card">
            {content}
          </BpkCard>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render correctly when "cornerStyle=large"', () => {
      const tree = renderer
        .create(
          <BpkCard
            onPress={onPress}
            cornerStyle={CORNER_STYLES.lg}
            accessibilityLabel="Example Card"
          >
            {content}
          </BpkCard>,
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
          <BpkCard
            onPress={onPress}
            accessibilityLabel="Example Card"
            style={styles.custom}
          >
            {content}
          </BpkCard>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with custom inner style', () => {
      const styles = StyleSheet.create({
        custom: {
          flex: 1,
        },
      });

      const tree = renderer
        .create(
          <BpkCard
            onPress={onPress}
            accessibilityLabel="Example Card"
            innerStyle={styles.custom}
          >
            {content}
          </BpkCard>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with arbitrary props', () => {
      const tree = renderer
        .create(
          <BpkCard
            onPress={onPress}
            accessibilityLabel="Example Card"
            testID="arbitrary value" // <-- arbitrary prop
          >
            {content}
          </BpkCard>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
};
export default commonTests;
