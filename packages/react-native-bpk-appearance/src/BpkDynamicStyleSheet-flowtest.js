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

/* eslint-disable backpack/use-tokens */
/* @flow */
import React from 'react';
import { View } from 'react-native';

import BpkDynamicStyleSheet from './BpkDynamicStyleSheet';
import { useBpkDynamicStyleSheet } from './hooks';

// TEST: Valid stylesshet definition with all props
const allStyles = BpkDynamicStyleSheet.create({
  view: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    aspectRatio: 1,
    backfaceVisibility: 'visible',
    backgroundColor: '#fff',
    borderBottomColor: '#fff',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
    borderColor: '#fff',
    borderLeftColor: '#fff',
    borderLeftWidth: 0,
    borderRadius: 1,
    borderRightColor: '#fff',
    borderRightWidth: 0,
    borderStyle: 'solid',
    borderTopColor: '#fff',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopWidth: 0,
    borderWidth: 0,
    bottom: 0,
    color: '#fff',
    direction: 'rtl',
    display: 'flex',
    elevation: 0,
    flex: 1,
    flexBasis: 0,
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    flexWrap: 'wrap',
    fontFamily: 'aria',
    fontSize: 14,
    fontStyle: 'italic',
    fontVariant: ['small-caps'],
    fontWeight: 'bold',
    height: 10,
    includeFontPadding: true,
    justifyContent: 'flex-start',
    left: 0,
    letterSpacing: 0,
    lineHeight: 0,
    margin: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginVertical: 0,
    maxHeight: 0,
    maxWidth: 0,
    minHeight: 0,
    minWidth: 0,
    opacity: 0,
    overflow: 'hidden',
    overlayColor: '#fff',
    padding: 0,
    paddingBottom: 0,
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingVertical: 0,
    position: 'relative',
    resizeMode: 'contain',
    right: 0,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    textDecorationColor: '#fff',
    textDecorationLine: 'none',
    textDecorationStyle: 'solid',
    textShadowColor: '#fff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 0,
    tintColor: '#fff',
    top: 0,
    transform: [{ rotateX: '45deg' }],
    width: 0,
    writingDirection: 'rtl',
    zIndex: 100,
  },
});

// TEST: Valid stylesshet definition using semantic colors for all color props
const allColours = BpkDynamicStyleSheet.create({
  view: {
    shadowColor: { light: 'l', dark: 'd' },
    backgroundColor: { light: 'l', dark: 'd' },
    borderColor: { light: 'l', dark: 'd' },
    borderBottomColor: { light: 'l', dark: 'd' },
    borderEndColor: { light: 'l', dark: 'd' },
    borderLeftColor: { light: 'l', dark: 'd' },
    borderRightColor: { light: 'l', dark: 'd' },
    borderStartColor: { light: 'l', dark: 'd' },
    borderTopColor: { light: 'l', dark: 'd' },
    color: { light: 'l', dark: 'd' },
    textShadowColor: { light: 'l', dark: 'd' },
    textDecorationColor: { light: 'l', dark: 'd' },
    overlayColor: { light: 'l', dark: 'd' },
    tintColor: { light: 'l', dark: 'd' },
  },
});

(() => <View style={[allStyles.light.view, allColours.light.view]} />)();
(() => <View style={[allStyles.dark.view, allColours.dark.view]} />)();
(() => {
  const currentStyle = useBpkDynamicStyleSheet(allStyles);
  return <View style={currentStyle.view} />;
})();

// TODO: Fix all flow warnings so we can uncomment this and add $FlowExpectedError to tests bellow and
// fail the build in case types are wrong

// TEST: Invalid stylesshet definition using invalid semantic colors for all color props
// (Uncoment to check)
// BpkDynamicStyleSheet.create({
//   view: {
//     shadowColor: { light: 'l' },
//     backgroundColor: { light: 'l' },
//     borderColor: { light: 'l' },
//     borderBottomColor: { light: 'l' },
//     borderEndColor: { light: 'l' },
//     borderLeftColor: { light: 'l' },
//     borderRightColor: { light: 'l' },
//     borderStartColor: { light: 'l' },
//     borderTopColor: { light: 'l' },
//     color: { light: 'l' },
//     textShadowColor: { light: 'l' },
//     textDecorationColor: { light: 'l' },
//     overlayColor: { light: 'l' },
//     tintColor: { light: 'l' },
//   },
// });

// TEST: Invalid stylesshet definition for other props (one for each type View, Text and Image)
// (Uncoment to check)
// BpkDynamicStyleSheet.create({
//   view: {
//     fontFamily: 1,
//     resizeMode: 'none',
//     flex: 'relative',
//   },
// });

// TEST: Invalid prop name
// (Uncoment to check)
// BpkDynamicStyleSheet.create({
//   view: {
//     invalid: null
//   },
// });
