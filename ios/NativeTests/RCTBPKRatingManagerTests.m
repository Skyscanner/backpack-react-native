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

#import <XCTest/XCTest.h>

#import <BackpackReactNative/RCTBPKRating.h>
#import <BackpackReactNative/RCTBPKRatingManager.h>
#import <BackpackReactNative/RCTConvert+RCTBPKRating.h>

#import <Backpack/BPKRatingBubble.h>
#import <Backpack/Label.h>

@interface RCTBPKRatingManagerTests : XCTestCase
@property(nonatomic, strong) RCTBPKRatingManager *ratingViewManager;
@property(nonatomic, strong) RCTBPKRating *ratingView;
@end

@implementation RCTBPKRatingManagerTests

- (void)setUp {
    self.ratingViewManager = [[RCTBPKRatingManager alloc] init];
    UIView *view = [self.ratingViewManager view];
    self.ratingView = (RCTBPKRating *)view;
}

- (void)testViewIsRCTBPKRating {
    XCTAssert([self.ratingView isKindOfClass:[RCTBPKRating class]],
              @"Rating manager should provide a view of type RCTBPKRating");
}

- (void)testRatingSizeEnumConverter {
    BPKRatingSize ratingSizeXs = [RCTConvert BPKRatingSize:@"xs"];
    XCTAssertTrue(ratingSizeXs == BPKRatingSizeExtraSmall);

    BPKRatingSize ratingSizeSm = [RCTConvert BPKRatingSize:@"sm"];
    XCTAssertTrue(ratingSizeSm == BPKRatingSizeSmall);

    BPKRatingSize ratingSizeBase = [RCTConvert BPKRatingSize:@"base"];
    XCTAssertTrue(ratingSizeBase == BPKRatingSizeBase);

    BPKRatingSize ratingSizeLg = [RCTConvert BPKRatingSize:@"lg"];
    XCTAssertTrue(ratingSizeLg == BPKRatingSizeLarge);

    // test that invalid values fall back to a sensible default
    BPKRatingSize ratingSizeInvalid = [RCTConvert BPKRatingSize:@"invalid"];
    XCTAssertTrue(ratingSizeInvalid == BPKRatingSizeBase);
}

- (void)testRatingLayoutEnumConverter {
    BPKRatingLayout ratingLayoutHorizontal = [RCTConvert BPKRatingLayout:@"horizontal"];
    XCTAssertTrue(ratingLayoutHorizontal == BPKRatingLayoutHorizontal);

    BPKRatingLayout ratingLayoutVertical = [RCTConvert BPKRatingLayout:@"vertical"];
    XCTAssertTrue(ratingLayoutVertical == BPKRatingLayoutVertical);

    // test that invalid values fall back to a sensible default
    BPKRatingLayout ratingLayoutInvalid = [RCTConvert BPKRatingLayout:@"invalid"];
    XCTAssertTrue(ratingLayoutInvalid == BPKRatingLayoutHorizontal);
}

- (void)testSettingRatingValue {
    XCTAssertEqualWithAccuracy(self.ratingView.ratingValue, 0.0f, 0.01f);

    // `ratingValue` is a property of BPKRating, but we override it in RCTBPKRating, and this is what is accessed by
    // RCTBPKRatingManager.
    self.ratingView.ratingValue = 2.0f;
    XCTAssertEqualWithAccuracy(self.ratingView.ratingValue, 2.0f, 0.01f);
}

- (void)testSettingTitles {
    // `rct_title` is a property of RCTBPKRating that is used by RN to set the BPKRating title.
    self.ratingView.rct_title = @[@"test_low", @"test_med", @"test_high"];
    XCTAssertTrue([self.ratingView.title.highRatingText isEqual:@"test_high"]);
    XCTAssertTrue([self.ratingView.title.mediumRatingText isEqual:@"test_med"]);
    XCTAssertTrue([self.ratingView.title.lowRatingText isEqual:@"test_low"]);
    XCTAssertTrue(self.ratingView.subtitle == nil);

    // `rct_subtitle` is a property of RCTBPKRating that is used by RN to set the BPKRating subtitle.
    self.ratingView.rct_subtitle = @[@"test_sub_low", @"test_sub_med", @"test_sub_high"];
    XCTAssertTrue([self.ratingView.title.highRatingText isEqual:@"test_high"]);
    XCTAssertTrue([self.ratingView.title.mediumRatingText isEqual:@"test_med"]);
    XCTAssertTrue([self.ratingView.title.lowRatingText isEqual:@"test_low"]);
    XCTAssertTrue([self.ratingView.subtitle.highRatingText isEqual:@"test_sub_high"]);
    XCTAssertTrue([self.ratingView.subtitle.mediumRatingText isEqual:@"test_sub_med"]);
    XCTAssertTrue([self.ratingView.subtitle.lowRatingText isEqual:@"test_sub_low"]);
}

@end
