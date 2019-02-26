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

#import "RCTBPKCalendarDateUtils.h"

NS_ASSUME_NONNULL_BEGIN
@implementation RCTBPKCalendarDateUtils


+ (NSDate *)convertDateToUTC:(NSDate *)localDate
               localCalendar:(NSCalendar *)localCalendar
                 utcCalendar:(NSCalendar *)utcCalendar {
    NSDateComponents *dateComponents = [localCalendar components:NSCalendarUnitYear | NSCalendarUnitMonth | NSCalendarUnitDay fromDate:localDate];

    return [utcCalendar dateFromComponents:dateComponents];
}

+ (NSDate *)convertDateToLocal:(NSDate *)utcDate
                 localCalendar:(NSCalendar *)localCalendar
                   utcCalendar:(NSCalendar *)utcCalendar {
    NSDateComponents *utcComponents = [utcCalendar components:NSCalendarUnitYear | NSCalendarUnitMonth | NSCalendarUnitDay fromDate:utcDate];

    return [localCalendar dateFromComponents:utcComponents];
}

@end
NS_ASSUME_NONNULL_END
