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
import {
  colorPanjin,
  colorMonteverde,
  spacingSm,
  colorSkyGrayTint06,
  colorBlackTint05,
} from 'bpk-tokens/tokens/base.react.native';

import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../../bpk-appearance';
import BpkIcon, { icons } from '../../bpk-component-icon';

const dynamicStyles = BpkDynamicStyleSheet.create({
  icon: {
    marginStart: spacingSm,
  },
  valid: {
    color: colorMonteverde,
  },
  invalid: {
    color: colorPanjin,
  },
  iconDisabled: {
    color: { light: colorSkyGrayTint06, dark: colorBlackTint05 },
  },
});

const ValidIcon = () => {
  const styles = useBpkDynamicStyleSheet(dynamicStyles);
  return (
    <BpkIcon icon={icons.tick} small style={[styles.icon, styles.valid]} />
  );
};

const InvalidIcon = () => {
  const styles = useBpkDynamicStyleSheet(dynamicStyles);
  return (
    <BpkIcon
      icon={icons['exclamation-circle']}
      small
      style={[styles.icon, styles.invalid]}
    />
  );
};

type SelectIconProps = {
  disabled: boolean,
};

const SelectIcon = ({ disabled }: SelectIconProps) => {
  const styles = useBpkDynamicStyleSheet(dynamicStyles);
  return (
    <BpkIcon
      style={[styles.icon, disabled ? styles.iconDisabled : null]}
      icon={icons['arrow-down']}
      small
    />
  );
};

SelectIcon.defaultProps = {
  disabled: false,
};

export { ValidIcon, InvalidIcon, SelectIcon };
