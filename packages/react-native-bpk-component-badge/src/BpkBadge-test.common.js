/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
import { View } from 'react-native';
import renderer from 'react-test-renderer';
import { spacingSm } from 'bpk-tokens/tokens/base.react.native';
import BpkIcon, { icons } from 'react-native-bpk-component-icon';

import BpkBadge, { BADGE_TYPES, BADGE_DOCKED_TYPES } from './BpkBadge';
import BpkBadgeIcons from './BpkBadgeIcons';

const iconSets = {
  single: [<BpkIcon icon={icons.flight} />],
  multiple: [<BpkIcon icon={icons.flight} />, <BpkIcon icon={icons.hotels} />],
};

const generateBadgeStory = (config: {
  docked?: $Keys<typeof BADGE_DOCKED_TYPES>,
  icons?: string,
  style?: Object,
}) => {
  const badges = Object.keys(BADGE_TYPES).map(type => (
    <BpkBadge
      key={type}
      style={config.style}
      message="Badge"
      docked={config.docked}
      type={type}
      accessoryView={
        config.icons ? (
          <BpkBadgeIcons
            icons={iconSets[config.icons]}
            separator={config.icons === 'multiple' ? '+' : null}
          />
        ) : null
      }
    />
  ));

  return <View>{badges}</View>;
};

const commonTests = () => {
  describe('BpkBadge', () => {
    it('should render correctly in normal mode', () => {
      const tree = renderer.create(generateBadgeStory({})).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with icon', () => {
      const tree = renderer
        .create(generateBadgeStory({ icons: 'single' }))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with multiple icons', () => {
      const tree = renderer
        .create(generateBadgeStory({ icons: 'multiple' }))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly docked to the start', () => {
      const tree = renderer
        .create(generateBadgeStory({ docked: BADGE_DOCKED_TYPES.start }))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly docked to the end', () => {
      const tree = renderer
        .create(generateBadgeStory({ docked: BADGE_DOCKED_TYPES.end }))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should throw an error is an extraneous docked values is provided', () => {
      jest.spyOn(console, 'error').mockImplementation(err => {
        throw err;
      });

      expect(() => {
        // $FlowFixMe
        renderer.create(generateBadgeStory({ docked: 'unknown' }));
      }).toThrow();
    });

    it('should render correctly with user provided style', () => {
      const tree = renderer
        .create(generateBadgeStory({ style: { margin: spacingSm } }))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};
export default commonTests;
