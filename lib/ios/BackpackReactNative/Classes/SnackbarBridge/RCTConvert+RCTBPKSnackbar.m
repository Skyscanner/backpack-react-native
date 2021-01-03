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
#import "RCTConvert+RCTBPKSnackbar.h"

@implementation RCTConvert(RCTBPKSnackbar)

+ (BPKSnackbarDuration)BPKSnackbarDuration:(id)json {
    if (![json isKindOfClass:[NSNumber class]]) {
        RCTLogConvertError(json, @"Expected snackbar duration to be a number.");
        return BPKSnackbarDurationShort;
    }

    NSNumber *number = (NSNumber *)json;

    switch ([number unsignedIntegerValue]) {
        case BPKSnackbarDurationShort:
            return BPKSnackbarDurationShort;
        case BPKSnackbarDurationLong:
            return BPKSnackbarDurationLong;
        case BPKSnackbarDurationIndefinite:
            return BPKSnackbarDurationIndefinite;
        default:
            RCTLogWarn(@"Cannot convert snackbar duration %lul to valid duration", [number unsignedIntegerValue]);
            return BPKSnackbarDurationShort;
    }
}

@end
