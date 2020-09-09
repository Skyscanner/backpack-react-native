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

import { describeEachColorScheme } from '../../bpk-test-utils';
import { icons } from '../../bpk-component-icon';

import BpkMapMarker, { MARKER_STATUSES } from './BpkMapMarker';

const requiredProps = {
  latitude: 52.516379,
  longitude: 13.378026,
  icon: icons.landmark,
  onPress: () => {},
};

const commonTests = () => {
  describeEachColorScheme('BpkPriceMarker', () => {
    describeEachColorScheme(BpkMapMarker, WithColorScheme => {
      it('should render correctly', () => {
        const tree = renderer
          .create(<WithColorScheme {...requiredProps} />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should render correctly with disabled={true}', () => {
        const tree = renderer
          .create(<WithColorScheme {...requiredProps} disabled />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      Object.keys(MARKER_STATUSES).forEach(status => {
        it(`should render correctly with status=${status}`, () => {
          const tree = renderer
            .create(<WithColorScheme {...requiredProps} status={status} />)
            .toJSON();
          expect(tree).toMatchSnapshot();
        });
      });
    });
  });
};

export default commonTests;
