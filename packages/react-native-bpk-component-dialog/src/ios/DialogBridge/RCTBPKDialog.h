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
#import <React/RCTView.h>
#import <Backpack/Dialog.h>

#import "RCTBPKDialogManager.h"

@class RCTBridge;

@protocol RCTDialogInteractor;

@interface RCTBPKDialog : UIView <RCTInvalidating>

@property(nullable, nonatomic) NSNumber *identifier;
@property(nullable, nonatomic) BPKDialogController *dialogController;
@property(nullable, nonatomic) NSString *title;
@property(nullable, nonatomic) NSString *message;
@property(nullable, nonatomic) NSString *iconImage;

@property(nonatomic) BPKDialogControllerStyle style;

@property(nullable, nonatomic, strong) UIColor *iconBackgroundColor;

@property(nullable, nonatomic) NSMutableArray<NSDictionary *> *actions;
@property(nullable, nonatomic) BOOL *scrimEnabled;

@property (nullable, nonatomic) id<RCTDialogInteractor> delegate;

- (instancetype _Nullable)initWithBridge:(RCTBridge *_Nonnull)bridge NS_DESIGNATED_INITIALIZER;

@end

@protocol RCTDialogInteractor <NSObject>

- (void)presentBPKDialog:(RCTBPKDialog *_Nonnull)bpkDialog;
- (void)dismissBPKDialog:(RCTBPKDialog *_Nonnull)bpkDialog withViewController:(UIViewController *_Nonnull)viewController;

@end
