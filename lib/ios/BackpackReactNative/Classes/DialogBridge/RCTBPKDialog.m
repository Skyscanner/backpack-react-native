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

#import "RCTBPKDialog.h"
#import <Backpack/Color.h>
#import <Backpack/Icon.h>
#import <React/RCTBridge.h>
#import <React/RCTTouchHandler.h>
#import <React/RCTUIManager.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN
@implementation RCTBPKDialog {
    __weak RCTBridge *_bridge;
    BOOL _isPresented;
    RCTTouchHandler *_touchHandler;
}

RCT_NOT_IMPLEMENTED(-(instancetype)initWithFrame : (CGRect)frame)
RCT_NOT_IMPLEMENTED(-(instancetype _Nullable)initWithCoder : coder)

- (instancetype)initWithBridge:(RCTBridge *)bridge {
    if ((self = [super initWithFrame:CGRectZero])) {
        _bridge = bridge;
        _isPresented = NO;
    }
    return self;
}

- (void)dismiss {
    if (_isPresented) {
        [_delegate dismissDialog:self withViewController:_dialogController];
        _isPresented = NO;
    }
}

- (void)didMoveToWindow {
    [super didMoveToWindow];
    if (!_isPresented && self.window) {
        [_delegate presentDialog:self];
        _isPresented = YES;
    }
}

- (void)didMoveToSuperview {
    [super didMoveToSuperview];

    if (_isPresented && !self.superview) {
        [self dismiss];
    }
}

- (void)invalidate {
    dispatch_async(dispatch_get_main_queue(), ^{
      [self dismiss];
    });
}

- (void)setIconColor:(UIColor *)iconColor {
    if(_iconColor != iconColor){
        _iconColor = iconColor;
        if(self.dialogController != nil) {
            self.dialogController.iconDefinition = [[BPKDialogIconDefinition alloc]
                                                    initWithIcon:[BPKIcon templateIconNamed:self.iconId size:BPKIconSizeLarge] iconBackgroundColor:iconColor
                                                    ];
        }
    }
}

@end
NS_ASSUME_NONNULL_END
