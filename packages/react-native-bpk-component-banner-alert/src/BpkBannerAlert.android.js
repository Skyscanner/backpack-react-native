/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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

import React, { Fragment } from 'react';
import {
  spacingMd,
  spacingBase,
  spacingLg,
  colorPanjin,
  backgroundSecondaryColor,
  colorMonteverde,
  colorErfoud,
  borderRadiusSm,
  textSecondaryColor,
} from 'bpk-tokens/tokens/base.react.native';
import { View } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import BpkIcon, { icons } from 'react-native-bpk-component-icon';
import BpkButtonLink from 'react-native-bpk-component-button-link';
import BpkAnimateHeight from 'react-native-bpk-component-animate-height';
import BpkTouchableNativeFeedback from 'react-native-bpk-component-touchable-native-feedback';
import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from 'react-native-bpk-appearance';

import {
  type Props,
  ALERT_TYPES,
  propTypes,
  defaultProps,
} from './common-types';
import AnimateAndFade from './AnimateAndFade';

const dynamicStyles = BpkDynamicStyleSheet.create({
  background: {
    // required for AnimateAndFade to work correctly :/
    minHeight: 1, // eslint-disable-line backpack/use-tokens
    borderRadius: borderRadiusSm,
    backgroundColor: backgroundSecondaryColor,
  },
  row: {
    minHeight: spacingBase * 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacingLg,
    paddingVertical: spacingMd,
  },
  icon: {
    marginEnd: spacingMd,
  },
  iconSuccess: {
    color: colorMonteverde,
  },
  iconWarn: {
    color: colorErfoud,
  },
  iconError: {
    color: colorPanjin,
  },
  iconNeutral: {
    color: textSecondaryColor,
  },
  // This is added to make the message text RTL friendly
  messageContainer: {
    flex: 1,
  },
  message: {
    alignSelf: 'flex-start',
  },
  closeButton: {
    marginStart: spacingMd,
  },
  expandIcon: {
    marginStart: spacingMd,
  },
  expandableContent: {
    paddingBottom: spacingBase,
    paddingHorizontal: spacingLg,
  },
});

const getAlertTypeStyle = (type: $Keys<typeof ALERT_TYPES>, styles) => {
  switch (type) {
    case ALERT_TYPES.success:
      return {
        icon: icons['tick-circle'],
        iconStyle: styles.iconSuccess,
      };
    case ALERT_TYPES.warn:
      return {
        icon: icons['information-circle'],
        iconStyle: styles.iconWarn,
      };
    case ALERT_TYPES.error:
      return {
        icon: icons['information-circle'],
        iconStyle: styles.iconError,
      };
    case ALERT_TYPES.neutral:
      return {
        icon: icons['information-circle'],
        iconStyle: styles.iconNeutral,
      };
    default:
      return {};
  }
};

const BpkBannerAlert = (props: Props) => {
  const {
    type,
    message,
    onDismiss,
    onToggleExpanded,
    dismissable,
    expanded,
    dismissButtonLabel,
    toggleExpandedButtonLabel,
    show,
    bannerStyle,
    animateOnEnter,
    animateOnLeave,
    children,
    ...rest
  } = props;

  const styles = useBpkDynamicStyleSheet(dynamicStyles);
  const expandable = children !== null;
  const { icon, iconStyle } = getAlertTypeStyle(type, styles);

  const rowContent = (
    <Fragment>
      <BpkIcon style={[styles.icon, iconStyle]} icon={icon} small />
      <View style={styles.messageContainer}>
        <BpkText style={styles.message} textStyle="sm">
          {message}
        </BpkText>
      </View>
      {expandable && (
        <BpkIcon
          style={styles.expandIcon}
          icon={expanded ? icons['chevron-up'] : icons['chevron-down']}
          small
        />
      )}
      {dismissable && dismissButtonLabel && onDismiss && (
        <BpkButtonLink
          style={styles.closeButton}
          title={dismissButtonLabel}
          onPress={onDismiss}
        />
      )}
    </Fragment>
  );

  return (
    <AnimateAndFade
      animateOnEnter={animateOnEnter}
      animateOnLeave={dismissable || animateOnLeave}
      show={show}
      {...rest}
    >
      <View style={[styles.background, bannerStyle]}>
        {expandable ? (
          <BpkTouchableNativeFeedback
            onPress={onToggleExpanded}
            accessibilityRole="button"
            accessibilityLabel={toggleExpandedButtonLabel}
          >
            <View style={styles.row}>{rowContent}</View>
          </BpkTouchableNativeFeedback>
        ) : (
          <View style={styles.row}>{rowContent}</View>
        )}
        {expandable && (
          <BpkAnimateHeight
            expanded={expanded}
            innerStyle={styles.expandableContent}
          >
            {children}
          </BpkAnimateHeight>
        )}
      </View>
    </AnimateAndFade>
  );
};

BpkBannerAlert.propTypes = { ...propTypes };

BpkBannerAlert.defaultProps = { ...defaultProps };

export default BpkBannerAlert;
