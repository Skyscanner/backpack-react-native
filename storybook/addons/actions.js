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

import { decorate } from '@storybook/addon-actions';

const createParser = () => {
  const parseCache = [];
  const parseObject = (
    parsed: { [key: string]: any },
    [key: string, value: mixed],
  ) => {
    if (key.indexOf('_') === 0 || typeof value === 'function') {
      return parsed;
    }

    if (value != null && parseCache.indexOf(value) !== -1) {
      return parsed;
    }

    if (typeof value === 'object' && value != null) {
      parseCache.push(value);
      return {
        ...parsed,
        [key]: Object.entries(value).reduce(parseObject, {}),
      };
    }

    return { ...parsed, [key]: value };
  };

  return parseObject;
};

const { action } = decorate([
  (args) =>
    args.map((a) => {
      if (typeof a !== 'object') {
        return a;
      }

      const parser = createParser();
      return Object.entries(a).reduce(parser, {});
    }),
]);

/**
 * Creates an action that can handle cyclic object structures as StoryBook is not able to handle
 * this currently.
 *
 * Note that this might end up removing some props from the action object so don't rely 100% on
 * this output if you are looking for all possible props of an event.
 *
 * @returns {Function} action creator
 */
export default action;
