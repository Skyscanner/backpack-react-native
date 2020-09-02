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

import BpkAlert from '../bpk-component-alert';

import BpkMap, { BpkPriceMarker, PRICE_MARKER_STATUSES } from './index';

const StatefulPriceMarkersExample = () => {
  const [selectedVenue, setSelectedVenue] = useState('2');
  const [viewedVenues, setViewedVenues] = useState(['1', '2']);

  const venues = [
    {
      id: '1',
      name: 'Hotel Monteverde',
      latitude: 35.68,
      longitude: 139.69,
      price: '£48',
      disabled: false,
    },
    {
      id: '2',
      name: 'Abisko Inn & Suites',
      latitude: 35.67,
      longitude: 139.7,
      price: '£151',
      disabled: false,
    },
    {
      id: '3',
      name: 'The Panjin Lounge',
      latitude: 35.65,
      longitude: 139.71,
      price: '£62',
      disabled: false,
    },
    {
      id: '4',
      name: 'Nara Bed & Breakfast',
      latitude: 35.63,
      longitude: 139.7,
      price: '£342',
      disabled: false,
    },
    {
      id: '5',
      name: 'Kolkata Springs Hotel',
      latitude: 35.635,
      longitude: 139.72,
      price: 'Sold out',
      disabled: true,
    },
  ];

  const onPressVenue = venue => {
    setSelectedVenue(venue.id);
    setViewedVenues([...viewedVenues, venue.id]);
    BpkAlert.alert(venue.name, `Price for one night: ${venue.price}.`);
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
            onPressVenue(venue);
          }}
          latitude={venue.latitude}
          longitude={venue.longitude}
          status={getVenueStatus(venue.id)}
          disabled={venue.disabled}
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
  .add('docs:price-markers', () => <StatefulPriceMarkersExample />);
