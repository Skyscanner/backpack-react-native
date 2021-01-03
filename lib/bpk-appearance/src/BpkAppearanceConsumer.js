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

import { type Node } from 'react';

import { type BpkAppearancePreferences } from './BpkAppearance';
import { useBpkAppearance } from './hooks';

export type ChildrenProps = {
  bpkAppearance: BpkAppearancePreferences,
};

export type Props = {
  children: (props: ChildrenProps) => Node,
};

/**
 * A render prop component that provides the current BpkAppearance
 * as provided by the nearest [BpkAppearanceProvider].
 *
 * NOTE: This component should mainly be used in class components, for
 * functional components we recommend using the provided hooks.
 *
 * @example
 * <BpkAppearanceConsumer>
 *   {({ bpkAppearance }) => {
 *    const logo = unpackDynamicValue({ light: 'light.png', dark: 'dark.png' }, bpkAppearance);
 *    return <BpkImage style={styles.image} alt="image title" source={{uri: logo}} />
 *   }}
 * </BpkAppearanceConsumer>
 *
 * @see https://reactjs.org/docs/render-props.html
 * @param {Function} children - Function that will receive the current appearance and should return a react Node.
 * @returns {Node} a react Node.
 */
const BpkAppearanceConsumer = ({ children }: Props) => {
  const bpkAppearance = useBpkAppearance();
  return children({ bpkAppearance });
};

export default BpkAppearanceConsumer;
