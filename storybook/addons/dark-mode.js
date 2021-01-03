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
import addons from '@storybook/addons';
import { AddonPanel } from '@storybook/components';

import { DM_INIT, DM_EVENT } from '../constants';

export const ID = 'dark-mode';
export const PANEL_ID = `${ID}/panel`;

class DarkModePanel extends React.Component<
  {},
  { colorScheme: 'light' | 'dark' },
> {
  constructor(props) {
    super(props);
    this.state = { colorScheme: 'light' };
  }

  componentDidMount() {
    const channel = addons.getChannel();
    channel.on(DM_INIT, this.initDM);
  }

  initDM = (colorScheme) => {
    this.setState({ colorScheme });
  };

  toggleDM = () => {
    this.setState((prevState) => {
      const colorScheme = prevState.colorScheme === 'light' ? 'dark' : 'light';
      const channel = addons.getChannel();
      channel.emit(DM_EVENT, colorScheme);
      return { colorScheme };
    });
  };

  render() {
    return (
      <div style={{ padding: '10px' }}>
        <button type="button" onClick={this.toggleDM}>
          Toogle Dark mode
        </button>
        <p>
          Dark mode is{' '}
          <strong>
            {this.state.colorScheme === 'dark' ? 'enabled' : 'disabled'}
          </strong>
          .
        </p>
      </div>
    );
  }
}

type RenderProps = {
  active: boolean,
  key: string,
};

// Register the addon with a unique name.
addons.register(ID, () => {
  const render = ({ active, key }: RenderProps) => (
    <AddonPanel active={active} key={key}>
      <DarkModePanel />
    </AddonPanel>
  );
  // Also need to set a unique name to the panel.
  addons.addPanel(PANEL_ID, {
    title: 'Dark mode',
    render,
  });
});
