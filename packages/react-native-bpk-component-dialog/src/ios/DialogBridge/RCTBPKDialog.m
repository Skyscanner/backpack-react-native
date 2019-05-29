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
#import <React/RCTTouchHandler.h>
#import <Backpack/Dialog.h>
#import <Backpack/Icon.h>
#import <Backpack/Color.h>
#import <Backpack/Button.h>

@implementation RCTBPKDialog
{
    __weak RCTBridge *_bridge;
    BOOL _isPresented;
    RCTTouchHandler *_touchHandler;
}

RCT_NOT_IMPLEMENTED(- (instancetype)initWithFrame:(CGRect)frame)
RCT_NOT_IMPLEMENTED(- (instancetype)initWithCoder:coder)

- (instancetype) initWithBridge:(RCTBridge *)bridge
{
    if ((self = [super initWithFrame:CGRectZero])) {
        _bridge = bridge;
        _isPresented = NO;
    }
    return self;
}

- (void)dismiss
{
    if (_isPresented) {
        [_delegate dismissBPKDialog:self withViewController:_dialogController];
        _isPresented = NO;
    }
}
    
- (void)didMoveToWindow
{
    [super didMoveToWindow];
    if (!_isPresented && self.window) {
        [_delegate presentBPKDialog:self];
        _isPresented = YES;
    }
}

- (void)didMoveToSuperview
{
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

- (void)setIcon:(NSDictionary *)icon
{
    _iconImage = icon[@"iconId"];
    NSString *iconColor = icon[@"iconColor"];
    _iconBackgroundColor = [BPKColor valueForKey:iconColor];
}

//- (void)setActions:(NSMutableArray<NSDictionary *> *)reactActions
//{
//    _actions = [NSMutableArray array];
//    for (NSDictionary *reactAction in reactActions) {
//        BPKButtonStyle style = [RCTBPKDialog map:[reactAction objectForKey:@"style"]];
//        BPKDialogButtonAction *action = [BPKDialogButtonAction
//                                         actionWithTitle:[reactAction objectForKey:@"text"]
//                                                   style:style
//                                                 handler:nil];
//        [_actions addObject:action];
//    }
//}

@end
