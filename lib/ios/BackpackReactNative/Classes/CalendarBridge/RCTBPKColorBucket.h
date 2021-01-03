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

#import <Backpack/Calendar.h>

NS_ASSUME_NONNULL_BEGIN

@class RCTBPKDateMatcher;
@interface RCTBPKColorBucket : NSObject

/**
 * Enum values for specifying calendar selection type
 */
typedef NS_ENUM(NSUInteger, RCTBPKColorBucketTextStyle) {
    RCTBPKColorBucketTextStyleDefault = 0,
    RCTBPKColorBucketTextStyleLight = 1,
    RCTBPKColorBucketTextStyleDark = 2,
};

@property(nonatomic, readonly, strong) UIColor *color;
@property(nonatomic, readonly, assign) RCTBPKColorBucketTextStyle textStyle;
@property(nonatomic, readonly, strong, nullable) RCTBPKDateMatcher *days;
@property(nonatomic, readonly, assign) BPKCalendarTrafficLightCellData * cellData;

- (instancetype)initWithColor:(UIColor *)color
                    textStyle:(RCTBPKColorBucketTextStyle)textStyle
                         days:(RCTBPKDateMatcher *)days
                    cellData:(BPKCalendarTrafficLightCellData *)cellDatas;

@end

NS_ASSUME_NONNULL_END
