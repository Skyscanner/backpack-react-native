# bpk-component-flat-list

> Backpack React Native flat list component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import { Image } from 'react-native';
import BpkFlatList, {
  BpkFlatListItem,
  BpkFlatListItemSeparator,
  BpkFlatListSearchField,
  BpkFlatListNoResultsText,
  } from 'backpack-react-native/bpk-component-flat-list';

const COUNTRIES = [
  { id: 'DZ', name: 'Algeria' },
  { id: 'CA', name: 'Canada' },
  { id: 'CD', name: 'Democratic Republic of the Congo' },
  { id: 'IT', name: 'Italy' },
  { id: 'JP', name: 'Japan' },
  { id: 'SE', name: 'Sweden' },
  { id: 'GB', name: 'United Kingdom' },
];

const FLAG_IMAGES = {
  'DZ': '/resources/algeria.png',
  'CA': '/resources/canada.png',
  'CD': '/resources/drcongo.png',
  'IT': '/resources/italy.png',
  'JP': '/resources/japan.png',
  'SE': '/resources/sweden.png',
  'GB': '/resources/uk.png',
};

export default class App extends Component {
  constructor() {
    super();
    this.itemOnPressCallbacks = {};
  }

  getItemOnPressCallback = countryId => {
    this.itemOnPressCallbacks[countryId] =
      this.itemOnPressCallbacks[countryId] ||
      (() => console.log(countryId));
    return this.itemOnPressCallbacks[countryId];
  };

  renderItem = ({ country }) => (
    <BpkFlatListItem
      key={country.id}
      title={country.name}
      image={<Image source={require(FLAG_IMAGES[country.id])} />}
      onPress={this.getItemOnPressCallback(country.id)}
      titleProps={{ weight: 'regular' }}
    />
  );

  filterItems = text => {
    // Logic to filter the data based on user input.
  }

  render() {
    return (
      <BpkFlatList
        data={COUNTRIES}
        renderItem={this.renderItem}
        ItemSeparatorComponent={BpkFlatListItemSeparator}
        ListHeaderComponent={
          <BpkFlatListSearchField
            placeholder="Search countries"
            onChangeText={this.filterItems}
          />
        }
        ListEmptyComponent={
          <BpkFlatListNoResultsText>No results</BpkFlatListNoResultsText>
        }
      />
    );
  }
}
```

## Props

### BpkFlatList

Inherits all props from React Native's [FlatList](https://facebook.github.io/react-native/docs/flatlist.html) component.

### BpkFlatListItem

| Property           | PropType                              | Required | Default Value |
| ------------------ | ------------------------------------- | -------- | ------------- |
| onPress            | func                                  | true     | -             |
| title              | string                                | true     | -             |
| image              | element                               | false    | null          |
| selected           | bool                                  | false    | false         |
| titleProps         | object                                | false    | {}            |

#### `titleProps`

`titleProps` is passed down to the `BpkText` used for the title. It accepts anything that React Native's [`Text` component](https://facebook.github.io/react-native/docs/text.html#props) does.

### BpkFlatListItemSeparator

Use this as the value for [`ItemSeparatorComponent`](https://facebook.github.io/react-native/docs/flatlist#itemseparatorcomponent).

No props.

### BpkFlatListSearchField

This can be used as the value for [`ListHeaderComponent`](https://facebook.github.io/react-native/docs/flatlist#listheadercomponent) to allow users to search the list.

It's an instance of React Native's [`TextInput`](https://facebook.github.io/react-native/docs/textinput) component and accepts the same props.

### BpkFlatListNoResultsText

Use this as the value for [`ListEmptyComponent`](https://facebook.github.io/react-native/docs/flatlist#listemptycomponent). It's generally only needed when the list can be searched.

| Property           | PropType                              | Required | Default Value |
| ------------------ | ------------------------------------- | -------- | ------------- |
| children           | Node                                  | true     | -             |

## Theme Props

* `flatListSelectedItemColor`
