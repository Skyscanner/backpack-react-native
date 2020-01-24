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
import React from 'react';
import TestRenderer from 'react-test-renderer';

import BpkAppearanceProvider from './BpkAppearanceProvider';
import BpkAppearance from './BpkAppearance';
import BpkDynamicStyleSheet from './BpkDynamicStyleSheet';
import {
  useBpkAppearance,
  useBpkColorScheme,
  useBpkDynamicValue,
  useBpkDynamicStyleSheet,
  useBpkDynamicStyle,
} from './hooks';

jest.mock('react-native-appearance', () => ({
  Appearance: {
    getColorScheme: jest.fn(() => 'light'),
    addChangeListener: jest.fn(),
  },
}));

const TestComponent = ({ hook }) => {
  TestComponent.currentValue = hook();
  return null;
};

describe('BpkAppearance - hooks', () => {
  afterEach(() => {
    TestComponent.currentValue = null;
    TestRenderer.act(() => {
      BpkAppearance.set({ colorScheme: 'light' });
    });
  });

  describe('useAppearance', () => {
    it('returns the current appearance', () => {
      TestRenderer.create(
        <BpkAppearanceProvider>
          <TestComponent hook={useBpkAppearance} />
        </BpkAppearanceProvider>,
      );

      expect(TestComponent.currentValue).toEqual({ colorScheme: 'light' });
    });
  });

  describe('useColorScheme', () => {
    it('returns the current color scheme', () => {
      TestRenderer.create(
        <BpkAppearanceProvider>
          <TestComponent hook={useBpkColorScheme} />
        </BpkAppearanceProvider>,
      );

      expect(TestComponent.currentValue).toEqual('light');
    });
  });

  describe('useDynamicValue', () => {
    it('returns the correct value when current color scheme is light', () => {
      TestRenderer.create(
        <BpkAppearanceProvider>
          <TestComponent
            hook={() => useBpkDynamicValue({ light: 'l', dark: 'd' })}
          />
        </BpkAppearanceProvider>,
      );

      expect(TestComponent.currentValue).toEqual('l');
    });

    it('returns the correct value when current color scheme is dark', () => {
      TestRenderer.create(
        <BpkAppearanceProvider>
          <TestComponent
            hook={() => useBpkDynamicValue({ light: 'l', dark: 'd' })}
          />
        </BpkAppearanceProvider>,
      );

      TestRenderer.act(() => {
        BpkAppearance.set({ colorScheme: 'dark' });
      });

      expect(TestComponent.currentValue).toEqual('d');
    });

    it('returns the provided argument when it is not a valid dynamic color', () => {
      TestRenderer.create(
        <BpkAppearanceProvider>
          <TestComponent hook={() => useBpkDynamicValue({ light: 'l' })} />
        </BpkAppearanceProvider>,
      );

      expect(TestComponent.currentValue).toEqual({ light: 'l' });

      TestRenderer.create(
        <BpkAppearanceProvider>
          <TestComponent hook={() => useBpkDynamicValue(1)} />
        </BpkAppearanceProvider>,
      );

      expect(TestComponent.currentValue).toEqual(1);
    });
  });

  describe('useDynamicStyle', () => {
    it('returns the correct value when current color scheme is light', () => {
      TestRenderer.create(
        <BpkAppearanceProvider>
          <TestComponent
            hook={() =>
              useBpkDynamicStyle({
                color: { light: 'l', dark: 'd' },
                flex: 1,
              })
            }
          />
        </BpkAppearanceProvider>,
      );

      // eslint-disable-next-line
      expect(TestComponent.currentValue).toEqual({ color: 'l', flex: 1 });
    });

    it('returns the correct value when current color scheme is dark', () => {
      TestRenderer.create(
        <BpkAppearanceProvider>
          <TestComponent
            hook={() =>
              useBpkDynamicStyle({
                color: { light: 'l', dark: 'd' },
                flex: 1,
              })
            }
          />
        </BpkAppearanceProvider>,
      );

      TestRenderer.act(() => {
        BpkAppearance.set({ colorScheme: 'dark' });
      });

      // eslint-disable-next-line
      expect(TestComponent.currentValue).toEqual({ color: 'd', flex: 1 });
    });
  });

  describe('useDynamicValueStyleSheet', () => {
    const style = BpkDynamicStyleSheet.create({
      view: {
        color: { light: '#fff', dark: '#f0f' },
      },
    });

    it('returns the correct value when current color scheme is light', () => {
      TestRenderer.create(
        <BpkAppearanceProvider>
          <TestComponent hook={() => useBpkDynamicStyleSheet(style)} />
        </BpkAppearanceProvider>,
      );

      expect(TestComponent.currentValue.view.color).toEqual('#fff');
    });

    it('returns the correct value when current color scheme is dark', () => {
      TestRenderer.create(
        <BpkAppearanceProvider>
          <TestComponent hook={() => useBpkDynamicStyleSheet(style)} />
        </BpkAppearanceProvider>,
      );

      TestRenderer.act(() => {
        BpkAppearance.set({ colorScheme: 'dark' });
      });

      expect(TestComponent.currentValue.view.color).toEqual('#f0f');
    });
  });
});
