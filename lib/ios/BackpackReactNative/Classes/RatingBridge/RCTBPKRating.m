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

#import "RCTBPKRating.h"

#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/RCTUIManagerUtils.h>

@interface RCTBPKRating ()
@property(nonatomic, weak, nullable) RCTBridge *bridge;
@property(nonatomic, assign) CGSize lastSeenSize;
@end

/**
 * Layout with RN and dynamic Auto Layout size
 *
 * Correctly laying code out with RN and dynamically sized Auto Layout
 * views is not trivial. Here's how it works in `RCTBPKRating`.
 *
 * 1. The view is created by `RCTBPKRatingManager` with a zero frame.
 * 2. Immediately or whenever a prop changes we remeasure the size with
 * `systemLayoutSizeFittingSize:`.
 * 3. With the size from auto layout we update the shadow view's
 * intrinsticContentSize.
 * 4. This size is used by the Yoga measure function `RCTShadowViewMeasure` to
 * determine to bounds and center during Yoga's layout algorithm.
 * 5. The bounds/center of `RCTBPKRating` gets set by React via `reactSetFrame:`
 * which sets `bounds` and `center`.
 * 6. We use `translatesAutoresizingMaskIntoConstraints` to ensure that the
 * subviews of `BPKRating` respect this outcome.
 *
 * **Note:** Initially this causes constraint violations because the frame is
 * zero which forces auto layout to break a constraint. In practice this is
 * okay because this UI never has time to render before it's redone with the
 * correct bounds/center.
 */
@implementation RCTBPKRating

- (instancetype)initWithBridge:(RCTBridge *)bridge {
    self = [super initWithFrame:CGRectZero];

    if (self) {
        self.bridge = bridge;
        self.translatesAutoresizingMaskIntoConstraints = YES;
        self.lastSeenSize = CGSizeMake(UIViewNoIntrinsicMetric, UIViewNoIntrinsicMetric);
        [self updateIntrinsicContentSize];
    }

    return self;
}

- (void)updateIntrinsicContentSize {
    __typeof(self) __weak weakSelf = self;
    CGSize size = [self systemLayoutSizeFittingSize:UILayoutFittingCompressedSize];

    if (!CGSizeEqualToSize(size, self.lastSeenSize)) {
        [weakSelf.bridge.uiManager setIntrinsicContentSize:size forView:weakSelf];
        weakSelf.lastSeenSize = size;
    }
}

#pragma mark - Overridden Properties for `BPKRating`

- (void)setSize:(BPKRatingSize)size {
    [super setSize:size];
    [self updateIntrinsicContentSize];
}

- (void)setLayout:(BPKRatingLayout)layout {
    [super setLayout:layout];
    [self updateIntrinsicContentSize];
}

- (void)setRatingValue:(double)ratingValue {
    [super setRatingValue:ratingValue];
    [self updateIntrinsicContentSize];
}

#pragma mark - Custom Properties

- (void)setRct_title:(NSArray<NSString *> *)rct_title {
    NSAssert(rct_title.count == 1 || rct_title.count == 3,
             @"RCTBPKRating's `rct_title` takes an argument of arity 1 or 3.");
    if (rct_title.count != 1 && rct_title.count != 3) {
        return;
    }
    BPKRatingTextDefinition *definition = [[self class] definitionFromArray:rct_title];

    self.title = definition;
    [self updateIntrinsicContentSize];
}

- (void)setRct_subtitle:(NSArray<NSString *> *)rct_subtitle {
    NSAssert(rct_subtitle.count == 1 || rct_subtitle.count == 3,
             @"RCTBPKRating's `setRct_subtitle:` takes an argument of arity 1 or 3.");
    if (rct_subtitle.count != 1 && rct_subtitle.count != 3) {
        return;
    }

    BPKRatingTextDefinition *definition = [[self class] definitionFromArray:rct_subtitle];
    self.subtitle = definition;
    [self updateIntrinsicContentSize];
}

#pragma mark - Private

+ (BPKRatingTextDefinition *_Nullable)definitionFromArray:(NSArray<NSString *> *)arr {
    NSAssert(arr.count == 1 || arr.count == 3, @"definitionFromArray' takes an argument of arity 1 or 3.");
    if (arr.count != 1 && arr.count != 3) {
        return nil;
    }

    BPKRatingTextDefinition *definition;
    if (arr.count == 1) {
        definition = [[BPKRatingTextDefinition alloc] initWithHighRatingText:arr[0]
                                                            mediumRatingText:arr[0]
                                                               lowRatingText:arr[0]];
    } else {
        definition = [[BPKRatingTextDefinition alloc] initWithHighRatingText:arr[2]
                                                            mediumRatingText:arr[1]
                                                               lowRatingText:arr[0]];
    }

    return definition;
}

@end
