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

#import "RCTBPKRatingManager.h"

#import "RCTBPKRating.h"
#import "RCTBPKRatingShadowView.h"
#import "RCTConvert+RCTBPKRating.h"

@implementation RCTBPKRatingManager

RCT_EXPORT_MODULE()

#pragma mark - RCTViewManager Overrides
- (UIView *)view {
    return [[RCTBPKRating alloc] initWithBridge:self.bridge];
}

- (RCTShadowView *)shadowView {
    return [[RCTBPKRatingShadowView alloc] init];
}

#pragma mark - Properties

RCT_REMAP_VIEW_PROPERTY(title, rct_title, NSArray<NSString *> *)
RCT_REMAP_VIEW_PROPERTY(subtitle, rct_subtitle, NSArray<NSString *> *)
RCT_REMAP_VIEW_PROPERTY(value, ratingValue, double)
RCT_REMAP_VIEW_PROPERTY(orientation, layout, BPKRatingLayout)
RCT_EXPORT_VIEW_PROPERTY(size, BPKRatingSize)

@end
