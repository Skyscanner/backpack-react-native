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
import { View } from 'react-native';

import { defaultProps, propTypes, type Props } from './common-types';
import NativeRating from './NativeRating';

const arrify = (maybeArray: Array<string> | string): Array<string> =>
  Array.isArray(maybeArray) ? maybeArray : [maybeArray];

const BpkRating = (props: Props) => {
  const { title, subtitle, value, size, orientation, ...outerProps } = props;

  // These two casts are required beacuse Flow cannot cast
  // `[string, string, string]` to `Array<string> | string`.
  // This is safe because a three value tuple is just a form
  // of array.
  const titleValue: Array<string> | string = (title: any);
  const subtitleValue: Array<string> | string = (title: any);

  return (
    <View {...outerProps}>
      <NativeRating
        title={arrify(titleValue)}
        subtitle={arrify(subtitleValue)}
        size={size}
        value={value}
        orientation={orientation}
      />
    </View>
  );
};

BpkRating.propTypes = propTypes;
BpkRating.defaultProps = defaultProps;

export default BpkRating;
