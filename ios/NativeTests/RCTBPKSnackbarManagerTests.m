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

#import <BackpackReactNative/RCTBPKSnackbarManager.h>

#import <Backpack/Snackbar.h>

@interface RCTBPKSnackbarManagerTests : XCTestCase
@property(nonatomic, strong) RCTBPKSnackbarManager *snackbarManager;
@end

@implementation RCTBPKSnackbarManagerTests

- (void)setUp {
  self.snackbarManager = [[RCTBPKSnackbarManager alloc] init];
}

- (void)tearDown {
  // Make sure we clean everything up
  [self.snackbarManager invalidate];
  self.snackbarManager = nil;
}

- (void)testExportedConstants {
  NSDictionary<NSString *, id> *constants = [self.snackbarManager constantsToExport];
  NSSet<NSString *> *keys = [NSSet setWithArray:[constants allKeys]];
  NSSet<NSString *> *expectedKeys = [NSSet setWithArray:@[@"LENGTH_SHORT", @"LENGTH_LONG", @"LENGTH_INDEFINITE"]];

  XCTAssertEqualObjects(keys, expectedKeys);
  XCTAssertEqual(constants[@"LENGTH_SHORT"], @(BPKSnackbarDurationShort));
  XCTAssertEqual(constants[@"LENGTH_LONG"], @(BPKSnackbarDurationLong));
  XCTAssertEqual(constants[@"LENGTH_INDEFINITE"], @(BPKSnackbarDurationIndefinite));
}

@end
