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

import { View, Platform, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import {
  colorAbisko,
  spacingMd
} from '@skyscanner/bpk-foundations-react-native/tokens/base.react.native';

import { icons } from '../bpk-component-icon';
import { StoryHeading, StorySubheading } from '../../storybook/TextStyles';
import CenterDecorator from '../../storybook/CenterDecorator';
import action from '../../storybook/addons/actions';

import { BUTTON_TYPES, ICON_ALIGNMENTS, BpkButtonV2 } from './index';

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: spacingMd,
  },
  btnContainerDark: {
    backgroundColor: colorAbisko,
  },
  buttonStyles: {
    marginBottom: spacingMd,
    marginRight: 500,
  },
  bottomMargin: {
    marginBottom: spacingMd,
  },
});

const getIconType = (type) =>
  type === 'destructive' ? icons.trash : icons['long-arrow-right'];

const useDarkBackground = (type: $Keys<typeof BUTTON_TYPES>) =>
  type === BUTTON_TYPES.primaryOnDark ||
    type === BUTTON_TYPES.secondaryOnDark ||
    type === BUTTON_TYPES.linkOnDark;

const generateButtonStoryForType = (
  type: $Keys<typeof BUTTON_TYPES>,
  storyAsLabel: boolean = false,
) => {
  const formattedType = `${type[0].toUpperCase()}${type.substring(1)}`;
  function getLargeVersion() {
    return (
      <View>
        <StorySubheading>
          {storyAsLabel ? formattedType : ''} Large
        </StorySubheading>
        <View
          style={[
            styles.btnContainer,
            useDarkBackground(type) && styles.btnContainerDark,
          ]}
        >
          <BpkButtonV2
            large
            type={type}
            title="Button"
            onPress={action(`${type} pressed`)}
            style={styles.buttonStyles}
          />
          <BpkButtonV2
            large
            type={type}
            disabled
            title="Disabled"
            onPress={action(`${type} disabled pressed, somehow`)}
            style={styles.buttonStyles}
          />
          <BpkButtonV2
            large
            type={type}
            title="With icon"
            icon={getIconType(type)}
            onPress={action(`${type} button with icon clicked`)}
            style={styles.buttonStyles}
          />
          <BpkButtonV2
            large
            type={type}
            title="With icon"
            icon={getIconType(type)}
            iconAlignment="leading"
            onPress={action(`${type} button with icon clicked`)}
          />
          <BpkButtonV2
            large
            type={type}
            title="Loading button"
            icon={getIconType(type)}
            iconAlignment="leading"
            onPress={action(`${type} button with icon clicked`)}
            loading
            style={styles.buttonStyles}
          />
          <BpkButtonV2
            large
            type={type}
            title="Icon only"
            icon={getIconType(type)}
            iconOnly
            onPress={action(`${type} icon only button clicked`)}
            style={styles.buttonStyles}
          />
        </View>
      </View>
    );
  }
  return (
    <View key={type}>
      <StorySubheading>
        {storyAsLabel ? formattedType : 'Default'}
      </StorySubheading>
      <View
        style={[
          styles.btnContainer,
          type === BUTTON_TYPES.outline && styles.btnContainerDark,
        ]}
      >
        <BpkButtonV2
          type={type}
          title="Button"
          onPress={action(`${type} pressed`)}
          style={styles.buttonStyles}
        />
        <BpkButtonV2
          type={type}
          disabled
          title="Disabled"
          onPress={action(`${type} disabled pressed, somehow`)}
          style={styles.buttonStyles}
        />
        <BpkButtonV2
          type={type}
          title="With icon"
          icon={getIconType(type)}
          onPress={action(`${type} button with icon clicked`)}
          style={styles.buttonStyles}
        />
        <BpkButtonV2
          type={type}
          title="With icon"
          icon={getIconType(type)}
          iconAlignment="leading"
          onPress={action(`${type} button with icon clicked`)}
          style={styles.buttonStyles}
        />
        <BpkButtonV2
          type={type}
          title="Loading button"
          icon={getIconType(type)}
          iconAlignment="leading"
          onPress={action(`${type} button with icon clicked`)}
          style={styles.buttonStyles}
          loading
        />
        <BpkButtonV2
          type={type}
          title="Icon only"
          icon={getIconType(type)}
          iconOnly
          onPress={action(`${type} icon only button clicked`)}
          style={styles.buttonStyles}
        />
      </View>
      {getLargeVersion()}
    </View>
  );
};
const allButtonStories = Object.keys(BUTTON_TYPES).map((story) =>
  generateButtonStoryForType(story, true),
);

storiesOf('bpk-component-button', module)
  .addDecorator(CenterDecorator)
  .add('docs:primary', () => (
    <View>{generateButtonStoryForType('primary')}</View>
  ))
  .add('docs:secondary', () => (
    <View>{generateButtonStoryForType('secondary')}</View>
  ))
  .add('docs:destructive', () => (
    <View>{generateButtonStoryForType('destructive')}</View>
  ))
  .add('docs:featured', () => (
    <View>{generateButtonStoryForType('featured')}</View>
  ))
  .add('docs:primaryOnLight', () => (
    <View>{generateButtonStoryForType('primaryOnLight')}</View>
  ))
  .add('docs:primaryOnDark', () => (
    <View>{generateButtonStoryForType('primaryOnDark')}</View>
  ))
  .add('docs:secondaryOnDark', () => (
    <View>{generateButtonStoryForType('secondaryOnDark')}</View>
  ))
  .add('docs:link', () => (
    <View>{generateButtonStoryForType('link')}</View>
  ))
  .add('docs:linkOnDark', () => (
    <View>{generateButtonStoryForType('linkOnDark')}</View>
  ))
  .add('Icon alignments', () => (
    <View>
      {Object.keys(ICON_ALIGNMENTS).map((iconAlignment) => (
        <BpkButtonV2
          key={iconAlignment}
          iconAlignment={iconAlignment}
          title={iconAlignment}
          icon="star"
          type={BUTTON_TYPES.primary}
          onPress={action(`${iconAlignment} button pressed.`)}
          style={styles.bottomMargin}
        />
      ))}
    </View>
  ))
  .add('All Button Types', () => (
    <ScrollView>
      <StoryHeading>All Types</StoryHeading>
      {allButtonStories}
    </ScrollView>
  ))
  .add('Edge Cases', () => {
    return (
      <View>
        <StoryHeading>Edge Cases</StoryHeading>
        <StorySubheading>Long button titles</StorySubheading>
        <BpkButtonV2
          type="primary"
          title="I have a really long title"
          onPress={action('Button with long title pressed')}
          style={styles.buttonStyles}
        />
        <BpkButtonV2
          large
          type="primary"
          title="I also have a really long title"
          onPress={action('Large button with long title pressed')}
          style={styles.buttonStyles}
        />
      </View>
    );
  });
