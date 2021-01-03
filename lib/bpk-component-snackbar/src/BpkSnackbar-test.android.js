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

import { NativeModules } from 'react-native';

import { LENGTH_SHORT, LENGTH_INDEFINITE } from './NativeSnackbar';
import BpkSnackbar from './BpkSnackbar';

const NativeSnackbar = NativeModules.AndroidBpkSnackbar;

describe('BpkSnackbar', () => {
  afterEach(() => {
    NativeSnackbar.show.mockReset();
    NativeSnackbar.dismiss.mockReset();
  });

  describe('Android', () => {
    describe('show', () => {
      it('calls native snackbar', () => {
        BpkSnackbar.show({
          text: 'Snackbar text',
        });

        expect(NativeSnackbar.show).toHaveBeenCalledWith(
          {
            text: 'Snackbar text',
            duration: LENGTH_SHORT,
          },
          expect.any(Function),
        );
      });

      it('handles icon correctly', () => {
        BpkSnackbar.show({
          text: 'Snackbar text',
          icon: 'close',
        });

        expect(NativeSnackbar.show).toHaveBeenCalledWith(
          {
            text: 'Snackbar text',
            duration: LENGTH_SHORT,
            icon: 'bpk_close',
          },
          expect.any(Function),
        );
      });

      it('handles duration correctly', () => {
        BpkSnackbar.show({
          text: 'Snackbar text',
          duration: LENGTH_INDEFINITE,
        });

        expect(NativeSnackbar.show).toHaveBeenCalledWith(
          {
            text: 'Snackbar text',
            duration: LENGTH_INDEFINITE,
          },
          expect.any(Function),
        );
      });

      it('handles title correctly', () => {
        BpkSnackbar.show({
          text: 'Snackbar text',
          title: 'Title',
        });

        expect(NativeSnackbar.show).toHaveBeenCalledWith(
          {
            text: 'Snackbar text',
            title: 'Title',
            duration: LENGTH_SHORT,
          },
          expect.any(Function),
        );
      });

      describe('action', () => {
        it('handles action with text correctly', () => {
          const onPress = () => {};
          BpkSnackbar.show({
            text: 'Snackbar text',
            action: {
              text: 'Action',
              onPress,
            },
          });

          expect(NativeSnackbar.show).toHaveBeenCalledWith(
            {
              text: 'Snackbar text',
              duration: LENGTH_SHORT,
              action: {
                text: 'Action',
              },
            },
            onPress,
          );
        });

        it('handles action with icon correctly', () => {
          const onPress = () => {};
          BpkSnackbar.show({
            text: 'Snackbar text',
            action: {
              icon: 'close',
              accessibilityLabel: 'close',
              onPress,
            },
          });

          expect(NativeSnackbar.show).toHaveBeenCalledWith(
            {
              text: 'Snackbar text',
              duration: LENGTH_SHORT,
              action: {
                icon: 'bpk_close',
                accessibilityLabel: 'close',
              },
            },
            onPress,
          );
        });
      });
    });

    describe('dismiss', () => {
      it('calls the native snackbar', () => {
        BpkSnackbar.dismiss();
        expect(NativeSnackbar.dismiss).toHaveBeenCalled();
      });
    });
  });
});
