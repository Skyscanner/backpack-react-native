/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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

#import "RCTBPKDialog.h"
#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <Backpack/Dialog.h>
#import <Backpack/Icon.h>

@implementation RCTBPKDialog
{
    __weak RCTBridge *_bridge;
    BOOL _isOpen;
    UIViewController *_viewController;
}

RCT_NOT_IMPLEMENTED(- (instancetype)initWithFrame:(CGRect)frame)
RCT_NOT_IMPLEMENTED(- (instancetype)initWithCoder:coder)

- (instancetype) initWithBridge:(RCTBridge *)bridge
{
    if ((self = [super initWithFrame:CGRectZero])) {
        _bridge = bridge;
        _viewController = [UIViewController new];
        _viewController.view = [UIView new];
    }

    return self;
}

- (instancetype) render
{
    self.dialogController = [BPKDialogController dialogControllerWithTitle:self.title
                                                                   message:self.description
                                                                     style:self.style
                                                       iconBackgroundColor:self.iconBackgroundColor
                                                                 iconImage:[BPKIcon templateIconNamed:self.iconImage size:BPKIconSizeLarge]];
    return self;
}

- (void) presentBPKDialog:(RCTBPKDialog *)BPKDialog withViewController:(UIViewController *)viewController
{
    [viewController presentViewController:self.dialogController animated:YES completion:nil];
    _isOpen = YES;
}

- (void)dismissDialogController
{
    if (_isOpen) {
        [_delegate dismissBPKDialog:self withViewController:_viewController];
        _isOpen = NO;
    }
}

- (void)invalidate {
    dispatch_async(dispatch_get_main_queue(), ^{
        [self dismissDialogController];
    });
}

@end
