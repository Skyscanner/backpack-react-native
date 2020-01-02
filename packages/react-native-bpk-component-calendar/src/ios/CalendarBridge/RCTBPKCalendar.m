/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

#import "RCTBPKCalendar.h"

#import "RCTBPKCalendarDateUtils.h"

NS_ASSUME_NONNULL_BEGIN
@interface RCTBPKCalendar ()
@property(nonatomic, strong) NSCalendar *utcCalendar;

- (void)setupCalendar;
@end

@implementation RCTBPKCalendar

- (instancetype)init {
    self = [super init];

    if (self) {
        [self setupCalendar];
    }

    return self;
}

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];

    if (self) {
        [self setupCalendar];
    }

    return self;
}

- (nullable instancetype)initWithCoder:(NSCoder *)aDecoder {
    self = [super initWithCoder:aDecoder];

    if (self) {
        [self setupCalendar];
    }

    return self;
}

- (void)setupCalendar {
    self.utcCalendar = [[NSCalendar alloc] initWithCalendarIdentifier:NSCalendarIdentifierGregorian];
    self.utcCalendar.timeZone = [[NSTimeZone alloc] initWithName:@"UTC"];
}

- (void)setRct_minDate:(nullable NSDate *)rct_minDate {
    // `BPKCalendar` requires `minDate` to be nonnull
    // but the RN interface supports `null` for the `minDate`
    // prop thus we have to ensure we have an explicit default
    // here. This default is aligned with the Android implementation.
    if (rct_minDate == nil) {
        NSDate *today = [[NSDate alloc] init];
        BPKSimpleDate *date = [[BPKSimpleDate alloc] initWithDate:today forCalendar:self.gregorian];

        [super setMinDate:date];
        return;
    }

    NSDate *localDate = [RCTBPKCalendarDateUtils convertDateToLocal:rct_minDate
                                                      localCalendar:self.gregorian
                                                        utcCalendar:self.utcCalendar];
    BPKSimpleDate *simpleDate = [[BPKSimpleDate alloc] initWithDate:localDate forCalendar:self.gregorian];
    [super setMinDate:simpleDate];
}

- (nullable NSDate *)rct_minDate {
  return [self.minDate dateForCalendar:self.gregorian];
}

- (void)setRct_maxDate:(nullable NSDate *)rct_maxDate {
    // `BPKCalendar` requires `maxDate` to be nonnull
    // but the RN interface supports `null` for the `maxDate`
    // prop thus we have to ensure we have an explicit default
    // here. This default is aligned with the Android implementation.
    if (rct_maxDate == nil) {
        NSDate *today = [[NSDate alloc] init];
        NSDate *oneYearFromNow = [self.gregorian dateByAddingUnit:NSCalendarUnitYear value:1 toDate:today options:0];
        BPKSimpleDate *date = [[BPKSimpleDate alloc] initWithDate:oneYearFromNow forCalendar:self.gregorian];

        [super setMaxDate:date];
        return;
    }

    NSDate *localDate = [RCTBPKCalendarDateUtils convertDateToLocal:rct_maxDate
                                                      localCalendar:self.gregorian
                                                        utcCalendar:self.utcCalendar];
    BPKSimpleDate *simpleDate = [[BPKSimpleDate alloc] initWithDate:localDate forCalendar:self.gregorian];
    [super setMaxDate:simpleDate];
}

- (nullable NSDate *)rct_maxDate {
  return [self.maxDate dateForCalendar:self.gregorian];
}

- (void)setRct_selectedDates:(NSArray<NSDate *> *)rct_selectedDates {
    NSMutableArray *simpleDates = [[NSMutableArray alloc] initWithCapacity:rct_selectedDates.count];

    for (NSDate *utcDate in rct_selectedDates) {
        NSDate *localDate = [RCTBPKCalendarDateUtils convertDateToLocal:utcDate
                                                          localCalendar:self.gregorian
                                                            utcCalendar:self.utcCalendar];
        BPKSimpleDate *simpleDate = [[BPKSimpleDate alloc] initWithDate:localDate forCalendar:self.gregorian];
        [simpleDates addObject:simpleDate];
    }

    [super setSelectedDates:simpleDates];
}

@end
NS_ASSUME_NONNULL_END
