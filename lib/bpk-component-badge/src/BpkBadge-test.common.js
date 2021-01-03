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

import React from 'react';
import { Platform, View } from 'react-native';
import renderer from 'react-test-renderer';
import { spacingSm } from 'bpk-tokens/tokens/base.react.native';

import BpkIcon, { icons } from '../../bpk-component-icon';
import BpkThemeProvider from '../../bpk-theming';

import BpkBadge, {
  BADGE_TYPES,
  BADGE_DOCKED_TYPES,
  BADGE_ACCESSORY_VIEW_ALIGNMENTS,
} from './BpkBadge';
import BpkBadgeIcons from './BpkBadgeIcons';

const iconSets = {
  single: [<BpkIcon icon={icons.flight} />],
  multiple: [<BpkIcon icon={icons.flight} />, <BpkIcon icon={icons.hotels} />],
};

const generateBadgeStory = (config: {
  docked?: $Keys<typeof BADGE_DOCKED_TYPES>,
  icons?: string,
  style?: Object,
  message?: ?string,
  iconsTrailing?: boolean,
}) => {
  const message = config.message !== undefined ? config.message : 'Badge';
  const badges = Object.keys(BADGE_TYPES).map((type) => (
    <BpkBadge
      key={type}
      style={config.style}
      accessibilityLabel={message || 'I am accessible'}
      message={message}
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
      accessoryViewAlignment={
        config.iconsTrailing
          ? BADGE_ACCESSORY_VIEW_ALIGNMENTS.trailing
          : BADGE_ACCESSORY_VIEW_ALIGNMENTS.leading
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

    it('should render correctly with trailing icon', () => {
      const tree = renderer
        .create(generateBadgeStory({ icons: 'single', iconsTrailing: true }))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with multiple icons', () => {
      const tree = renderer
        .create(generateBadgeStory({ icons: 'multiple' }))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with multiple icons and no message', () => {
      const tree = renderer
        .create(generateBadgeStory({ icons: 'multiple', message: null }))
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

    it('should render correctly with user provided style', () => {
      const tree = renderer
        .create(generateBadgeStory({ style: { margin: spacingSm } }))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should support theming', () => {
      const theme = {
        badgeSuccessBackgroundColor: 'blue',
        badgeWarningBackgroundColor: 'yellow',
        badgeDestructiveBackgroundColor: 'purple',
        badgeSuccessTextColor: 'white',
        badgeWarningTextColor: 'blue',
        badgeDestructiveTextColor: 'black',
        textFontFamily: Platform.OS === 'ios' ? 'Courier' : 'serif-monospace',
      };
      const tree = renderer
        .create(
          <BpkThemeProvider theme={theme}>
            {generateBadgeStory({})}
          </BpkThemeProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};

// eslint-disable-next-line jest/no-export
export default commonTests;
