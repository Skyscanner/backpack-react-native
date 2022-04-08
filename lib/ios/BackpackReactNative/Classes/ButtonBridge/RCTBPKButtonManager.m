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

#import "RCTBPKButton.h"
#import "RCTBPKButtonManager.h"
#import <React/RCTBridge.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTBPKButtonManager()

@property(nonatomic, strong) RCTBPKButton *button;

@end

@implementation RCTBPKButtonManager

RCT_EXPORT_MODULE()

- (UIView *)view {
    self.button = [[RCTBPKButton alloc] initWithType:@"primary" large:NO];
    [self.button addTarget:self action:@selector(onClick) forControlEvents:UIControlEventTouchUpInside];
    return self.button;
}

RCT_REMAP_VIEW_PROPERTY(title, rct_title, NSString)
RCT_REMAP_VIEW_PROPERTY(iconAlignment, rct_iconAlignment, NSString)
RCT_REMAP_VIEW_PROPERTY(type, rct_type, NSString)
RCT_REMAP_VIEW_PROPERTY(icon, rct_icon, NSString)
RCT_REMAP_VIEW_PROPERTY(large, rct_large, BOOL)
RCT_REMAP_VIEW_PROPERTY(loading, rct_loading, BOOL)
RCT_REMAP_VIEW_PROPERTY(enabled, rct_enabled, BOOL)
RCT_REMAP_VIEW_PROPERTY(onPress, rct_onPress, RCTResponseSenderBlock)

- (void)onClick {
    self.button.rct_onPress(@[]);
}

@end
NS_ASSUME_NONNULL_END
