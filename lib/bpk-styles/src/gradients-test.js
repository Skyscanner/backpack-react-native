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

import {
  colorSkyBlue,
  colorPrimaryGradientLight,
} from 'bpk-tokens/tokens/base.react.native';

import gradients from './gradients';

const colors = [colorSkyBlue, colorPrimaryGradientLight];

describe('gradients', () => {
  describe('primary', () => {
    it('should default to the skyscanner gradient', () => {
      expect(gradients.primary()).toEqual({
        colors,
        start: { x: 0.0, y: 0.0 },
        end: { x: 1.0, y: 1.0 },
      });
    });

    it('should support custom angles', () => {
      expect(gradients.primary(gradients.ANGLES.down)).toEqual({
        colors,
        start: { x: 0.5, y: 0.0 },
        end: { x: 0.5, y: 1.0 },
      });
    });

    it('should default to default for unknown angles', () => {
      // Ignoring this false positive flow error.
      // The test is asserting that our prop type works for non flow users.
      // $FlowFixMe
      expect(gradients.primary('notAnAngle')).toEqual({
        colors,
        start: { x: 0.0, y: 0.0 },
        end: { x: 1.0, y: 1.0 },
      });
    });
  });
});
