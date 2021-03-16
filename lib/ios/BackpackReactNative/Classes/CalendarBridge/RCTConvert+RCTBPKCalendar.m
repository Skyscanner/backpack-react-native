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

#import "RCTConvert+RCTBPKCalendar.h"
#import <React/RCTConvert+CoreLocation.h>

#import "RCTBPKColorBucket.h"
#import "RCTBPKDateMatcher.h"
#import "RCTBPKCalendarSelectionConfigurationConstants.h"

// Trick to stringify a preprocessor argument
// See https://stackoverflow.com/questions/7605857/preprocessor-macro-value-to-objective-c-string-literal
#define NSStringize_helper(x) #x
#define NSStringize(x) @NSStringize_helper(x)

// Extract a given key from `json` and declare an NSString*
// variable with the same name. Further asserts that this
// value is non-nil and non-empty.
#define SELECTION_PROP(key, json) \
NSString *key = json[NSStringize(key)]; \
NSAssert(key && key.length > 0, @"`%s` should be present and non-empty in %@.", #key, json); \

@implementation RCTConvert (RCTBPKCalendar)

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

+ (BPKCalendarSelectionConfiguration *)BPKCalendarSelectionConfiguration:(id)json {
    if (json == nil) {
        // Old behaviour via deprecated delegate methods
        return nil;
    }

    if (RCT_DEBUG && ![json isKindOfClass:[NSDictionary class]]) {
        RCTLogError(@"`__selectionType` must be an object");
    }

    NSDictionary *selection = (NSDictionary *)json;
    NSString *stringType = selection[@"type"];
    if ([stringType isEqualToString:@"single"]) {
        SELECTION_PROP(selectHint, selection);

        return [[BPKCalendarSelectionConfigurationSingle alloc] initWithSelectionHint:selectHint];
    } else if ([stringType isEqualToString:@"range"]) {
        SELECTION_PROP(startDateSelectHint, selection);
        SELECTION_PROP(endDateSelectHint, selection);
        SELECTION_PROP(startDateSelectedState, selection);
        SELECTION_PROP(endDateSelectedState, selection);
        SELECTION_PROP(endAndStartDateSelectedState, selection);
        SELECTION_PROP(dateBetweenStartAndEndSelectedState, selection);
        SELECTION_PROP(makeNextSelectionPrompt, selection);

        return [[BPKCalendarSelectionConfigurationRange alloc] initWithStartSelectionHint:startDateSelectHint
                                                                         endSelectionHint:endDateSelectHint
                                                                      startSelectionState:startDateSelectedState
                                                                        endSelectionState:endDateSelectedState
                                                                    betweenSelectionState:dateBetweenStartAndEndSelectedState
                                                                startAndEndSelectionState:endAndStartDateSelectedState
                                                                         returnDatePrompt:makeNextSelectionPrompt];
    } else if ([stringType isEqualToString:@"multiple"]) {
        SELECTION_PROP(selectHint, selection);
        SELECTION_PROP(deselectHint, selection);

        return [[BPKCalendarSelectionConfigurationMultiple alloc] initWithSelectionHint:selectHint
                                                                        deselectionHint:deselectHint];;
    } else {
        if (RCT_DEBUG) {
            RCTLogError(@"Invalid selection type %@", selection);
        }
        return RCTBPKCalendarSelectionConfigurationConstants.single;
    }
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
