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

#import "RCTBPKCalendarManager.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

#import <Backpack/Color.h>

#import "RCTBPKCalendar.h"
#import "RCTBPKCalendarDateUtils.h"
#import "RCTBPKColorBucket.h"
#import "RCTBPKDateMatcher.h"
#import "RCTConvert+RCTBPKCalendar.h"

@interface RCTBPKCalendarManager () <BPKCalendarDelegate>
@end

@implementation RCTBPKCalendarManager

RCT_EXPORT_MODULE()

- (UIView *)view {
    RCTBPKCalendar *calendar = [[RCTBPKCalendar alloc] initWithFrame:CGRectZero];

    calendar.delegate = self;
    return calendar;
}

RCT_REMAP_VIEW_PROPERTY(minDate, rct_minDate, NSDate)
RCT_REMAP_VIEW_PROPERTY(maxDate, rct_maxDate, NSDate)
RCT_REMAP_VIEW_PROPERTY(colorBuckets, rct_colorBuckets, RCTBPKColorBucketArray)
RCT_REMAP_VIEW_PROPERTY(disabledDates, rct_disabledDates, RCTBPKDateMatcher)
RCT_REMAP_VIEW_PROPERTY(selectionType, rct_selectionConfiguration, BPKCalendarSelectionConfiguration)
RCT_EXPORT_VIEW_PROPERTY(locale, NSLocale)
RCT_REMAP_VIEW_PROPERTY(selectedDates, rct_selectedDates, NSArray<NSDate *> *)

RCT_EXPORT_VIEW_PROPERTY(onDateSelection, RCTBubblingEventBlock)

#pragma mark RCTCalendarViewDelegate

/*
 * `RCTBPKCalendarManager` acts as the delegate of all of the `RCTBPKCalendar`
 * views. This is just one pattern and it's perfectly fine to call
 * `onDateSelection` from the `RCTBPKCalendar` directly.
 */
- (void)calendar:(RCTBPKCalendar *)calendar didChangeDateSelection:(NSArray<BPKSimpleDate *> *)dateList {
    if (!calendar.onDateSelection) {
        return;
    }

    NSMutableArray<NSNumber *> *dateArray = [[NSMutableArray alloc] initWithCapacity:dateList.count];
    for (BPKSimpleDate *date in dateList) {
        // The React Native interface uses UTC dates regardless of the local time
        // zone Thus we need to convert the dates to UTC instead of the local time
        // zone here.
        NSDate *localDate = [date dateForCalendar:calendar.gregorian];
        NSDate *dateInUTC = [RCTBPKCalendarDateUtils convertDateToUTC:localDate
                                                        localCalendar:calendar.gregorian
                                                          utcCalendar:calendar.utcCalendar];
        [dateArray addObject:@([dateInUTC timeIntervalSince1970])];
    }

    calendar.onDateSelection(@{@"selectedDates": dateArray});
}

- (RCTBPKColorBucket *_Nullable)colorBucketForDate:(NSDate *)date
                                      colorBuckets:(NSArray<RCTBPKColorBucket *> *)colorBuckets {
    for (RCTBPKColorBucket *bucket in colorBuckets) {
        if ([bucket.days matchesDate:date]) {
            return bucket;
        }
    }
    return nil;
}

- (BOOL)calendar:(BPKCalendar *)calendar isDateEnabled:(BPKSimpleDate *)date {
    NSAssert([calendar isKindOfClass:RCTBPKCalendar.class],
             @"calendar value is not of type RCTBPKCalendar as expected.");
    if (![calendar isKindOfClass:RCTBPKCalendar.class]) {
        return NO;
    }

    RCTBPKCalendar *rctCalendar = (RCTBPKCalendar *)calendar;
    if (rctCalendar.rct_disabledDates == nil) {
        return YES;
    }

    NSDate *localDate = [date dateForCalendar:calendar.gregorian];
    return ![rctCalendar.rct_disabledDates matchesDate:localDate];
}

- (id)calendar:(BPKCalendar *)calendar cellDataForDate:(BPKSimpleDate *)date {
    NSAssert([calendar isKindOfClass:RCTBPKCalendar.class],
             @"calendar value is not of type RCTBPKCalendar as expected.");
    if (![calendar isKindOfClass:RCTBPKCalendar.class]) {
        return nil;
    }

    NSDate *localDate = [date dateForCalendar:calendar.gregorian];
    RCTBPKCalendar *rctCalendar = (RCTBPKCalendar *)calendar;
    RCTBPKColorBucket *colorBucket = [self colorBucketForDate:localDate colorBuckets:rctCalendar.rct_colorBuckets];

    return colorBucket.cellData;
}

- (UIColor *)DONT_USE_calendar:(BPKCalendar *)calendar fillColorForDate:(NSDate *)date {
    NSAssert([calendar isKindOfClass:RCTBPKCalendar.class],
             @"calendar value is not of type RCTBPKCalendar as expected.");
    if (![calendar isKindOfClass:RCTBPKCalendar.class]) {
        return BPKColor.clear;
    }

    RCTBPKCalendar *rctCalendar = (RCTBPKCalendar *)calendar;
    RCTBPKColorBucket *colorBucket = [self colorBucketForDate:date colorBuckets:rctCalendar.rct_colorBuckets];

    if (colorBucket) {
        return colorBucket.color;
    }
    return BPKColor.clear;
}

- (UIColor *)DONT_USE_calendar:(BPKCalendar *)calendar titleColorForDate:(NSDate *)date {
    NSAssert([calendar isKindOfClass:RCTBPKCalendar.class],
             @"calendar value is not of type RCTBPKCalendar as expected.");
    if (![calendar isKindOfClass:RCTBPKCalendar.class]) {
        return BPKColor.textPrimaryColor;
    }

    RCTBPKCalendar *rctCalendar = (RCTBPKCalendar *)calendar;
    RCTBPKColorBucket *colorBucket = [self colorBucketForDate:date colorBuckets:rctCalendar.rct_colorBuckets];

    if (colorBucket) {
        switch (colorBucket.textStyle) {
        case RCTBPKColorBucketTextStyleDefault:
            return [self.class getTextColorForBackground:colorBucket.color];
        case RCTBPKColorBucketTextStyleLight:
            return BPKColor.textPrimaryLightColor;
        case RCTBPKColorBucketTextStyleDark:
            return BPKColor.textPrimaryDarkColor;
        }
    }
    return BPKColor.textPrimaryColor;
}

#pragma mark - Helpers

+ (UIColor *)getTextColorForBackground:(UIColor *)backgroundColor {
    CIColor *ciColor = [[CIColor alloc] initWithColor:backgroundColor];

    // Luminance calculation using the "Relative luminance in colorimetric spaces" algorithm
    // https://en.wikipedia.org/wiki/Relative_luminance#Relative_luminance_in_colorimetric_spaces
    double luminance = 0.2126 * ciColor.red + 0.7152 * ciColor.green + 0.0722 * ciColor.blue;

    if (luminance < 0.5) {
        return BPKColor.textPrimaryDarkColor;
    } else {
        return BPKColor.textPrimaryLightColor;
    }
}

@end
