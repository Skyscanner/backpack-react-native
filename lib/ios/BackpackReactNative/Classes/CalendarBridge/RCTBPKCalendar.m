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

#import "RCTBPKCalendar.h"

#import "RCTBPKCalendarDateUtils.h"
#import "RCTBPKColorBucket.h"
#import "RCTBPKDateMatcher.h"

NS_ASSUME_NONNULL_BEGIN
@interface RCTBPKCalendar ()
@property(nonatomic, strong) NSCalendar *utcCalendar;
@property(nonatomic) BOOL nativeUpdateRequired;

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

- (void)setRct_selectionConfiguration:(BPKCalendarSelectionConfiguration *)rct_selectionConfiguration {
    _rct_selectionConfiguration = rct_selectionConfiguration;
    self.nativeUpdateRequired = YES;
}

- (void)setRct_minDate:(nullable NSDate *)rct_minDate {
    if(![_rct_minDate isEqualToDate:rct_minDate]) {
        _rct_minDate = rct_minDate;
        self.nativeUpdateRequired = YES;
    }
}

- (void)setRct_maxDate:(nullable NSDate *)rct_maxDate {
    if(![_rct_maxDate isEqualToDate:rct_maxDate]) {
        _rct_maxDate = rct_maxDate;
        self.nativeUpdateRequired = YES;
    }
}

- (void)setRct_selectedDates:(NSArray<NSDate *> *)rct_selectedDates {
    if(![self dateArraysAreEqual:_rct_selectedDates dateList2:rct_selectedDates]) {
        _rct_selectedDates = rct_selectedDates;
        self.nativeUpdateRequired = YES;
    }
}

-(BOOL)dateArraysAreEqual:(NSArray<NSDate *> *)dateList1 dateList2:(NSArray<NSDate *> *)dateList2 {
    if(dateList1.count != dateList2.count) {
        return NO;
    }

    for (int index = 0; index < dateList1.count; ++index) {
        if(![dateList1[index] isEqualToDate:dateList2[index]]) {
            return NO;
        }
    }
    return YES;
}

- (void)setRct_colorBuckets:(NSArray<RCTBPKColorBucket *> *_Nullable)rct_colorBuckets {
    _rct_colorBuckets = rct_colorBuckets;

    for (NSInteger i = 0; i < rct_colorBuckets.count; i += 1) {
        RCTBPKColorBucket *bucket = rct_colorBuckets[i];

        NSMutableArray *localDates = [[NSMutableArray alloc] initWithCapacity:bucket.days.dates.count];
        for (int j = 0; j < bucket.days.dates.count; j += 1) {
            localDates[j] = [RCTBPKCalendarDateUtils convertDateToLocal:bucket.days.dates[j]
                                                          localCalendar:self.gregorian
                                                            utcCalendar:self.utcCalendar];
        }

        bucket.days.dates = localDates;
    }
    self.nativeUpdateRequired = YES;
}

- (void)setRct_disabledDates:(RCTBPKDateMatcher *_Nullable)rct_disabledDates {
    if (_rct_disabledDates != rct_disabledDates) {
        _rct_disabledDates = rct_disabledDates;

        NSMutableArray *localDates = [[NSMutableArray alloc] initWithCapacity:rct_disabledDates.dates.count];
        for (int j = 0; j < rct_disabledDates.dates.count; j += 1) {
            localDates[j] = [RCTBPKCalendarDateUtils convertDateToLocal:rct_disabledDates.dates[j]
                                                          localCalendar:self.gregorian
                                                            utcCalendar:self.utcCalendar];
        }

        rct_disabledDates.dates = localDates;

        self.nativeUpdateRequired = YES;
    }
}

-(void)updateNativeSelectedDates:(NSArray<NSDate *> *)selectedDates {
    NSMutableArray *simpleDates = [[NSMutableArray alloc] initWithCapacity:selectedDates.count];

    for (NSDate *utcDate in selectedDates) {
        NSDate *localDate = [RCTBPKCalendarDateUtils convertDateToLocal:utcDate
                                                          localCalendar:self.gregorian
                                                            utcCalendar:self.utcCalendar];
        BPKSimpleDate *simpleDate = [[BPKSimpleDate alloc] initWithDate:localDate forCalendar:self.gregorian];
        [simpleDates addObject:simpleDate];
    }

    [super setSelectedDates:simpleDates];
}

- (void)updateNativeMinDate:(nullable NSDate *)minDate {
    // `BPKCalendar` requires `minDate` to be nonnull
    // but the RN interface supports `null` for the `minDate`
    // prop thus we have to ensure we have an explicit default
    // here. This default is aligned with the Android implementation.
    if (minDate == nil) {
        NSDate *today = [[NSDate alloc] init];
        BPKSimpleDate *date = [[BPKSimpleDate alloc] initWithDate:today forCalendar:self.gregorian];

        [super setMinDate:date];
        return;
    }

    NSDate *localDate = [RCTBPKCalendarDateUtils convertDateToLocal:minDate
                                                      localCalendar:self.gregorian
                                                        utcCalendar:self.utcCalendar];
    BPKSimpleDate *simpleDate = [[BPKSimpleDate alloc] initWithDate:localDate forCalendar:self.gregorian];
    [super setMinDate:simpleDate];
}

- (void)updateNativeMaxDate:(nullable NSDate *)maxDate {
    // `BPKCalendar` requires `maxDate` to be nonnull
    // but the RN interface supports `null` for the `maxDate`
    // prop thus we have to ensure we have an explicit default
    // here. This default is aligned with the Android implementation.
    if (maxDate == nil) {
        NSDate *today = [[NSDate alloc] init];
        NSDate *oneYearFromNow = [self.gregorian dateByAddingUnit:NSCalendarUnitYear value:1 toDate:today options:0];
        BPKSimpleDate *date = [[BPKSimpleDate alloc] initWithDate:oneYearFromNow forCalendar:self.gregorian];

        [super setMaxDate:date];
        return;
    }

    NSDate *localDate = [RCTBPKCalendarDateUtils convertDateToLocal:maxDate
                                                      localCalendar:self.gregorian
                                                        utcCalendar:self.utcCalendar];
    BPKSimpleDate *simpleDate = [[BPKSimpleDate alloc] initWithDate:localDate forCalendar:self.gregorian];
    [super setMaxDate:simpleDate];
}

- (void)didSetProps:(NSArray<NSString *> *)changedProps {
    if (self.nativeUpdateRequired) {
        self.nativeUpdateRequired = false;

        [super setSelectionConfiguration:self.rct_selectionConfiguration];
        [self updateNativeMinDate:_rct_minDate]; // Uses synthesized property instead of `self.rct_minDate
        [self updateNativeMaxDate:_rct_maxDate]; // Uses synthesized property instead of `self.rct_maxDate
        [self updateNativeSelectedDates:self.rct_selectedDates];
        [self refreshDateAppearance];
    }
}

@end
NS_ASSUME_NONNULL_END
