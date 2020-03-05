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
import renderer from 'react-test-renderer';

import commonTests from './BpkButtonLink-test.common';
import BpkButtonLink from './BpkButtonLink';

describe('Android', () => {
  commonTests();

  it('should support "borderlessBackground" equal to false', () => {
    const onPressFn = jest.fn();

    const tree = renderer
      .create(
        <BpkButtonLink
          title="Lorem ipsum"
          onPress={onPressFn}
          borderlessBackground={false}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should support "uppercase" equal to false', () => {
    const onPressFn = jest.fn();

    const tree = renderer
      .create(
        <BpkButtonLink
          title="Lorem ipsum"
          onPress={onPressFn}
          uppercase={false}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
