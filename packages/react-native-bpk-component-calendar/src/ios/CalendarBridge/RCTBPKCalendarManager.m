/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
#import "RCTConvert+RCTBPKCalendar.h"
#import "RCTBPKCalendar.h"
#import "RCTBPKCalendarDateUtils.h"

@interface RCTBPKCalendarManager() <BPKCalendarDelegate>

@end


@implementation RCTBPKCalendarManager

RCT_EXPORT_MODULE()

- (UIView *)view {
    RCTBPKCalendar *calendar = [[RCTBPKCalendar alloc] initWithFrame:CGRectZero];

    calendar.delegate = self;
    return calendar;
}

RCT_EXPORT_VIEW_PROPERTY(minDate, NSDate)
RCT_EXPORT_VIEW_PROPERTY(maxDate, NSDate)
RCT_EXPORT_VIEW_PROPERTY(selectionType, BPKCalendarSelection)
RCT_EXPORT_VIEW_PROPERTY(locale, NSLocale)
RCT_EXPORT_VIEW_PROPERTY(selectedDates, NSArray<NSDate *> *)

RCT_EXPORT_VIEW_PROPERTY(onDateSelection, RCTBubblingEventBlock)

#pragma mark RCTCalendarViewDelegate

/*
 * `RCTBPKCalendarManager` acts as the delegate of all of the `RCTBPKCalendar` views. This is just one
 * pattern and it's perfectly fine to call `onDateSelection` from the `RCTBPKCalendar` directly.
 */
- (void)calendar:(RCTBPKCalendar *)calendar didChangeDateSelection:(NSArray<NSDate *> *)dateList {
    if (!calendar.onDateSelection) {
        return;
    }

    NSMutableArray<NSNumber *> * dateArray = [[NSMutableArray alloc] initWithCapacity:dateList.count];
    for (NSDate *date in dateList) {
        // The React Native interface uses UTC dates regardless of the local time zone
        // Thus we need to convert the dates to UTC instead of the local time zone here.
        NSDate *dateInUTC = [RCTBPKCalendarDateUtils convertDateToUTC:date
                                                        localCalendar:calendar.gregorian
                                                          utcCalendar:calendar.utcCalendar];
        [dateArray addObject:@([dateInUTC timeIntervalSince1970])];
    }

    calendar.onDateSelection(@{@"selectedDates": dateArray});
}

@end
