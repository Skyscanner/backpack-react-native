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
import renderer from 'react-test-renderer';
import { Image } from 'react-native';

import BpkThemeProvider from '../../bpk-theming';
import { describeEachColorScheme } from '../../bpk-test-utils';

import BpkFlatListItem from './BpkFlatListItem';

const onPressFn = jest.fn();

const commonTests = () => {
  describe('BpkFlatListItem', () => {
    describeEachColorScheme(
      BpkFlatListItem,
      (BpkFlatListItemWithColorScheme) => {
        it('should render correctly', () => {
          const tree = renderer
            .create(
              <BpkFlatListItemWithColorScheme
                title="List item"
                onPress={onPressFn}
              />,
            )
            .toJSON();
          expect(tree).toMatchSnapshot();
        });

        it('should support the "selected" property', () => {
          const tree = renderer
            .create(
              <BpkFlatListItemWithColorScheme
                title="List item"
                onPress={onPressFn}
                selected
              />,
            )
            .toJSON();
          expect(tree).toMatchSnapshot();
        });
      },
    );

    it('should support the "image" property', () => {
      const tree = renderer
        .create(
          <BpkFlatListItem
            title="List item"
            onPress={onPressFn}
            image={<Image />}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it('should support theming when selected', () => {
    const theme = {
      flatListSelectedItemColor: 'red',
      textFontFamily: 'relative',
    };
    const tree = renderer
      .create(
        <BpkThemeProvider theme={theme}>
          <BpkFlatListItem title="List item" onPress={onPressFn} selected />
        </BpkThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should pass through titleProps to the title', () => {
    const titleProps = {
      numberOfLines: 7,
      testID: 'ID_for_testing',
    };
    const tree = renderer.create(
      <BpkFlatListItem
        title="List item with pass through props"
        onPress={onPressFn}
        titleProps={titleProps}
      />,
    );
    const bpkText = tree.root.findAll(
      (descendant) =>
        descendant.type.name === 'BpkText' &&
        descendant.props.testID === 'ID_for_testing',
    );
    expect(bpkText.length).toEqual(1);
    expect(bpkText[0].props).toMatchSnapshot();
  });
};

// eslint-disable-next-line jest/no-export
export default commonTests;
