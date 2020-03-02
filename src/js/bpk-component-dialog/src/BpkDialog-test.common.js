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
/* eslint-disable no-console */

import React from 'react';
import renderer from 'react-test-renderer';

import BpkDialog from './BpkDialog';
import { DIALOG_TYPE, BUTTON_TYPE } from './common-types';

const disabledScrimAction = {
  enabled: false,
  callback: () => {},
};

const positiveAction = {
  text: 'Yes',
  type: BUTTON_TYPE.primary,
  callback: () => {},
};

const negativeAction = {
  text: 'No',
  type: BUTTON_TYPE.destructive,
  callback: () => {},
};

const commonTests = defaultProps => {
  describe('BpkDialog', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(
          <BpkDialog
            type={DIALOG_TYPE.alert}
            {...defaultProps}
            isOpen={false}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly open', () => {
      const tree = renderer
        .create(<BpkDialog {...defaultProps} isOpen />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with one actions', () => {
      const tree = renderer
        .create(
          <BpkDialog
            type={DIALOG_TYPE.alert}
            {...defaultProps}
            actions={[positiveAction]}
            isOpen
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with two actions', () => {
      const tree = renderer
        .create(
          <BpkDialog
            type={DIALOG_TYPE.alert}
            {...defaultProps}
            actions={[positiveAction, negativeAction]}
            isOpen
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with disabled scrim actions', () => {
      const tree = renderer
        .create(
          <BpkDialog
            type={DIALOG_TYPE.alert}
            {...defaultProps}
            scrimAction={disabledScrimAction}
            isOpen
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with bottom sheet style', () => {
      const tree = renderer
        .create(
          <BpkDialog type={DIALOG_TYPE.bottomSheet} {...defaultProps} isOpen />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};

export default commonTests;
