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
import TestRenderer from 'react-test-renderer';

import BpkAppearance, { type BpkAppearancePreferences } from './BpkAppearance';
import BpkAppearanceProvider from './BpkAppearanceProvider';
import BpkAppearanceConsumer, {
  type ChildrenProps,
} from './BpkAppearanceConsumer';

const TestComponent = ({ bpkAppearance }) => {
  TestComponent.currentAppearance = bpkAppearance;
  return null;
};

// eslint-disable-next-line
class TestClassComponent extends React.Component<ChildrenProps> {
  static currentAppearance: ?BpkAppearancePreferences;

  render() {
    TestClassComponent.currentAppearance = this.props.bpkAppearance; // eslint-disable-line
    return null;
  }
}

describe('BpkAppearanceProvider', () => {
  afterEach(() => {
    TestComponent.currentAppearance = null;
    TestClassComponent.currentAppearance = null;
    TestRenderer.act(() => {
      BpkAppearance.set({ colorScheme: 'light' });
    });
  });

  it('correctly consumes current appearance', () => {
    TestRenderer.create(
      <BpkAppearanceProvider>
        <BpkAppearanceConsumer>
          {({ bpkAppearance }) => (
            <TestComponent bpkAppearance={bpkAppearance} />
          )}
        </BpkAppearanceConsumer>
      </BpkAppearanceProvider>,
    );

    expect(TestComponent.currentAppearance).toEqual({ colorScheme: 'light' });
  });

  it('updates correctly', async () => {
    TestRenderer.create(
      <BpkAppearanceProvider>
        <BpkAppearanceConsumer>
          {({ bpkAppearance }) => (
            <TestComponent bpkAppearance={bpkAppearance} />
          )}
        </BpkAppearanceConsumer>
      </BpkAppearanceProvider>,
    );

    TestRenderer.act(() => {
      BpkAppearance.set({ colorScheme: 'dark' });
    });

    expect(TestComponent.currentAppearance).toEqual({ colorScheme: 'dark' });
  });

  it('works with class components', async () => {
    TestRenderer.create(
      <BpkAppearanceProvider>
        <BpkAppearanceConsumer>
          {({ bpkAppearance }) => (
            <TestClassComponent bpkAppearance={bpkAppearance} />
          )}
        </BpkAppearanceConsumer>
      </BpkAppearanceProvider>,
    );

    expect(TestClassComponent.currentAppearance).toEqual({
      colorScheme: 'light',
    });
  });
});
