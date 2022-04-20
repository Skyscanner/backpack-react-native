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
import renderer from 'react-test-renderer';
import { icons } from '../../bpk-component-icon';
import { ICON_ALIGNMENTS } from './common-types';

import BpkButton from './BpkButton';

const commonTests = () => {
  describe('BpkButton', () => {
    it('should render correctly with required props', () => {
      const tree = renderer.create(<BpkButton title="Primary" type="primary" onPress={() => {}}/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render large button correctly with required props', () => {
      const tree = renderer.create(<BpkButton title="Primary" type="primary" onPress={() => {}} large/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render button correctly with icon', () => {
      const tree = renderer.create(<BpkButton title="Primary" type="primary" onPress={() => {}} icon={icons.tick}/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render large button correctly with icon', () => {
      const tree = renderer.create(<BpkButton title="Primary" type="primary" onPress={() => {}} icon={icons.tick} large/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render icon only button correctly', () => {
      const tree = renderer.create(<BpkButton title="Primary" type="primary" onPress={() => {}} icon={icons.tick} iconOnly />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render icon only button correctly', () => {
      const tree = renderer.create(<BpkButton title="Primary" type="primary" onPress={() => {}} icon={icons.tick} iconOnly large/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render button correctly with all props', () => {
      const tree = renderer.create(<BpkButton title="Primary" type="primary" onPress={() => {}} icon={icons.tick} iconAlignment={ICON_ALIGNMENTS.leading} large/>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};

// eslint-disable-next-line jest/no-export
export default commonTests;
