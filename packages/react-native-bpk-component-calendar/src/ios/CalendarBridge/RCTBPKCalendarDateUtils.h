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
#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTBPKCalendarDateUtils : NSObject

/**
 * Convert a date in the local time zone to UTC by discarding time zone information.
 * For example converts the date `1548298800` or `2019-01-24T00:00:00-03:00` to `1548288000` or `2019-01-24T00:00:00Z`
 * when the local time zone is Brasilia Standard Time.
 * **Note:** This changes the underlying date, it's not just a time zone conversion.
 *
 * This is the inverse of + (NSDate *)convertDateToLocal:(NSDate *)utcDate
 *                                         localCalendar:(NSCalendar *)localCalendar
 *                                           utcCalendar:(NSCalendar *)utcCalendar;
 *
 * @param localDate The date in the local timezone.
 * @param localCalendar The gregorian calendar the local date was created in.
 * @param utcCalendar The gregorian UTC calendar to use.
 * @return The same date in UTC with the timezone data discarded.
 */
+ (NSDate *)convertDateToUTC:(NSDate *)localDate
               localCalendar:(NSCalendar *)localCalendar
                 utcCalendar:(NSCalendar *)utcCalendar;

/**
 * Convert a date in UTC to the local time zone by discarding time zone information.
 * For example converts the date `1548288000` or `2019-01-24T00:00:00Z` to `1548298800` or `2019-01-24T00:00:00-03:00`
 * when the local time zone is Brasilia Standard Time.
 * **Note:** This changes the underlying date, it's not just a time zone conversion.
 *
 * This is the inverse of + (NSDate *)convertDateToUTC:(NSDate *)localDate
 *                                       localCalendar:(NSCalendar *)localCalendar
 *                                         utcCalendar:(NSCalendar *)utcCalendar;
 *
 * @param utcDate The date in UTC.
 * @param localCalendar The gregorian calendar the local date was created in.
 * @param utcCalendar The gregorian UTC calendar to use.

 * @return The same date in the local time zone with the timezone data discarded.
 */
+ (NSDate *)convertDateToLocal:(NSDate *)utcDate
                 localCalendar:(NSCalendar *)localCalendar
                   utcCalendar:(NSCalendar *)utcCalendar;



@end

NS_ASSUME_NONNULL_END
