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

import { BpkAppearanceProvider } from '../../bpk-appearance';

const COLOR_SCHEMES = ['light', 'dark'];

const withColorScheme = (WrappedComponent, colorScheme) => (props) => (
  <BpkAppearanceProvider appearanceOverride={{ colorScheme }}>
    <WrappedComponent {...props} />
  </BpkAppearanceProvider>
);

/**
 * Creates a describe block for each color scheme available,
 * and runs `test` inside it.
 *
 * @example
 * ```javascript
 * describeEachColorScheme(BpkTouchableOverlay)(Subject => {
 *  it('should render correctly', () => {
 *    const tree = renderer.create(<Subject>{content}</Subject>).toJSON();
 *    expect(tree).toMatchSnapshot();
 *  });
 * });
 * ```
 *
 * @param {Component} Subject react component to be tested
 * @param {Function} tests function to be executed inside each describe block
 * @return {void}
 */
const describeEachColorScheme = (Subject, tests) => {
  const variations = COLOR_SCHEMES.map((colorScheme) => [
    colorScheme,
    withColorScheme(Subject, colorScheme),
  ]);
  describe.each(variations)('%s mode', (mode, WrappedSubject) => {
    tests(WrappedSubject, mode);
  });
};

export default describeEachColorScheme;
