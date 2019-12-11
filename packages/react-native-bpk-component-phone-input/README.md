# react-native-bpk-component-phone-input

> Backpack React Native telephone input component.

## Installation

```sh
npm install react-native-bpk-component-phone-input --save-dev
```

## Data format

Consumers are expected to provide the data that powers the two components available in this package.

Each supported country should be in the following format:

```javascript
{ id: 'UK', dialingCode: '+44', name: 'United Kingdom' }
```

All keys are required and should have non-null/empty values.

For `BpkDialingCodeList` a list of objects with this format should be used. Sorting should be done beforehand as the component does not perform any sorting itself.

Optionally, you may supply a list of suggested ids which are your best guess at the user's country code. These codes will be shown at the top of the list under a custom title.

## BpkDialingCodeList

### Usage

```js
import React, { Component } from 'react';
import { Image } from 'react-native';
import { BpkDialingCodeList } from 'react-native-bpk-component-phone-input';

const CODES = [
  { id: 'DZ', dialingCode: '+213', name: 'Algeria' },
  { id: 'CA', dialingCode: '+1', name: 'Canada' },
  { id: 'CD', dialingCode: '+243', name: 'Democratic Republic of the Congo' },
  { id: 'IT', dialingCode: '+39', name: 'Italy' },
  { id: 'JP', dialingCode: '+81', name: 'Japan' },
  { id: 'SE', dialingCode: '+46', name: 'Sweden' },
  { id: 'GB', dialingCode: '+44', name: 'United Kingdom' },
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

const SUGGESTED = {
  ids: ['IT', 'GB'],  // The IDs must match the ones from dialingCodes
  title: 'Suggested', // The title shown above the suggested codes
};

export default class App extends Component {
  render() {
    return (
      <BpkDialingCodeList
        dialingCodes={CODES}
        selectedId="CD"
        onItemPress={code => console.log(code.id)}
        renderFlag={code => <Image source={require(FLAG_IMAGES[code.id])} />}
        suggested={SUGGESTED}
      />
    );
  }
}
```

### Props


| Property                    | PropType                                                    | Required | Default Value |
| --------------------------- | ----------------------------------------------------------- | -------- | ------------- |
| dialingCodes                | arrayOf({id, dialingCode, name})                            | true     | -             |
| onItemPress                 | func                                                        | true     | -             |
| renderFlag                  | func                                                        | true     | -             |
| selectedId                  | string                                                      | false    | null          |
| suggested                   | { ids, title }                                              | false    | null          |

## BpkPhoneNumberInput

### Usage

```js
import React, { Component } from 'react';
import { Image } from 'react-native';
import { BpkPhoneNumberInput } from 'react-native-bpk-component-phone-input';

const CODES = [
  { id: 'DZ', dialingCode: '+213', name: 'Algeria' },
];

const FLAG_IMAGES = {
  'DZ': '/resources/algeria.png',
};

export default class App extends Component {
  render() {
    return (
      <BpkPhoneNumberInput
        label="Phone number"
        value=""
        dialingCode={CODES[0]}
        onDialingCodePress={() => presentDialingCodeList()}
        renderFlag={code => <Image source={require(FLAG_IMAGES[code.id])} />}
      />
    );
  }
}
```

### Props

Inherits all props from [`BpkTextInput`](https://backpack.github.io/components/native/text-input) except `accessoryView`.


| Property                    | PropType                                                    | Required | Default Value |
| --------------------------- | ----------------------------------------------------------- | -------- | ------------- |
| dialingCode                 | {id, dialingCode, name}                                    | true     | -             |
| onDialingCodePress          | func                                                        | true     | -             |
| renderFlag                  | func                                                        | true     | -             |

## BpkFlag

### Usage

```js
import React, { Component } from 'react';
import { Image } from 'react-native';
import { BpkFlag } from 'react-native-bpk-component-phone-input';

export default class App extends Component {
  render() {
    return (
      <BpkFlag
        flag={<Image source={require('/resources/algeria.png')} />}
      />
    );
  }
}
```

### Props

Inherits all props from [`View`](https://facebook.github.io/react-native/docs/view.html).


| Property      | PropType   | Required | Default Value |
| ------------- | ---------- | -------- | ------------- |
| flag          | element    | false    | null          |
| width         | number     | false    | spacingLg     |

