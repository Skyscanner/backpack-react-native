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
import React from 'react';
import addons from '@storybook/addons';
import { AddonPanel } from '@storybook/components';

import { RTL_EVENT, RTL_INIT } from '../constants';

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rtlEnabled: false,
    };
  }

  componentDidMount() {
    const channel = addons.getChannel();
    channel.on(RTL_INIT, this.initRtl);
  }

  initRtl = (rtlEnabled) => {
    this.setState({ rtlEnabled });
  };

  toggleRtl = () => {
    this.setState((prevState) => {
      const rtlEnabled = !prevState.rtlEnabled;
      const channel = addons.getChannel();
      channel.emit(RTL_EVENT, rtlEnabled);
      return { rtlEnabled };
    });
  };

  render() {
    return (
      <div style={{ padding: '10px' }}>
        <button type="button" onClick={this.toggleRtl}>
          Toogle RTL
        </button>
        <p>
          RTL is{' '}
          <strong>{this.state.rtlEnabled ? 'enabled' : 'disabled'}</strong>.
        </p>
        <p>Reload the app to apply changes.</p>
      </div>
    );
  }
}

// Register the addon with a unique name.
addons.register('rtl-toggle', (api) => {
  // Also need to set a unique name to the panel.
  addons.addPanel('rtl-toggle/panel', {
    title: 'RTL',
    render: (
      { active, key }, // eslint-disable-line react/prop-types
    ) => (
      <AddonPanel active={active} key={key}>
        <Panel channel={addons.getChannel()} api={api} />
      </AddonPanel>
    ),
  });
});
