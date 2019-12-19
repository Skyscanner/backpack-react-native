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

import {
  BpkFlatListItem as BpkSectionListItem,
  BpkFlatListItemSeparator as BpkSectionListItemSeparator,
  BpkFlatListSearchField as BpkSectionListSearchField,
  BpkFlatListNoResultsText as BpkSectionListNoResultsText,
  type FlatListItemProps,
} from 'react-native-bpk-component-flat-list';

import BpkSectionList from './src/BpkSectionList';
import BpkSectionListHeader from './src/BpkSectionListHeader';

export type { FlatListItemProps as BpkSectionListItemProps };
export type {
  Props as BpkSectionListHeaderProps,
} from './src/BpkSectionListHeader';

export default BpkSectionList;
export {
  BpkSectionListItem,
  BpkSectionListHeader,
  BpkSectionListItemSeparator,
  BpkSectionListSearchField,
  BpkSectionListNoResultsText,
};
