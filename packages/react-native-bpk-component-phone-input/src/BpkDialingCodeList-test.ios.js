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

import React from 'react';
import renderer from 'react-test-renderer';
import BpkSectionList from 'react-native-bpk-component-section-list';

import BpkDialingCodeList from './BpkDialingCodeList';
import commonTests from './BpkDialingCodeList-test.common';

const CODES = [
  {
    id: '0',
    dialingCode: '0',
    name: 'Zero',
  },
  {
    id: '1',
    dialingCode: '1',
    name: 'One',
  },
  {
    id: '2',
    dialingCode: '2',
    name: 'Two',
  },
  {
    id: '3',
    dialingCode: '3',
    name: 'Three',
  },
];

const SUGGESTED = {
  ids: ['1', '3'],
  title: 'Suggested for you',
};

describe('iOS', () => {
  commonTests();

  // This test can be moved to commonTests() once the feature has been implemented on android
  it('should render correctly with suggested IDs', () => {
    const tree = renderer.create(
      <BpkDialingCodeList
        dialingCodes={CODES}
        onItemPress={jest.fn()}
        renderFlag={() => null}
        suggested={SUGGESTED}
      />,
    );
    const { props } = tree.root.findByType(BpkSectionList);

    expect(props.sections).toMatchSnapshot();
  });
});
