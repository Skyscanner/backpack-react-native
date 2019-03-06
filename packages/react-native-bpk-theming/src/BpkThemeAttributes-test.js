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
import { View } from 'react-native';
import renderer from 'react-test-renderer';

import BpkThemeAttributes from './BpkThemeAttributes';
import BpkThemeProvider from './BpkThemeProvider';

const Color = () => (
  <BpkThemeAttributes>
    {({ primaryColor }) => <View style={{ backgroundColor: primaryColor }} />}
  </BpkThemeAttributes>
);

describe('BpkThemeAttributes', () => {
  it('uses the default primary color when rendered outside a theme provider', () => {
    const tree = renderer.create(<Color />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('uses the primary color from the theme when rendered inside a theme provider', () => {
    const tree = renderer
      .create(
        <BpkThemeProvider theme={{ primaryColor: 'white' }}>
          <Color />
        </BpkThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
