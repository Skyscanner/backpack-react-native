/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

import { describeEachColorScheme } from '../../bpk-test-utils';

import BpkImage from './BpkImage';

const CustomImage = 'CustomImage';

const requiredProps = {
  alt: 'test',
  source: {
    uri:
      'https://images.unsplash.com/photo-1518225853900-cc01b1092211?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d75dd482ea9e2ed4d53017c326497143&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb',
  },
};

jest.useFakeTimers();

const commonTests = () => {
  describe('BpkImage', () => {
    describeEachColorScheme(BpkImage, WithColorScheme => {
      it('should render correctly', () => {
        const tree = renderer
          .create(<WithColorScheme {...requiredProps} />)
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
          .create(<WithColorScheme style={styles.custom} {...requiredProps} />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should render correctly with arbitrary props', () => {
        const tree = renderer
          .create(<WithColorScheme testID="123" {...requiredProps} />)
          .toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('should render correctly when not loaded', () => {
        const tree = renderer
          .create(<WithColorScheme loaded={false} {...requiredProps} />)
          .toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('should render correctly without border radius', () => {
        const tree = renderer
          .create(<WithColorScheme rounded={false} {...requiredProps} />)
          .toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('should render correctly when unloaded and out of view', () => {
        const tree = renderer
          .create(
            <WithColorScheme
              inView={false}
              loaded={false}
              {...requiredProps}
            />,
          )
          .toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('should render correctly with a custom image component', () => {
        const tree = renderer
          // $FlowFixMe, imageComponent shouldnt be a string however react test renderer conveniently treats strings as custom components
          .create(
            <WithColorScheme imageComponent={CustomImage} {...requiredProps} />,
          )
          .toJSON();

        expect(tree).toMatchSnapshot();
      });
    });
  });
};

export default commonTests;
