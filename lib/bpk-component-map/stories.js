/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

import React, { useState } from 'react';
import { storiesOf } from '@storybook/react-native';

import BpkMap, { BpkPriceMarker, PRICE_MARKER_STATUSES } from './index';

const StatefulExample = () => {
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [viewedVenues, setViewedVenues] = useState([]);

  const venues = [
    {
      id: '1',
      latitude: 35.68,
      longitude: 139.69,
      price: '£48',
    },
    {
      id: '2',
      latitude: 35.67,
      longitude: 139.7,
      price: '£151',
    },
    {
      id: '3',
      latitude: 35.65,
      longitude: 139.71,
      price: '£62',
    },
    {
      id: '4',
      latitude: 35.63,
      longitude: 139.7,
      price: '£342',
    },
  ];

  const onPressVenue = id => {
    setSelectedVenue(id);
    setViewedVenues([...viewedVenues, id]);
  };

  const getVenueStatus = id => {
    if (selectedVenue === id) {
      return PRICE_MARKER_STATUSES.focused;
    }
    if (viewedVenues.includes(id)) {
      return PRICE_MARKER_STATUSES.viewed;
    }
    return PRICE_MARKER_STATUSES.default;
  };

  return (
    <BpkMap
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 35.661777,
        longitude: 139.704051,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {venues.map(venue => (
        <BpkPriceMarker
          key={venue.id}
          label={venue.price}
          onPress={() => {
            onPressVenue(venue.id);
          }}
          latitude={venue.latitude}
          longitude={venue.longitude}
          status={getVenueStatus(venue.id)}
        />
      ))}
    </BpkMap>
  );
};

storiesOf('bpk-component-map', module)
  .add('docs:default', () => (
    <BpkMap
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 35.661777,
        longitude: 139.704051,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  ))
  .add('docs:price-marker', () => (
    <BpkMap
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 35.661777,
        longitude: 139.704051,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <BpkPriceMarker label="£48" latitude={35.68} longitude={139.69} />
      <BpkPriceMarker
        label="£151"
        latitude={35.67}
        longitude={139.7}
        status={PRICE_MARKER_STATUSES.focused}
      />
      <BpkPriceMarker
        label="£62"
        latitude={35.65}
        longitude={139.71}
        status={PRICE_MARKER_STATUSES.viewed}
      />
      <BpkPriceMarker
        disabled
        label="Sold out"
        latitude={35.63}
        longitude={139.7}
      />
    </BpkMap>
  ))
  .add('Stateful price marker example', () => <StatefulExample />);
