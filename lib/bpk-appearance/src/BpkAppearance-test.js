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

import appearance from './BpkAppearance';

describe('BpkAppearance', () => {
  const initialAppearance = appearance.get();
  afterEach(() => {
    appearance.set(initialAppearance);
  });

  it('correctly returns initial appearance', () => {
    expect(appearance.get()).toEqual({ colorScheme: 'light' });
  });

  it('triggers change listeners', () => {
    const changeListener = jest.fn();
    const changeListener2 = jest.fn();
    try {
      appearance.addChangeListener(changeListener);
      appearance.addChangeListener(changeListener2);
      appearance.set({ colorScheme: 'dark' });

      expect(appearance.get()).toEqual({ colorScheme: 'dark' });
      expect(changeListener).toHaveBeenCalledWith({ colorScheme: 'dark' });
      expect(changeListener2).toHaveBeenCalledWith({ colorScheme: 'dark' });
    } finally {
      appearance.removeChangeListener(changeListener);
      appearance.removeChangeListener(changeListener2);
    }
  });

  it('does not trigger if new preferences are the same', () => {
    const changeListener = jest.fn();

    try {
      appearance.addChangeListener(changeListener);
      appearance.set({ colorScheme: 'light' });

      expect(changeListener).not.toHaveBeenCalled();
    } finally {
      appearance.removeChangeListener(changeListener);
    }
  });

  it('does not duplicate listeners', () => {
    const changeListener = jest.fn();
    try {
      appearance.addChangeListener(changeListener);
      appearance.addChangeListener(changeListener);
      appearance.set({ colorScheme: 'dark' });

      expect(changeListener).toHaveBeenCalledTimes(1);
    } finally {
      appearance.removeChangeListener(changeListener);
    }
  });

  it('removes listeners', () => {
    const changeListener = jest.fn();
    appearance.addChangeListener(changeListener);
    appearance.removeChangeListener(changeListener);
    appearance.set({ colorScheme: 'dark' });

    expect(changeListener).not.toHaveBeenCalled();
  });

  it('trigger listeners when system color mode changes', () => {
    const changeListener = jest.fn();
    appearance.addChangeListener(changeListener);
    appearance.set({ colorScheme: 'dark' });

    // expect(appearance.get()).toEqual({ colorScheme: 'dark' });
    expect(changeListener).toHaveBeenCalledWith({ colorScheme: 'dark' });
    appearance.removeChangeListener(changeListener);
  });
});
