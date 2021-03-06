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

import BpkText from './src/BpkText';
import BpkEmoji, { type Props as BpkEmojiProps } from './src/BpkEmoji';
import {
  TEXT_STYLES,
  WEIGHT_STYLES,
  propTypes,
  defaultProps,
  type DefaultProps as BpkTextDefaultProps,
  type Props as BpkTextProps,
} from './src/common-types';

export type { BpkTextProps, BpkTextDefaultProps, BpkEmojiProps };
export default BpkText;
export { BpkEmoji, propTypes, defaultProps, TEXT_STYLES, WEIGHT_STYLES };
