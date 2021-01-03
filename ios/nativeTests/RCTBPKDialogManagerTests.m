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

#import <BackpackReactNative/RCTBPKDialog.h>
#import <BackpackReactNative/RCTBPKDialogManager.h>
#import <BackpackReactNative/RCTConvert+RCTBPKDialog.h>

#import <Backpack/Color.h>
#import <Backpack/Label.h>

@interface RCTBPKDialogManagerTests : XCTestCase
@property(nonatomic, strong) RCTBPKDialogManager *dialogViewManager;
@property(nonatomic, strong) RCTBPKDialog *dialogView;
@property(nonatomic, strong) BPKDialogController *dialogController;
@end

@implementation RCTBPKDialogManagerTests

- (void)setUp {
    self.dialogViewManager = [[RCTBPKDialogManager alloc] init];
    UIView *view = [self.dialogViewManager view];
    self.dialogView = (RCTBPKDialog *)view;
}

- (void)testViewTypeIsRCTBPKDialog {
    XCTAssert([self.dialogView isKindOfClass:[RCTBPKDialog class]], @"View class should be `RCTBPKDialog`");
}

- (void)testViewDelegateIsManager {
    XCTAssertEqual(self.dialogView.delegate, (id<RCTDialogInteractor>)self.dialogViewManager,
                   @"The dialog's delegate should be the view manager");
}

- (void)testRatingSizeEnumConverter {
    BPKDialogControllerStyle dialogStyleAlert = [RCTConvert BPKDialogControllerStyle:@"alert"];
    XCTAssertTrue(dialogStyleAlert == BPKDialogControllerStyleAlert);

    BPKDialogControllerStyle dialogStyleBottomSheet = [RCTConvert BPKDialogControllerStyle:@"bottomSheet"];
    XCTAssertTrue(dialogStyleBottomSheet == BPKDialogControllerStyleBottomSheet);

    // test that invalid values fall back to a sensible default
    BPKDialogControllerStyle dialogStyleInvalid = [RCTConvert BPKDialogControllerStyle:@"invalid"];
    XCTAssertTrue(dialogStyleInvalid == BPKDialogControllerStyleAlert);
}

@end
