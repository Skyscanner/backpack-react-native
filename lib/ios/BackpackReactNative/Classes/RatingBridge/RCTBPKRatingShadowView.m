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

#import "RCTBPKRatingShadowView.h"

@implementation RCTBPKRatingShadowView

#pragma mark - Overrides

- (BOOL)canHaveSubviews {
    return NO;
}

- (BOOL)isYogaLeafNode {
    return YES;
}

// Removing support for padding
- (void)setPadding:(__unused YGValue)value {
}
- (void)setPaddingLeft:(__unused YGValue)value {
}
- (void)setPaddingRight:(__unused YGValue)value {
}
- (void)setPaddingTop:(__unused YGValue)value {
}
- (void)setPaddingBottom:(__unused YGValue)value {
}

@end
