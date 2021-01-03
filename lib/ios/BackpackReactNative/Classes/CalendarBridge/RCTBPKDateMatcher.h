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

#import <Backpack/SimpleDate.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTBPKDateMatcher : NSObject

/**
 * Enum values for specifying calendar selection type
 */
typedef NS_ENUM(NSUInteger, RCTBPKDateMatcherType) {
    RCTBPKDateMatcherTypeRange = 0,
    RCTBPKDateMatcherTypeAfter = 1,
    RCTBPKDateMatcherTypeBefore = 2,
    RCTBPKDateMatcherTypeAny = 3,
};

@property(nonatomic) RCTBPKDateMatcherType matcherType;
@property(nonatomic, nullable) NSArray<NSDate *> *dates;

- (instancetype)initWithMatcherType:(RCTBPKDateMatcherType)matcherType dates:(NSArray<NSDate *> *)dates;
- (BOOL)matchesDate:(NSDate *)date;

@end

NS_ASSUME_NONNULL_END
