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

#import "RCTBPKCalendar.h"

#import "RCTBPKCalendarDateUtils.h"

NS_ASSUME_NONNULL_BEGIN
@interface RCTBPKCalendar()
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

- (void)setMinDate:(NSDate *)minDate {
    NSDate *localDate = [RCTBPKCalendarDateUtils convertDateToLocal:minDate
                                                      localCalendar:self.gregorian
                                                        utcCalendar:self.utcCalendar];
    [super setMinDate:localDate];
}

- (void)setMaxDate:(NSDate *)maxDate {
    NSDate *localDate = [RCTBPKCalendarDateUtils convertDateToLocal:maxDate
                                                      localCalendar:self.gregorian
                                                        utcCalendar:self.utcCalendar];
    [super setMaxDate:localDate];
}

- (void)setSelectedDates:(NSArray<NSDate *> *)selectedDates {
    NSMutableArray *localDates = [[NSMutableArray alloc] initWithCapacity:selectedDates.count];

    for (NSDate *utcDate in selectedDates) {
        NSDate *localDate = [RCTBPKCalendarDateUtils convertDateToLocal:utcDate
                                                          localCalendar:self.gregorian
                                                            utcCalendar:self.utcCalendar];
        [localDates addObject:localDate];
    }


    [super setSelectedDates:localDates];
}

@end
NS_ASSUME_NONNULL_END
