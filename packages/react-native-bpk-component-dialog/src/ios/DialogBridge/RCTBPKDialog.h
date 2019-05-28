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

#import <UIKit/UIKit.h>

#import <React/RCTInvalidating.h>
#import <React/RCTModalHostViewManager.h>
#import <React/RCTView.h>

#import <Backpack/Dialog.h>

@class RCTBridge;

@protocol RCTDialogHostViewInteractor;

@interface RCTBPKDialog : UIView <RCTInvalidating>

@property(nullable, nonatomic) BPKDialogController *dialogController;
@property(nullable, nonatomic) NSString *title;
@property(nullable, nonatomic) NSString *message;

@property(nullable, nonatomic) UIImage *iconImage;
@property(nullable, nonatomic) UIColor *iconBackgroundColor;

@property(nullable, nonatomic) NSArray<BPKDialogButtonAction *> *actions;
@property(nullable, nonatomic) BPKDialogScrimAction *scrimAction;

@property(nullable, nonatomic) BOOL *isOpen;

@property (nonatomic, weak) id<RCTModalHostViewInteractor> delegate;

- (instancetype)initWithBridge:(RCTBridge *)bridge NS_DESIGNATED_INITIALIZER;

- (instancetype)render;

@end

@protocol RCTDialogHostViewInteractor <NSObject>

- (void)presentBPKDialog:(RCTBPKDialog *)bpkDialog withViewController:(ViewController *)viewController;
- (void)dismissBPKDialog:(RCTBPKDialog *)bpkDialog withViewController:(ViewController *)viewController;

@end
