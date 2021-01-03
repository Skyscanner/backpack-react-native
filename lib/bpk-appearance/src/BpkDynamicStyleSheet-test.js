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

/* eslint-disable backpack/use-tokens */
import BpkDynamicStyleSheet from './BpkDynamicStyleSheet';

const style = {
  backgroundColor: { light: '#fff', dark: '#f0f' },
  borderBottomColor: { light: '#fff', dark: '#f0f' },
  borderBottomLeftRadius: { light: 1, dark: 0 },
  borderBottomRightRadius: { light: 1, dark: 0 },
  borderBottomWidth: { light: 1, dark: 0 },
  borderColor: { light: '#fff', dark: '#f0f' },
  borderEndColor: { light: '#fff', dark: '#f0f' },
  borderLeftColor: { light: '#fff', dark: '#f0f' },
  borderLeftWidth: { light: 1, dark: 0 },
  borderRadius: { light: 1, dark: 0 },
  borderRightColor: { light: '#fff', dark: '#f0f' },
  borderRightWidth: { light: 1, dark: 0 },
  borderStartColor: { light: '#fff', dark: '#f0f' },
  borderStyle: { light: 'dotted', dark: 'solid' },
  borderTopColor: { light: '#fff', dark: '#f0f' },
  borderTopLeftRadius: { light: 1, dark: 0 },
  borderTopRightRadius: { light: 1, dark: 0 },
  borderTopWidth: { light: 1, dark: 0 },
  borderWidth: { light: 1, dark: 0 },
  bottom: { light: 1, dark: 0 },
  color: { light: '#fff', dark: '#f0f' },
  direction: { light: 'rtl', dark: 'rtl' },
  display: { light: 'flex', dark: 'flex' },
  elevation: { light: 1, dark: 0 },
  flex: { light: 1, dark: 0 },
  flexBasis: { light: 1, dark: 0 },
  flexDirection: { light: 'row', dark: 'column' },
  flexGrow: { light: 1, dark: 0 },
  flexShrink: { light: 1, dark: 0 },
  flexWrap: { light: 'wrap', dark: 'nowrap' },
  fontFamily: { light: 'aria', dark: 'roboto' },
  fontSize: { light: 14, dark: 16 },
  fontStyle: { light: 'italic', dark: 'italic' },
  fontVariant: { light: ['small-caps'], dark: ['small-caps'] },
  fontWeight: { light: 'bold', dark: 'normal' },
  height: { light: 10, dark: 20 },
  includeFontPadding: { light: false, dark: true },
  justifyContent: { light: 'flex-start', dark: 'flex-end' },
  left: { light: 1, dark: 0 },
  letterSpacing: { light: 1, dark: 0 },
  lineHeight: { light: 1, dark: 0 },
  margin: { light: 1, dark: 0 },
  marginBottom: { light: 1, dark: 0 },
  marginHorizontal: { light: 1, dark: 0 },
  marginLeft: { light: 1, dark: 0 },
  marginRight: { light: 1, dark: 0 },
  marginTop: { light: 1, dark: 0 },
  marginVertical: { light: 1, dark: 0 },
  maxHeight: { light: 1, dark: 0 },
  maxWidth: { light: 1, dark: 0 },
  minHeight: { light: 1, dark: 0 },
  minWidth: { light: 1, dark: 0 },
  opacity: { light: 1, dark: 0 },
  overflow: { light: 'hidden', dark: 'visible' },
  overlayColor: { light: '#fff', dark: '#f0f' },
  padding: { light: 1, dark: 0 },
  paddingBottom: { light: 1, dark: 0 },
  paddingHorizontal: { light: 1, dark: 0 },
  paddingLeft: { light: 1, dark: 0 },
  paddingRight: { light: 1, dark: 0 },
  paddingTop: { light: 1, dark: 0 },
  paddingVertical: { light: 1, dark: 0 },
  position: { light: 'relative', dark: 'absolute' },
  resizeMode: { light: 'contain', dark: 'cover' },
  right: { light: 1, dark: 0 },
  shadowColor: { light: '#fff', dark: '#f0f' },
  shadowOffset: {
    light: { width: 0, height: 0 },
    dark: { width: 1, height: 2 },
  },
  shadowOpacity: { light: 1, dark: 0 },
  shadowRadius: { light: 1, dark: 0 },
  textAlign: { light: 'center', dark: 'left' },
  textAlignVertical: { light: 'center', dark: 'top' },
  textDecorationColor: { light: '#fff', dark: '#f0f' },
  textDecorationLine: { light: 'none', dark: 'none' },
  textDecorationStyle: { light: 'solid', dark: 'solid' },
  textShadowColor: { light: '#fff', dark: '#f0f' },
  textShadowOffset: {
    light: { width: 0, height: 0 },
    dark: { width: 1, height: 2 },
  },
  textShadowRadius: { light: 1, dark: 0 },
  tintColor: { light: '#fff', dark: '#f0f' },
  top: { light: 1, dark: 0 },
  transform: { light: [{ rotateX: '45deg' }], dark: [{ rotateX: '45deg' }] },
  width: { light: 1, dark: 0 },
  writingDirection: { light: 'rtl', dark: 'ltr' },
  zIndex: { light: 100, dark: 0 },
};

const simpleStyle = {
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
  borderEndColor: '#fff',
  borderLeftColor: '#fff',
  borderLeftWidth: 0,
  borderRadius: 1,
  borderRightColor: '#fff',
  borderRightWidth: 0,
  borderStartColor: '#fff',
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
};

const colorProps = Object.keys(style);

describe('BpkDynamicStyleSheet', () => {
  const subject = BpkDynamicStyleSheet.create({
    simpleStyle: {
      ...simpleStyle,
    },
    view: {
      ...style,
    },
    topLevel: {
      light: {
        ...style,
      },
      dark: {
        ...style,
      },
    },
    topLevelSimple: {
      light: {
        ...simpleStyle,
      },
      dark: {
        ...simpleStyle,
      },
    },
  });

  it.each(colorProps)('parses dynamic values for `%s` prop', (colorProp) => {
    expect(subject.light.view[colorProp]).toEqual(style[colorProp].light);
    expect(subject.dark.view[colorProp]).toEqual(style[colorProp].dark);
  });

  it.each(colorProps)('parses simple values for `%s` prop', (colorProp) => {
    expect(subject.light.simpleStyle[colorProp]).toEqual(
      simpleStyle[colorProp],
    );
    expect(subject.dark.simpleStyle[colorProp]).toEqual(simpleStyle[colorProp]);
  });

  describe('top level dynamic style', () => {
    it.each(colorProps)('parses dynamic values for `%s` prop', (colorProp) => {
      expect(subject.light.topLevel[colorProp]).toEqual(style[colorProp].light);
      expect(subject.dark.topLevel[colorProp]).toEqual(style[colorProp].dark);
    });

    it.each(colorProps)('parses simple values for `%s` prop', (colorProp) => {
      expect(subject.light.topLevelSimple[colorProp]).toEqual(
        simpleStyle[colorProp],
      );
      expect(subject.dark.topLevelSimple[colorProp]).toEqual(
        simpleStyle[colorProp],
      );
    });
  });

  it('should not fail with undefined or null styles', () => {
    const nullStyle = BpkDynamicStyleSheet.create({
      one: undefined,
      two: null,
    });
    expect(nullStyle.light.one).toBe(undefined);
    expect(nullStyle.light.two).toBe(null);

    expect(nullStyle.dark.one).toBe(undefined);
    expect(nullStyle.dark.two).toBe(null);
  });
});
