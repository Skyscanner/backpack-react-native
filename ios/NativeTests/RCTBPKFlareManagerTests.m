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

#import <BackpackReactNative/RCTBPKFlareManager.h>
#import <BackpackReactNative/RCTBPKFlare.h>

@interface RCTBPKFlareManagerTests : XCTestCase
@property(nonatomic, strong) RCTBPKFlareManager *flareViewManager;
@property(nonatomic, strong) RCTBPKFlare *flareView;
@end

@implementation RCTBPKFlareManagerTests

- (void)setUp {
  self.flareViewManager = [[RCTBPKFlareManager alloc] init];
  self.flareView = (RCTBPKFlare *)[self.flareViewManager view];
}

- (void)testViewIsRCTBPKFlare {
  XCTAssert(
            [self.flareView isKindOfClass:[RCTBPKFlare class]],
            @"Flare manager should provide a view of type `RCTBPKFlare`"
  );
}


@end
