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

import { ThemeProvider } from 'theming';

import createWithTheme from './create-with-theme';
import createWithThemeForwardRef from './create-with-theme-forward-ref';

const BpkThemeProvider = ThemeProvider;

// TODO (BPK-3639): Upgrade theming package and remove this
const cwm = ThemeProvider.prototype.componentWillMount;
const cwrp = ThemeProvider.prototype.componentWillReceiveProps;

BpkThemeProvider.prototype.UNSAFE_componentWillMount = cwm;
BpkThemeProvider.prototype.UNSAFE_componentWillReceiveProps = cwrp;

delete BpkThemeProvider.prototype.componentWillMount;
delete BpkThemeProvider.prototype.componentWillReceiveProps;

export default BpkThemeProvider;
const withTheme = createWithTheme();
const withThemeForwardRef = createWithThemeForwardRef();
export { withTheme, withThemeForwardRef };
