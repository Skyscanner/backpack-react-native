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

#import <Backpack/Color.h>
#import <Backpack/Icon.h>
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

#import "RCTBPKDialog.h"
#import "RCTBPKDialogButtonAction.h"
#import "RCTBPKDialogEventsManager.h"
#import "RCTBPKDialogManager.h"
#import "RCTBPKDialogUtils.h"
#import "RCTConvert+RCTBPKDialog.h"

NS_ASSUME_NONNULL_BEGIN
@interface RCTBPKDialogManager () <RCTDialogInteractor>

@end

@implementation RCTBPKDialogManager {
    NSHashTable *_hostDialogs;
}

RCT_EXPORT_MODULE()

- (UIView *)view {
    RCTBPKDialog *dialog = [[RCTBPKDialog alloc] initWithBridge:self.bridge];
    dialog.delegate = self;
    if (!_hostDialogs) {
        _hostDialogs = [NSHashTable weakObjectsHashTable];
    }
    [_hostDialogs addObject:dialog];
    return dialog;
}

- (void)presentDialog:(RCTBPKDialog *)dialog {
    BPKDialogIconDefinition *iconDefinition =
        [[BPKDialogIconDefinition alloc] initWithIcon:[BPKIcon templateIconNamed:dialog.iconId size:BPKIconSizeLarge]
                                  iconBackgroundColor:dialog.iconColor];
    dialog.dialogController = [BPKDialogController dialogControllerWithTitle:dialog.title
                                                                     message:dialog.message
                                                                       style:dialog.style
                                                              iconDefinition:iconDefinition];

    BPKDialogScrimAction *scrimAction = [BPKDialogScrimAction
        actionWithHandler:^(BOOL didDismiss) {
          [[self.bridge moduleForClass:[RCTBPKDialogEventsManager class]]
              didInvokeScrimActionForDialogWithIdentifier:dialog.identifier.unsignedIntegerValue];
        }
            shouldDismiss:dialog.scrimEnabled];

    dialog.dialogController.scrimAction = scrimAction;

    for (NSUInteger i = 0; i < dialog.actions.count; ++i) {
        RCTBPKDialogButtonAction *reactAction = dialog.actions[i];
        BPKDialogButtonAction *action = [BPKDialogButtonAction
            actionWithTitle:reactAction.title
                      style:reactAction.style
                    handler:^(BPKDialogButtonAction *dialogAction) {
                      [[self.bridge moduleForClass:[RCTBPKDialogEventsManager class]]
                          didInvokeActionForDialogWithIdentifier:dialog.identifier.unsignedIntegerValue
                                                     actionIndex:i];
                    }];
        [dialog.dialogController addButtonAction:action];
    }
    if (self.presentationBlock) {
        self.presentationBlock([dialog reactViewController], dialog.dialogController);
    } else {
        [[dialog reactViewController] presentViewController:dialog.dialogController animated:YES completion:nil];
    }
}

- (void)dismissDialog:(RCTBPKDialog *)bpkDialog withViewController:(UIViewController *)viewController {
    if (self.dismissalBlock) {
        self.dismissalBlock([bpkDialog reactViewController], bpkDialog.dialogController);
    } else {
        [[bpkDialog reactViewController] dismissViewControllerAnimated:YES completion:nil];
    }
}

RCT_REMAP_VIEW_PROPERTY(dialogType, style, BPKDialogControllerStyle)
RCT_REMAP_VIEW_PROPERTY(description, message, NSString)
RCT_EXPORT_VIEW_PROPERTY(title, NSString)
RCT_EXPORT_VIEW_PROPERTY(identifier, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(actions, NSArray<RCTBPKDialogButtonAction *> *)
RCT_EXPORT_VIEW_PROPERTY(scrimEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(iconId, NSString)
RCT_EXPORT_VIEW_PROPERTY(iconColor, UIColor *)

- (void)invalidate {
    for (RCTBPKDialog *hostDialog in _hostDialogs) {
        [hostDialog invalidate];
    }
    [_hostDialogs removeAllObjects];
}

@end
NS_ASSUME_NONNULL_END
