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

export const dismissablePropType = (
  props: { [string]: any },
  propName: string,
  componentName: string,
) => {
  if (props[propName] && props.children !== null) {
    return new Error(
      `Invalid prop \`${propName}\` with value \`${props[propName]}\` supplied to \`${componentName}\`. Banner alert cannot be expanded to show children if it is dismissable.`,
    );
  }

  return false;
};
export const toggleExpandedButtonLabelPropType = (
  props: { [string]: any },
  propName: string,
  componentName: string,
) => {
  if (!props[propName] && props.children !== null) {
    return new Error(
      `Invalid prop \`${propName}\` with value \`${props[propName]}\` supplied to \`${componentName}\`.`,
    );
  }

  return false;
};
export const dismissableLabelPropType = (
  props: { [string]: any },
  propName: string,
  componentName: string,
) => {
  if (
    props.dismissable &&
    (!props[propName] || !typeof props[propName] === 'string')
  ) {
    return new Error(
      `Invalid prop \`${propName}\` with value \`${props[propName]}\` supplied to \`${componentName}\`.`,
    );
  }
  return false;
};
export default {
  dismissablePropType,
  toggleExpandedButtonLabelPropType,
  dismissableLabelPropType,
};
