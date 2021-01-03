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

#import <BackpackReactNative/RCTBPKFlare.h>

#import <React/UIView+React.h>


@interface RCTBPKFlareTests : XCTestCase
@property(nonatomic, strong) RCTBPKFlare *flareView;
@end

@implementation RCTBPKFlareTests

- (void)setUp {
  self.flareView = [[RCTBPKFlare alloc] initWithFrame:CGRectZero];
}

- (void)testAddsSubviewsToBackgroundView {
  NSUInteger defaultSubviewCount = self.flareView.subviews.count;

  [self.flareView insertReactSubview:[UIView new] atIndex:0];
  [self.flareView insertReactSubview:[UIView new] atIndex:1];
  [self.flareView insertReactSubview:[UIView new] atIndex:2];

  [self.flareView didUpdateReactSubviews];

  XCTAssertEqual(self.flareView.subviews.count, defaultSubviewCount, @"`didUpdateReactSubview` should not add subviews directly to `RCTBPKFlare`");
  XCTAssertEqual(self.flareView.backgroundView.subviews.count, 3, @"`didUpdateReactSubview` should add subviews to `backgroundView`");
  XCTAssertEqual(self.flareView.contentView.subviews.count, 0, @"`didUpdateReactSubview` should not add subviews to `contentView`");
}


@end
