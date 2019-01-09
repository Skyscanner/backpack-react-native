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
import {
  type StyleObj,
  Text,
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native';

/* eslint-disable */
const styles = StyleSheet.create({
  base: {
    backgroundColor: 'red',
  },
});
/* eslint-enable */

export type Props = {
  style: ?StyleObj,
};

const BpkCalendar = (props: Props) => {
  const { style: userStyle, ...rest } = props;

  const style = [styles.base];
  if (userStyle) {
    style.push(userStyle);
  }

  /* eslint-disable */
  return (
    <View style={style} {...rest}>
      <Text>THIS COMPONENT HAS NOT BEEN BRIDGED YET</Text>
    </View>
  );
  /* eslint-enable */
};

BpkCalendar.propTypes = {
  style: ViewPropTypes.style,
};

BpkCalendar.defaultProps = {
  style: null,
};

export default BpkCalendar;
