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
import { colorPanjin } from 'bpk-tokens/tokens/base.react.native';

import { describeEachColorScheme } from '../../bpk-test-utils';

import BpkText from './BpkText';
import { TEXT_STYLES, WEIGHT_STYLES } from './common-types';

const commonTests = () => {
  describe('BpkText', () => {
    describeEachColorScheme(BpkText, TextWithColorScheme => {
      it('should render correctly', () => {
        const tree = renderer
          .create(
            <TextWithColorScheme>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </TextWithColorScheme>,
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should support overwriting styles', () => {
        const tree = renderer
          .create(
            <TextWithColorScheme style={{ color: colorPanjin }}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </TextWithColorScheme>,
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    it('should render correctly when textStyle is set to inherit', () => {
      const tree = renderer
        .create(
          <BpkText textStyle="xxxl">
            <BpkText textStyle="inherit">Inherited text</BpkText>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </BpkText>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should use default props when nested textStyle is set to anything other than inherit', () => {
      const tree = renderer
        .create(
          <BpkText textStyle="xxxl">
            <BpkText>Non-inherited text</BpkText>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </BpkText>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with deprecated `emphasize` prop', () => {
      const consoleWarnFn = jest.fn();
      jest.spyOn(console, 'warn').mockImplementation(consoleWarnFn);
      const tree = renderer
        .create(
          <BpkText emphasize>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </BpkText>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
      expect(consoleWarnFn.mock.calls.length).toBe(1);
    });

    it('should ignore weight prop if deprecated `emphasize` prop is being used', () => {
      const consoleWarnFn = jest.fn();
      jest.spyOn(console, 'warn').mockImplementation(consoleWarnFn);
      const tree = renderer
        .create(
          <BpkText textStyle="xxl" emphasize weight={WEIGHT_STYLES.heavy}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </BpkText>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
      expect(consoleWarnFn.mock.calls.length).toBe(1);
    });

    TEXT_STYLES.forEach(textStyle => {
      it(`should render correctly with textStyle="${textStyle}"`, () => {
        const tree = renderer
          .create(
            <BpkText textStyle={textStyle}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </BpkText>,
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
    TEXT_STYLES.forEach(textStyle => {
      it(`should render correctly with textStyle="${textStyle} and weight="emphasized"`, () => {
        const tree = renderer
          .create(
            <BpkText weight={WEIGHT_STYLES.emphasized} textStyle={textStyle}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </BpkText>,
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
    TEXT_STYLES.filter(s => s.includes(`xl`)).forEach(textStyle => {
      it(`should render correctly with textStyle="${textStyle} and weight="heavy"`, () => {
        const tree = renderer
          .create(
            <BpkText weight={WEIGHT_STYLES.heavy} textStyle={textStyle}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </BpkText>,
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
};

export default commonTests;
