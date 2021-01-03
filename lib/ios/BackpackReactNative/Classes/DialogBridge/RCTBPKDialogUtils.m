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

#import <Backpack/Button.h>

#import "RCTBPKDialogUtils.h"

NS_ASSUME_NONNULL_BEGIN
@implementation RCTBPKDialogUtils

+ (BPKButtonStyle)map:(NSString *)style {
    if ([style isEqual:@"primary"]) {
        return BPKButtonStylePrimary;
    } else if ([style isEqual:@"secondary"]) {
        return BPKButtonStyleSecondary;
    } else if ([style isEqual:@"destructive"]) {
        return BPKButtonStyleDestructive;
    } else if ([style isEqual:@"featured"]) {
        return BPKButtonStyleFeatured;
    } else {
        return BPKButtonStylePrimary;
    }
}

@end
NS_ASSUME_NONNULL_END
