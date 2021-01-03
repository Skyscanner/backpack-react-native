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

#import <UIKit/UIKit.h>

#import <Backpack/Dialog.h>
#import <React/RCTInvalidating.h>
#import <React/RCTView.h>

#import "RCTBPKDialogButtonAction.h"
#import "RCTBPKDialogManager.h"

@class RCTBridge;

NS_ASSUME_NONNULL_BEGIN
@protocol RCTDialogInteractor;

@interface RCTBPKDialog : UIView <RCTInvalidating>

@property(nonatomic, strong) NSNumber *identifier;

@property(nonatomic) BPKDialogController *dialogController;
@property(nonatomic) id<RCTDialogInteractor> delegate;

@property(nonatomic, copy) NSString *title;
@property(nonatomic) NSString *message;
@property(nonatomic) NSString *iconId;
@property(nonatomic) BPKDialogControllerStyle style;
@property(nonatomic, strong) UIColor *iconColor;
@property(nonatomic, strong) NSMutableArray<RCTBPKDialogButtonAction *> *actions;
@property(nonatomic) BOOL *scrimEnabled;

- (instancetype)initWithBridge:(RCTBridge *)bridge NS_DESIGNATED_INITIALIZER;

@end

@protocol RCTDialogInteractor <NSObject>

- (void)presentDialog:(RCTBPKDialog *_Nonnull)bpkDialog;
- (void)dismissDialog:(RCTBPKDialog *_Nonnull)bpkDialog withViewController:(UIViewController *_Nonnull)viewController;

@end
NS_ASSUME_NONNULL_END
