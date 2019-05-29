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

#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <Backpack/Color.h>
#import <Backpack/Icon.h>
//#import <os/log.h>

#import "RCTBPKDialogManager.h"
#import "RCTBPKDialog.h"
#import "RCTBPKDialogEventsManager.h"
#import "RCTBPKDialogUtils.h"

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

- (void)presentBPKDialog:(RCTBPKDialog *)bpkDialog
{
    bpkDialog.dialogController = [BPKDialogController dialogControllerWithTitle:bpkDialog.title
                                                                        message:bpkDialog.message
                                                                          style:bpkDialog.style
                                                            iconBackgroundColor:bpkDialog.iconBackgroundColor
                                                                      iconImage:[BPKIcon templateIconNamed:bpkDialog.iconImage size:BPKIconSizeLarge]];
    
    BPKDialogScrimAction *scrimAction = [BPKDialogScrimAction actionWithHandler:^(BOOL didDismiss) {
        [[self.bridge moduleForClass:[RCTBPKDialogEventsManager class]] bpkDialogScrim:bpkDialog.identifier];
    } shouldDismiss:YES];

    bpkDialog.dialogController.scrimAction = scrimAction;

    for (NSUInteger i = 0; i < bpkDialog.actions.count; ++i) {
        NSDictionary *reactAction = [bpkDialog.actions objectAtIndex:i];
        BPKButtonStyle style = [RCTBPKDialogUtils map:[reactAction objectForKey:@"type"]];
        BPKDialogButtonAction *action = [BPKDialogButtonAction
                                         actionWithTitle:[reactAction objectForKey:@"text"]
                                         style:style
                                         handler:^(BPKDialogButtonAction *dialogAction) {
                                             [[self.bridge moduleForClass:[RCTBPKDialogEventsManager class]] bpkDialogAction:bpkDialog.identifier withIndex:[NSNumber numberWithInteger:i]];

                                         }];
        [bpkDialog.dialogController addButtonAction:action];
    }
    
    [[bpkDialog reactViewController] presentViewController:bpkDialog.dialogController animated:YES completion:nil];
}

- (void)dismissBPKDialog:(RCTBPKDialog *)bpkDialog withViewController:(UIViewController *)viewController
{
    [[bpkDialog reactViewController] dismissViewControllerAnimated:YES completion:nil];
}

RCT_REMAP_VIEW_PROPERTY(dialogType, style, BPKDialogControllerStyle)
RCT_REMAP_VIEW_PROPERTY(description, message, NSString)
RCT_EXPORT_VIEW_PROPERTY(title, NSString)
RCT_EXPORT_VIEW_PROPERTY(identifier, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(actions, NSArray<NSDictionary *> *)
RCT_EXPORT_VIEW_PROPERTY(scrimEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(icon, NSDictionary)

- (void)invalidate {
    for (RCTBPKDialog *hostDialog in _hostDialogs) {
        [hostDialog invalidate];
    }
    [_hostDialogs removeAllObjects];
}

@end
