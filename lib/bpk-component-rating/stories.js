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
import React, { type Node, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { spacingLg, spacingMd } from 'bpk-tokens/tokens/base.react.native';

import BpkText from '../bpk-component-text';
import BpkButton from '../bpk-component-button';
import CenterDecorator from '../../storybook/CenterDecorator';

import BpkRating, { type Props } from './index';

const TITLES = [
  'Low title',
  'Medium title with a lot of content',
  'High title',
];
const SUBTITLES = ['Low subtitle', 'Medium subtitle', 'High subtitle'];

const styles = StyleSheet.create({
  rating: {
    paddingTop: spacingLg,
    paddingBottom: spacingLg,
  },
  edgeCase: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: spacingMd,
    width: '50%',
    height: 180, // eslint-disable-line backpack/use-tokens
  },
});

const Container = ({ children, style }: { children: Node, style?: Object }) => (
  <ScrollView
    contentContainerStyle={[{ flex: 1, justifyContent: 'center' }, style]}
  >
    {children}
  </ScrollView>
);

Container.defaultProps = {
  style: null,
};

const EdgeCaseContainer = ({
  children,
  title,
  iterations,
}: {
  children: (number) => Node,
  title: string,
  iterations: number,
}) => {
  const [iteration, setState] = useState(0);

  return (
    <View style={styles.edgeCase}>
      <BpkText weight="emphasized">{title}</BpkText>
      {children(iteration)}
      <BpkButton
        title="Update"
        onPress={() => setState((iteration + 1) % iterations)}
      />
    </View>
  );
};

const nextkey = (() => {
  let id = 0;
  return () => {
    id += 1;
    return `rating-${id}`;
  };
})();

const createExamples = (examples: Array<$Shape<Props>>) =>
  examples.map((props) => (
    <BpkRating
      key={nextkey()}
      style={styles.rating}
      title={TITLES}
      subtitle={SUBTITLES}
      value={0}
      {...props}
    />
  ));

storiesOf('bpk-component-rating', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => (
    <Container>
      {createExamples([
        { value: 3.0 },
        { value: 5.9 },
        { value: 6.0 },
        { value: 7.9 },
        { value: 8.0 },
        { value: 10.0 },
      ])}
    </Container>
  ))
  .add('docs:size', () => (
    <Container>
      {createExamples([
        { value: 9.0, size: 'lg', title: 'Large', subtitle: SUBTITLES },
        { value: 9.0, size: 'base', title: 'Base', subtitle: SUBTITLES },
        { value: 9.0, size: 'sm', title: 'Small', subtitle: SUBTITLES },
        { value: 9.0, size: 'xs', title: 'Extra Small', subtitle: SUBTITLES },
      ])}
    </Container>
  ))
  .add('docs:size-vertical', () => (
    <Container style={{ alignItems: 'center' }}>
      {createExamples([
        {
          value: 9.0,
          size: 'lg',
          title: 'Large',
          subtitle: SUBTITLES,
          orientation: 'vertical',
        },
        {
          value: 9.0,
          size: 'base',
          title: 'Base',
          subtitle: SUBTITLES,
          orientation: 'vertical',
        },
        {
          value: 9.0,
          size: 'sm',
          title: 'Small',
          subtitle: SUBTITLES,
          orientation: 'vertical',
        },
        {
          value: 9.0,
          size: 'xs',
          title: 'Extra Small',
          subtitle: SUBTITLES,
          orientation: 'vertical',
        },
      ])}
    </Container>
  ))
  .add('Edge cases - Update props', () => (
    <Container style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      <EdgeCaseContainer title="Update size" iterations={4}>
        {(iteration) => (
          <BpkRating
            title={['xs', 'sm', 'base', 'lg'][iteration]}
            subtitle={SUBTITLES}
            value={9.0}
            size={['xs', 'sm', 'base', 'lg'][iteration]}
          />
        )}
      </EdgeCaseContainer>
      <EdgeCaseContainer title="Update orientation" iterations={2}>
        {(iteration) => (
          <BpkRating
            title={['horizontal', 'vertical'][iteration]}
            subtitle={SUBTITLES}
            value={9.0}
            orientation={['horizontal', 'vertical'][iteration]}
          />
        )}
      </EdgeCaseContainer>
      <EdgeCaseContainer title="Update text" iterations={2}>
        {(iteration) => (
          <BpkRating
            title={['Title', 'Another title'][iteration]}
            subtitle={['Subtitle', 'Another subtitle'][iteration]}
            value={9.0}
          />
        )}
      </EdgeCaseContainer>
      <EdgeCaseContainer title="Update value" iterations={3}>
        {(iteration) => (
          <BpkRating
            title={TITLES}
            subtitle={SUBTITLES}
            value={[3, 6, 9][iteration]}
          />
        )}
      </EdgeCaseContainer>
      <EdgeCaseContainer title="Update array to single" iterations={2}>
        {(iteration) => (
          <BpkRating
            title={[TITLES, 'Single'][iteration]}
            subtitle={[SUBTITLES, 'Single sub'][iteration]}
            value={6}
          />
        )}
      </EdgeCaseContainer>
    </Container>
  ));
