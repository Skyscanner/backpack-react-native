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

#import "RCTBPKDateMatcher.h"
#import "RCTBPKCalendarDateUtils.h"

NS_ASSUME_NONNULL_BEGIN
@implementation RCTBPKDateMatcher

- (instancetype)initWithMatcherType:(RCTBPKDateMatcherType)matcherType dates:(NSArray<NSDate *> *)dates {
    self = [super init];

    if (self) {
        self.matcherType = matcherType;
        self.dates = dates;
    }

    return self;
}

- (BOOL)matchesDate:(NSDate *)date {
    switch (self.matcherType) {
    case RCTBPKDateMatcherTypeRange:
        if ([RCTBPKCalendarDateUtils date:date isAfterDate:self.dates[0]] &&
            [RCTBPKCalendarDateUtils date:date isBeforeDate:self.dates[1]]) {
            return YES;
        }
        break;
    case RCTBPKDateMatcherTypeBefore:
        if ([RCTBPKCalendarDateUtils date:date isBeforeDate:self.dates[0]]) {
            return YES;
        }
        break;
    case RCTBPKDateMatcherTypeAfter:
        if ([RCTBPKCalendarDateUtils date:date isAfterDate:self.dates[0]]) {
            return YES;
        }
        break;
    case RCTBPKDateMatcherTypeAny:
        for (NSDate *bucketDate in self.dates) {
            if ([bucketDate isEqualToDate:date]) {
                return YES;
            }
        }
        break;
    }
    return NO;
}

@end
NS_ASSUME_NONNULL_END
