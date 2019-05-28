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

#import "RCTBPKDialogManager.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

#import "RCTBPKDialog.h"

@implementation RCTConvert (RCTBPKDialog)

RCT_ENUM_CONVERTER(BPKDialogControllerStyle, (@{
    @"alert": @(BPKDialogControllerStyleAlert),
    @"bottomSheet": @(BPKDialogControllerStyleBottomSheet),
    }), BPKDialogControllerStyleAlert, integerValue)
 
@end

@interface RCTBPKDialogManager() <RCTDialogInteractor>

@end


@implementation RCTBPKDialogManager
{
    NSHashTable *_hostDialogs;
}

RCT_EXPORT_MODULE()

- (UIView *)view
{
    RCTBPKDialog *dialog = [[RCTBPKDialog alloc] initWithBridge:self.bridge];
    dialog.delegate = self;
    if (!_hostDialogs) {
        _hostDialogs = [NSHashTable weakObjectsHashTable];
    }
    [_hostDialogs addObject:dialog];
    return dialog;
}

- (void)presentBPKDialog:(RCTBPKDialog *)bpkDialog withViewController:(UIViewController *)viewController
{
    if (_presentationBlock) {
        _presentationBlock([bpkDialog reactViewController], viewController, completionBlock);
    } else {
        [[bpkDialog reactViewController] presentViewController:viewController animated:YES completion:nil];
    }
}

- (void)dismissBPKDialog:(RCTBPKDialog *)bpkDialog withViewController:(UIViewController *)viewController
{
    if (_dismissalBlock) {
        _dismissalBlock([bpkDialog reactViewController], viewController, completionBlock);
    } else {
        [[bpkDialog reactViewController] dismissViewControllerAnimated:YES completion:nil];
    }
}

RCT_EXPORT_VIEW_PROPERTY(dialogType, BPKDialogControllerStyle) // Mapping needed
RCT_EXPORT_VIEW_PROPERTY(title, NSString)
RCT_EXPORT_VIEW_PROPERTY(description, NSString)
//RCT_EXPORT_VIEW_PROPERTY(icon, NSString) // Mapping needed
//RCT_EXPORT_VIEW_PROPERTY(actions, NSString) // Mappingg needed
//RCT_EXPORT_VIEW_PROPERTY(scrimAction, NSString) // Mapping needed
RCT_EXPORT_VIEW_PROPERTY(isOpen, BOOL)

- (void)invalidate {
    for (RCTBPKDialog *hostDialog in _hostDialogs) {
        [hostDialog invalidate];
    }
    [_hostDialogs removeAllObjects];
}

@end
