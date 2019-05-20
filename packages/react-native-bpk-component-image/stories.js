/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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
import { StyleSheet, Animated } from 'react-native';
import { spacingLg } from 'bpk-tokens/tokens/base.react.native';
import { storiesOf } from '@storybook/react-native';
import BpkThemeProvider from 'react-native-bpk-theming';

import CenterDecorator from '../../storybook/CenterDecorator';
import themeAttributes from '../../storybook/themeAttributes';

import BpkImage, { withLoadingBehaviour } from './index';

const BpkImageWithLoading = withLoadingBehaviour(BpkImage);
const CustomImage = props => <Animated.Image isCustom {...props} />;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: spacingLg * 10,
  },
});

storiesOf('react-native-bpk-component-image', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => (
    <BpkImage
      source={{
        uri: 'https://unsplash.com/photos/fZ1gqh4jPgM/download?force=true',
      }}
      style={styles.image}
    />
  ))
  .add('docs:no-border-radius', () => (
    <BpkImage
      rounded={false}
      source={{
        uri: 'https://unsplash.com/photos/NCq2PGvLWKM/download?force=true',
      }}
      style={styles.image}
    />
  ))
  .add('With Loading Behaviour', () => (
    <BpkImageWithLoading
      style={styles.image}
      source={{
        uri: 'https://unsplash.com/photos/HEkMWKpynBA/download?force=true',
      }}
    />
  ))
  .add('out-of-view', () => (
    <BpkImage
      inView={false}
      loaded={false}
      source={{
        uri: 'https://unsplash.com/photos/fZ1gqh4jPgM/download?force=true',
      }}
      style={styles.image}
    />
  ))
  .add('With Custom Image Component', () => (
    <BpkImage
      imageComponent={CustomImage}
      source={{
        uri: 'https://unsplash.com/photos/InrNz281-S8/download?force=true',
      }}
      style={styles.image}
    />
  ))
  .add('With Custom Loading Image Component', () => (
    <BpkImageWithLoading
      imageComponent={CustomImage}
      source={{
        uri: 'https://unsplash.com/photos/InrNz281-S8/download?force=true',
      }}
      style={styles.image}
    />
  ))
  .add('docs:with theme', () => (
    <BpkThemeProvider theme={themeAttributes}>
      <BpkImageWithLoading
        style={styles.image}
        source={{
          uri: 'https://unsplash.com/photos/HEkMWKpynBA/download?force=true',
        }}
      />
    </BpkThemeProvider>
  ));
