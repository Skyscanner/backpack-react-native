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

@implementation RCTBPKDialog
{
    __weak RCTBridge *_bridge;
    BOOL _isOpen;
    ViewController _viewController;
}

RCT_NOT_IMPLEMENTED(- (instancetype)initWithFrame:(CGRect)frame)
RCT_NOT_IMPLEMENTED(- (instancetype)initWithCoder:coder)

- (instancetype) initWithBridge:(RCTBridge *)bridge
{
    if ((self = [super initWithFrame:CGRectZero])) {
        _bridge = bridge;
        _viewController = [ViewController new];
        _viewController.view = [UIView new];
        __weak typeof(self) weakSelf = self;
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
}

- (void) presentBPKDialog:(RCTBPKDialog *)BPKDialog withViewController:(ViewController *)viewController
{
    [viewController presentViewController:self.dialogController animated:YES complettion:nil];
}



@end
