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
#import <Backpack/SimpleDate.h>
#import <React/RCTViewManager.h>

#import "RCTBPKDateMatcher.h"

@class RCTBPKColorBucket;
@interface RCTBPKCalendar : BPKCalendar

@property(nonatomic, copy) RCTBubblingEventBlock onDateSelection;
@property(nonatomic, strong, readonly) NSCalendar *utcCalendar;

@property(nonatomic, nullable) NSDate *rct_minDate;
@property(nonatomic, nullable) NSDate *rct_maxDate;
@property(nonatomic, copy, nullable) NSArray<RCTBPKColorBucket *> *rct_colorBuckets;
@property(nonatomic, nullable) RCTBPKDateMatcher *rct_disabledDates;
@property(nonatomic, nonnull) NSArray<NSDate *> *rct_selectedDates;
@property(nonatomic, nonnull) BPKCalendarSelectionConfiguration *rct_selectionConfiguration;
@end
