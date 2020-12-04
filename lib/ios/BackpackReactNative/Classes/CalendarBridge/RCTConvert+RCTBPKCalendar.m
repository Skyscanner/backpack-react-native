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

#import "RCTConvert+RCTBPKCalendar.h"
#import <React/RCTConvert+CoreLocation.h>

#import "RCTBPKColorBucket.h"
#import "RCTBPKDateMatcher.h"

@implementation RCTConvert (RCTBPKCalendar)

RCT_ENUM_CONVERTER(BPKCalendarSelection, (@{
                       @"single": @(BPKCalendarSelectionSingle),
                       @"multiple": @(BPKCalendarSelectionMultiple),
                       @"range": @(BPKCalendarSelectionRange)
                   }),
                   BPKCalendarSelectionSingle, integerValue)

RCT_ENUM_CONVERTER(RCTBPKColorBucketTextStyle, (@{
                       @"default": @(RCTBPKColorBucketTextStyleDefault),
                       @"light": @(RCTBPKColorBucketTextStyleLight),
                       @"dark": @(RCTBPKColorBucketTextStyleDark)
                   }),
                   RCTBPKColorBucketTextStyleDefault, integerValue)

RCT_ENUM_CONVERTER(RCTBPKDateMatcherType, (@{
                       @"range": @(RCTBPKDateMatcherTypeRange),
                       @"after": @(RCTBPKDateMatcherTypeAfter),
                       @"before": @(RCTBPKDateMatcherTypeBefore),
                       @"any": @(RCTBPKDateMatcherTypeAny)
                   }),
                   RCTBPKColorBucketTextStyleDefault, integerValue)

RCT_ARRAY_CONVERTER(NSDate)
RCT_ARRAY_CONVERTER(RCTBPKColorBucket)

+ (RCTBPKDateMatcher *)RCTBPKDateMatcher:(id)json {
    RCTBPKDateMatcherType matcherType = [RCTConvert RCTBPKDateMatcherType:json[@"type"]];
    NSArray<NSDate *> *dates = [RCTConvert NSDateArray:json[@"dates"]];
    return [[RCTBPKDateMatcher alloc] initWithMatcherType:matcherType dates:dates];
}

+ (RCTBPKColorBucket *)RCTBPKColorBucket:(id)json {
    UIColor *color = [RCTConvert UIColor:json[@"color"]];
    RCTBPKColorBucketTextStyle textStyle =
        [RCTConvert RCTBPKColorBucketTextStyle:json[@"textStyle"] ? json[@"textStyle"] : @"default"];
    RCTBPKDateMatcher *dateMatcher = [RCTConvert RCTBPKDateMatcher:json[@"days"]];
    return [[RCTBPKColorBucket alloc] initWithColor:color
                                          textStyle:textStyle
                                               days:dateMatcher
                                          cellData:[self BPKCalendarDateCellData:json[@"__cellStyle"]]];
}

+ (BPKCalendarTrafficLightCellData *)BPKCalendarDateCellData:(nullable id)json {
    if (json == nil) {
        // Old behaviour via deprecated delegate methods
        return nil;
    }

    if (RCT_DEBUG && ![json isKindOfClass:[NSString class]]) {
        RCTLogError(@"`__cellStyle` on `ColorBucket` must be a string");
    }

    NSString *stringJson = (NSString *)json;
    if ([stringJson isEqualToString:@"normal"]) {
        return nil;
    } else if ([stringJson isEqualToString:@"positive"]) {
        return BPKCalendarTrafficLightCellData.positive;
    } else if ([stringJson isEqualToString:@"neutral"]) {
        return BPKCalendarTrafficLightCellData.neutral;
    } else if ([stringJson isEqualToString:@"negative"]) {
        return BPKCalendarTrafficLightCellData.negative;
    } else {
        if (RCT_DEBUG) {
            RCTLogError(@"Invalid cell style %@", stringJson);
        }
        return nil;
    }
}

@end
