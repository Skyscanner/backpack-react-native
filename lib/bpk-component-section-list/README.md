# bpk-component-section-list

> Backpack React Native section list component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import { Image } from 'react-native';
import BpkSectionList, {
  BpkSectionListHeader,
  BpkSectionListItem,
  BpkSectionListItemSeparator,
  BpkSectionListSearchField,
  BpkSectionListNoResultsText,
} from 'backpack-react-native/bpk-component-section-list';

const AIRPORTS = [
  {
    title: 'Beijing',
    country: 'CN',
    data: [{ id: 'PEK', name: 'Capital' }, { id: 'NAY', name: 'Nanyuan' }],
  },
  {
    title: 'Glasgow',
    country: 'UK',
    data: [
      {
        id: 'GLA',
        name: 'Glasgow International',
      },
      { id: 'PIK', name: 'Prestwick' },
    ],
  },
  {
    title: 'Paris',
    country: 'FR',
    data: [
      { id: 'BVA', name: 'Beauvais' },
      { id: 'CDG', name: 'Charles de Gaulle' },
      { id: 'ORY', name: 'Orly' },
    ],
  },
  {
    title: 'New York City',
    country: 'US',
    data: [
      { id: 'JFK', name: 'John F. Kennedy' },
      { id: 'LGA', name: 'LaGuardia' },
      { id: 'EWR', name: 'Newark' },
    ],
  },
];

const FLAG_IMAGES = {
  'US': '/resources/usa.png',
  'FR': '/resources/france.png',
  'CN': '/resources/china.png',
  'UK': '/resources/uk.png',
};

export default class App extends Component {
  constructor() {
    super();
    this.itemOnPressCallbacks = {};
  }

  getItemOnPressCallback = airportId => {
    this.itemOnPressCallbacks[airportId] =
      this.itemOnPressCallbacks[airportId] ||
      (() => console.log(airportId));
    return this.itemOnPressCallbacks[airportId];
  };

  renderItem = ({ airport, section }) => (
    <BpkSectionListItem
      key={airport.id}
      title={airport.name}
      image={<Image source={require(FLAG_IMAGES[section.country])} />}
      onPress={this.getItemOnPressCallback(airportId)}
      titleProps={{ numberOfLines: 1 }}
    />
  );

    filterItems = text => {
      // Logic to filter the data based on user input.
    }

  render() {
    return (
      <BpkSectionList
        sections={AIRPORTS}
        renderItem={this.renderItem}
        renderSectionHeader={(section) => (
          <BpkSectionListHeader title={section.title} />
        )}
        ItemSeparatorComponent={BpkSectionListItemSeparator}
        ListHeaderComponent={
          <BpkSectionListSearchField
            placeholder="Search airports"
            onChangeText={this.filterItems}
          />
        }
        ListEmptyComponent={
          <BpkSectionListNoResultsText>No results</BpkFlatListNoResultsText>
        }
      />
    );
  }
}
```

## Props

### BpkSectionList

Inherits all props from React Native's [SectionList](https://facebook.github.io/react-native/docs/sectionlist.html) component.

### BpkSectionListItem

| Property           | PropType                              | Required | Default Value |
| ------------------ | ------------------------------------- | -------- | ------------- |
| onPress            | func                                  | true     | -             |
| title              | string                                | true     | -             |
| image              | instanceOf(Image)                     | false    | null          |
| selected           | bool                                  | false    | false         |
| titleProps         | object                                | false    | {}            |

#### `titleProps`

`titleProps` is passed down to the `BpkText` used for the title. It accepts anything that React Native's [`Text` component](https://facebook.github.io/react-native/docs/text.html#props) does.

### BpkSectionListHeader

| Property           | PropType                              | Required | Default Value |
| ------------------ | ------------------------------------- | -------- | ------------- |
| title              | string                                | true     | -             |

### BpkSectionListItemSeparator

Use this as the value for [`ItemSeparatorComponent`](https://facebook.github.io/react-native/docs/sectionlist#itemseparatorcomponent).

No props.

### BpkSectionListSearchField

This can be used as the value for [`ListHeaderComponent`](https://facebook.github.io/react-native/docs/sectionlist#listheadercomponent) to allow users to search the list.

It's an instance of React Native's [`TextInput`](https://facebook.github.io/react-native/docs/textinput) component and accepts the same props.

### BpkSectionListNoResultsText

Use this as the value for [`ListEmptyComponent`](https://facebook.github.io/react-native/docs/sectionlist#listemptycomponent). It's generally only needed when the list can be searched.

| Property           | PropType                              | Required | Default Value |
| ------------------ | ------------------------------------- | -------- | ------------- |
| children           | Node                                  | true     | -             |

## Theme Props

Same as [flat list](/components/native/flat-list?platform=native#theme-props).
