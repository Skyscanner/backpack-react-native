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

// As this is just a test, we don't need to worry about using the hooks outside the context of a React component
/* eslint-disable react-hooks/rules-of-hooks */

/* @flow */
import { useBpkDynamicValue, useBpkDynamicStyle } from './hooks';
import { type BpkDynamicValue } from './common-types';

const value = useBpkDynamicValue({ dark: 'string', light: 'string' });
(value: string); // eslint-disable-line no-unused-expressions

const value1 = useBpkDynamicValue({ dark: 1, light: 2 });
(value1: number); // eslint-disable-line no-unused-expressions

const value2 = useBpkDynamicValue({ dark: true, light: false });
(value2: boolean); // eslint-disable-line no-unused-expressions

const value3 = useBpkDynamicValue({ dark: [1, 2], light: [1, 2] });
(value3: Array<number>); // eslint-disable-line no-unused-expressions

const value4 = useBpkDynamicValue({ dark: ['1', '2'], light: ['1', '2'] });
(value4: Array<string>); // eslint-disable-line no-unused-expressions

const value5 = useBpkDynamicValue({ dark: [true], light: [false] });
(value5: Array<boolean>); // eslint-disable-line no-unused-expressions

const value6 = useBpkDynamicValue({
  dark: [1, 'string'],
  light: [2, 'string'],
});
// TODO: this is resolving to any at the moment, but there is no easy way to fix
(value6: Array<number | string>); // eslint-disable-line no-unused-expressions

const value7 = useBpkDynamicStyle({
  backgroundColor: { light: 'string', dark: 'string' },
});
(value7: { backgroundColor: string }); // eslint-disable-line no-unused-expressions

const value8 = useBpkDynamicStyle({
  backgroundColor: { light: 1, dark: 2 },
});
(value8: { backgroundColor: number }); // eslint-disable-line no-unused-expressions

const value9 = useBpkDynamicStyle({
  backgroundColor: { light: true, dark: false },
});
(value9: { backgroundColor: boolean }); // eslint-disable-line no-unused-expressions

const value10 = useBpkDynamicStyle({
  backgroundColor: { light: ['string'], dark: ['string'] },
});
(value10: { backgroundColor: string[] }); // eslint-disable-line no-unused-expressions

const value11 = useBpkDynamicStyle({
  backgroundColor: { light: [1], dark: [1] },
});
(value11: { backgroundColor: number[] }); // eslint-disable-line no-unused-expressions

const value12 = useBpkDynamicStyle({
  backgroundColor: { light: [true], dark: [true] },
});
(value12: { backgroundColor: boolean[] }); // eslint-disable-line no-unused-expressions

declare function stringOrDynamic(): string | BpkDynamicValue<string>;
declare function numberOrDynamic(): number | BpkDynamicValue<number>;
declare function booleanOrDynamic(): boolean | BpkDynamicValue<boolean>;

declare function stringArrayOrDynamic(): string[] | BpkDynamicValue<string[]>;
declare function numberArrayOrDynamic(): number[] | BpkDynamicValue<number[]>;
declare function booleanArrayOrDynamic():
  | boolean[]
  | BpkDynamicValue<boolean[]>;

const value13 = useBpkDynamicStyle({ backgroundColor: stringOrDynamic() });
(value13: { backgroundColor: string }); // eslint-disable-line no-unused-expressions

const value14 = useBpkDynamicStyle({ backgroundColor: numberOrDynamic() });
(value14: { backgroundColor: number }); // eslint-disable-line no-unused-expressions

const value15 = useBpkDynamicStyle({ backgroundColor: booleanOrDynamic() });
(value15: { backgroundColor: boolean }); // eslint-disable-line no-unused-expressions

const value16 = useBpkDynamicStyle({ backgroundColor: stringArrayOrDynamic() });
(value16: { backgroundColor: string[] }); // eslint-disable-line no-unused-expressions

const value17 = useBpkDynamicStyle({ backgroundColor: numberArrayOrDynamic() });
(value17: { backgroundColor: number[] }); // eslint-disable-line no-unused-expressions

const value18 = useBpkDynamicStyle({
  backgroundColor: booleanArrayOrDynamic(),
});
(value18: { backgroundColor: boolean[] }); // eslint-disable-line no-unused-expressions

// These should all fail, uncoment to test
// (value: number); // eslint-disable-line
// (value1: string); // eslint-disable-line
// (value2: string); // eslint-disable-line
// (value3: Array<string>); // eslint-disable-line
// (value4: Array<number>); // eslint-disable-line
// (value5: Array<string>); // eslint-disable-line
// // 6 left out on purpose as it resolves to any
// (value7: { backgroundColor: number }); // eslint-disable-line
// (value8: { backgroundColor: string }); // eslint-disable-line
// (value9: { backgroundColor: string }); // eslint-disable-line
// (value10: { backgroundColor: number[] }); // eslint-disable-line
// (value11: { backgroundColor: string[] }); // eslint-disable-line
// (value12: { backgroundColor: number[] }); // eslint-disable-line
// (value13: { backgroundColor: number[] }); // eslint-disable-line
// (value14: { backgroundColor: string }); // eslint-disable-line
// (value15: { backgroundColor: number }); // eslint-disable-line
// (value16: { backgroundColor: number[] }); // eslint-disable-line
// (value17: { backgroundColor: string[] }); // eslint-disable-line
// (value18: { backgroundColor: number[] }); // eslint-disable-line
