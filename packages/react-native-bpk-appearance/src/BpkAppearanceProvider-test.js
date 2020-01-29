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
import React, { useContext } from 'react';
import TestRenderer from 'react-test-renderer';

import BpkAppearanceProvider, {
  BpkAppearanceProviderContext,
} from './BpkAppearanceProvider';
import BpkAppearance from './BpkAppearance';

const TestComponent = () => {
  TestComponent.currentAppearance = useContext(BpkAppearanceProviderContext);
  return null;
};

describe('BpkAppearanceProvider', () => {
  afterEach(() => {
    TestComponent.currentAppearance = null;
  });

  it('correctly provides current appearance', () => {
    TestRenderer.create(
      <BpkAppearanceProvider>
        <TestComponent />
      </BpkAppearanceProvider>,
    );

    expect(TestComponent.currentAppearance).toEqual({ colorScheme: 'light' });
  });

  it('correctly updates current appearance', async () => {
    TestRenderer.create(
      <BpkAppearanceProvider>
        <TestComponent />
      </BpkAppearanceProvider>,
    );

    TestRenderer.act(() => {
      BpkAppearance.set({ colorScheme: 'dark' });
    });

    expect(TestComponent.currentAppearance).toEqual({ colorScheme: 'dark' });
  });

  it('should allow current appearance to be overridden', async () => {
    TestRenderer.create(
      <BpkAppearanceProvider appearanceOverride={{ colorScheme: 'dark' }}>
        <TestComponent />
      </BpkAppearanceProvider>,
    );

    expect(TestComponent.currentAppearance).toEqual({ colorScheme: 'dark' });
  });
});
