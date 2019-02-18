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
import PropTypes from 'prop-types';
import { Button } from 'react-native';

export type Props = {
  title: string,
  onPress: (event: SyntheticEvent<any>) => void,
  color: ?string,
  accessibilityLabel: ?string,
  disabled: ?boolean,
};

const NewButtonLink = (props: Props) => {
  const { ...rest } = props;

  // eslint-disable-next-line backpack/use-components
  return <Button {...rest} />;
};

NewButtonLink.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.function.isRequired,
  color: PropTypes.string,
  accessibilityLabel: PropTypes.string,
  disabled: PropTypes.bool,
};

NewButtonLink.defaultProps = {
  color: null,
  accessibilityLabel: null,
  disabled: false,
};

export default NewButtonLink;
