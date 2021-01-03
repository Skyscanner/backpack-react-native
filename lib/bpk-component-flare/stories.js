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
import { StyleSheet, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import {
  colorSkyBlue,
  spacingLg,
  spacingXl,
  colorWhite,
  colorSkyGray,
} from 'bpk-tokens/tokens/base.react.native';

import BpkText from '../bpk-component-text';
import BpkImage from '../bpk-component-image';

import BpkFlare, { FLARE_POINTER_DIRECTIONS } from './index';

const style = StyleSheet.create({
  flare: {
    top: spacingXl,
    width: '100%',
    maxHeight: '30%',
    overflow: 'visible',
    backgroundColor: colorSkyGray,
  },
  flareWithText: {
    backgroundColor: colorSkyBlue,
  },
  insetBottomflareTextContainer: {
    alignItems: 'center',
    flex: 1,
    paddingTop: spacingLg,
  },
  backgroundImageTextContainer: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: colorWhite,
    marginBottom: spacingLg,
  },
});

storiesOf('bpk-component-flare', module)
  .add('docs:default', () => (
    <BpkFlare style={[style.flare, style.flareWithText]}>
      <View style={style.insetBottomflareTextContainer}>
        <BpkText style={style.title} textStyle="xxl" weight="heavy">
          Lorem ipsum
        </BpkText>
      </View>
    </BpkFlare>
  ))
  .add('docs:image', () => (
    <BpkFlare style={style.flare}>
      <BpkImage
        rounded={false}
        source={{
          uri: 'https://unsplash.com/photos/fZ1gqh4jPgM/download?force=true',
        }}
      />
    </BpkFlare>
  ))
  .add('docs:pointer-up', () => (
    <BpkFlare
      pointerDirection={FLARE_POINTER_DIRECTIONS.up}
      style={[style.flare, style.flareWithText]}
    >
      <View style={style.insetBottomflareTextContainer}>
        <BpkText style={style.title} textStyle="xxl" weight="heavy">
          Lorem ipsum
        </BpkText>
      </View>
    </BpkFlare>
  ))
  .add('Image and text', () => (
    <BpkFlare style={style.flare}>
      <BpkImage
        rounded={false}
        source={{
          uri: 'https://unsplash.com/photos/vpHdVI4jaec/download?force=true',
        }}
      />
      <View style={style.backgroundImageTextContainer}>
        <BpkText
          style={{ marginTop: spacingLg, color: colorSkyGray }}
          weight="heavy"
          textStyle="xxxl"
        >
          Where to go next?
        </BpkText>
      </View>
    </BpkFlare>
  ));
