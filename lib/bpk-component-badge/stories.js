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

import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import {
  colorSkyGrayTint07,
  colorSkyGrayTint01,
  spacingSm,
} from 'bpk-tokens/tokens/base.react.native';

import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../bpk-appearance';
import BpkIcon, { icons } from '../bpk-component-icon';
import BpkThemeProvider from '../bpk-theming';
import { StorySubheading } from '../../storybook/TextStyles';
import themeAttributes from '../../storybook/themeAttributes';
import CenterDecorator from '../../storybook/CenterDecorator';

import BpkBadge, {
  BpkBadgeIcons,
  BADGE_TYPES,
  BADGE_DOCKED_TYPES,
  BADGE_ACCESSORY_VIEW_ALIGNMENTS,
} from './index';

const dynamicStyles = BpkDynamicStyleSheet.create({
  container: {
    width: '100%',
  },
  badgeWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingBottom: spacingSm,
    margin: spacingSm,
  },
  center: {
    flexDirection: 'row',
    padding: spacingSm,
    alignItems: 'center',
  },
  start: {
    backgroundColor: { light: colorSkyGrayTint07, dark: colorSkyGrayTint01 },
    alignItems: 'flex-start',
  },
  end: {
    backgroundColor: { light: colorSkyGrayTint07, dark: colorSkyGrayTint01 },
    alignItems: 'flex-end',
  },
  light: {
    backgroundColor: colorSkyGrayTint01,
  },
  outline: {
    backgroundColor: colorSkyGrayTint01,
  },
  inverse: {
    backgroundColor: colorSkyGrayTint01,
  },
  destructive: {},
  success: {},
  warning: {},
});

const capitalize = (input) => input.charAt(0).toUpperCase() + input.slice(1);

const iconSets = {
  single: [<BpkIcon icon={icons.flight} />],
  multiple: [<BpkIcon icon={icons.flight} />, <BpkIcon icon={icons.hotels} />],
};

const BadgeStory = ({
  contents,
  config,
}: {
  contents: Array<string>,
  config: {
    docked?: $Keys<typeof BADGE_DOCKED_TYPES>,
    icons?: string,
    iconsTrailing?: boolean,
  },
}) => {
  const style = useBpkDynamicStyleSheet(dynamicStyles);
  const badgeWrapperStyle = [style.badgeWrapper];
  if (config.docked) {
    badgeWrapperStyle.push(style[config.docked]);
  } else {
    badgeWrapperStyle.push(style.center);
  }
  const badges = Object.keys(BADGE_TYPES).map((i) => (
    <View key={i}>
      <StorySubheading>{capitalize(i)}</StorySubheading>
      <View style={[badgeWrapperStyle, style[i] ? style[i] : {}]}>
        {contents.map((content) => (
          <Fragment key={content}>
            <BpkBadge
              message={content}
              accessoryViewAlignment={
                config.iconsTrailing
                  ? BADGE_ACCESSORY_VIEW_ALIGNMENTS.trailing
                  : BADGE_ACCESSORY_VIEW_ALIGNMENTS.leading
              }
              accessoryView={
                config.icons ? (
                  <BpkBadgeIcons
                    icons={iconSets[config.icons]}
                    separator={config.icons === 'multiple' ? '+' : null}
                  />
                ) : null
              }
              docked={config.docked}
              type={i}
            />
            {config.icons === 'multiple' && (
              <BpkBadge
                accessibilityLabel={content}
                accessoryView={
                  config.icons ? (
                    <BpkBadgeIcons
                      icons={iconSets[config.icons]}
                      separator={config.icons === 'multiple' ? '+' : null}
                    />
                  ) : null
                }
                docked={config.docked}
                type={i}
              />
            )}
          </Fragment>
        ))}
      </View>
    </View>
  ));

  return <View style={style.container}>{badges}</View>;
};

BadgeStory.defaultProps = {
  config: {},
};

storiesOf('bpk-component-badge', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => (
    <BadgeStory contents={['Apples', 'Bananas', 'Strawberries', 'Pears']} />
  ))
  .add('docs:with-icon', () => (
    <BadgeStory
      contents={['Apples', 'Bananas', 'Strawberries']}
      config={{
        icons: 'single',
      }}
    />
  ))
  .add('docs:with-multiple-icons', () => (
    <BadgeStory
      contents={['4% off']}
      config={{
        icons: 'multiple',
      }}
    />
  ))
  .add('docs:with-trailing-icon', () => (
    <BadgeStory
      contents={['Apples', 'Bananas', 'Strawberries']}
      config={{
        icons: 'single',
        iconsTrailing: true,
      }}
    />
  ))
  .add('docs:docked-start', () => (
    <BadgeStory
      contents={['Advert']}
      config={{ docked: BADGE_DOCKED_TYPES.start }}
    />
  ))
  .add('docs:docked-end', () => (
    <BadgeStory
      contents={['Advert']}
      config={{ docked: BADGE_DOCKED_TYPES.end }}
    />
  ))
  .add('Themed', () => (
    <BpkThemeProvider theme={themeAttributes}>
      <BadgeStory
        contents={['Advert']}
        config={{ docked: BADGE_DOCKED_TYPES.end }}
      />
    </BpkThemeProvider>
  ))
  .add('Edge cases', () => (
    <View>
      <BpkBadge
        message="This is quite a long string, longer than you would typically see."
        style={{ marginBottom: spacingSm }}
      />
      <BpkBadge
        message="Раницата е най-добрата"
        style={{ marginBottom: spacingSm }}
      />
      <BpkBadge message="حقيبة الظهر هي الأفضل" />
    </View>
  ));
