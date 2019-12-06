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
  spacingSm,
  spacingMd,
  spacingXl,
  colorPanjin,
  textTertiaryColor,
  textSecondaryColor,
  colorMonteverde,
  colorErfoud,
  borderSizeSm,
  borderRadiusSm,
} from 'bpk-tokens/tokens/base.react.native';
import { View } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import BpkIcon, { icons } from 'react-native-bpk-component-icon';
import BpkAnimateHeight from 'react-native-bpk-component-animate-height';
import BpkTouchableOverlay from 'react-native-bpk-component-touchable-overlay';
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
  border: {
    borderWidth: borderSizeSm,
    borderRadius: borderRadiusSm,
  },
  borderSuccess: {
    borderColor: colorMonteverde,
  },
  borderWarn: {
    borderColor: colorErfoud,
  },
  borderError: {
    borderColor: colorPanjin,
  },
  borderNeutral: {
    borderColor: textTertiaryColor,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: spacingMd - borderSizeSm,
    paddingHorizontal: spacingMd,
  },
  rowCloseButtonTapAreaOffset: {
    paddingEnd: spacingXl,
  },
  icon: {
    marginEnd: spacingSm,
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
    textAlign: 'left',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    paddingVertical: spacingMd - borderSizeSm,
    paddingHorizontal: spacingMd,
  },
  expandIcon: {
    paddingStart: spacingMd,
  },
  expandableContent: {
    padding: spacingMd,
    paddingTop: 0,
  },
});

const getAlertTypeStyle = (type: $Keys<typeof ALERT_TYPES>, styles) => {
  switch (type) {
    case ALERT_TYPES.success:
      return {
        icon: icons['tick-circle'],
        borderStyle: styles.borderSuccess,
        iconStyle: styles.iconSuccess,
      };
    case ALERT_TYPES.warn:
      return {
        icon: icons['information-circle'],
        borderStyle: styles.borderWarn,
        iconStyle: styles.iconWarn,
      };
    case ALERT_TYPES.error:
      return {
        icon: icons['information-circle'],
        borderStyle: styles.borderError,
        iconStyle: styles.iconError,
      };
    case ALERT_TYPES.neutral:
      return {
        icon: icons['information-circle'],
        borderStyle: styles.borderNeutral,
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
    animateOnEnter,
    animateOnLeave,
    children,
    bannerStyle,
    ...rest
  } = props;

  const styles = useBpkDynamicStyleSheet(dynamicStyles);
  const expandable = children !== null;
  const alertTypeStyles = getAlertTypeStyle(type, styles);
  const { icon, borderStyle, iconStyle } = alertTypeStyles;

  const rowStyle = [styles.row];

  if (dismissable) {
    rowStyle.push(styles.rowCloseButtonTapAreaOffset);
  }

  const rowContent = (
    <Fragment>
      <BpkIcon style={[styles.icon, iconStyle]} icon={icon} small />
      <View style={styles.messageContainer}>
        <BpkText textStyle="sm" style={styles.message}>
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
    </Fragment>
  );

  return (
    <AnimateAndFade
      {...rest}
      animateOnEnter={animateOnEnter}
      animateOnLeave={dismissable || animateOnLeave}
      show={show}
    >
      <View style={[styles.border, borderStyle, bannerStyle]}>
        {expandable ? (
          <BpkTouchableOverlay
            onPress={onToggleExpanded}
            accessibilityRole="button"
            accessibilityLabel={toggleExpandedButtonLabel}
            style={rowStyle}
          >
            {rowContent}
          </BpkTouchableOverlay>
        ) : (
          <View style={rowStyle}>{rowContent}</View>
        )}
        {dismissable && (
          <BpkTouchableOverlay
            accessibilityRole="button"
            accessibilityLabel={dismissButtonLabel}
            onPress={onDismiss}
            style={styles.closeButton}
          >
            <BpkIcon icon="close" small />
          </BpkTouchableOverlay>
        )}
        {expandable && (
          <BpkAnimateHeight
            expanded={expanded}
            innerStyle={styles.expandableContent}
          >
            {props.children}
          </BpkAnimateHeight>
        )}
      </View>
    </AnimateAndFade>
  );
};

BpkBannerAlert.propTypes = { ...propTypes };

BpkBannerAlert.defaultProps = { ...defaultProps };

export default BpkBannerAlert;
