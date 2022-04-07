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
#import "RCTBPKButtonManager.h"
#import "RCTConvert.h"
#import <Backpack/Icon.h>
#import <Backpack/Button.h>


@interface RCTBPKButtonManager()

@property(nonatomic, strong) RCTResponseSenderBlock callback;
@property(nonatomic, strong) BPKButton* button;
@end

@implementation RCTBPKButtonManager

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup {
    return NO;
}

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

+ (BPKButtonSize)sizeForIsLarge:(BOOL)isLarge {
    if (isLarge) {
        return BPKButtonSizeLarge;
    }
    return BPKButtonSizeDefault;
}

+ (BPKButtonStyle)styleForName:(NSString *)name {
    if ([name isEqual: @"primary"]) {
        return BPKButtonStylePrimary;
    } else if ([name isEqual: @"secondary"]) {
        return BPKButtonStyleSecondary;
    } else if ([name isEqual: @"destructive"]) {
        return BPKButtonStyleDestructive;
    } else if ([name isEqual: @"featured"]) {
        return BPKButtonStyleFeatured;
    } else if ([name isEqual: @"link"]) {
        return BPKButtonStyleLink;
    } else if ([name isEqual: @"primaryOnDark"]) {
        return BPKButtonStylePrimaryOnDark;
    } else if ([name isEqual: @"primaryOnLight"]) {
        return BPKButtonStylePrimaryOnLight;
    }
    return BPKButtonStylePrimary;
}

RCT_EXPORT_METHOD(showWithArgs:(NSDictionary<NSString *, id> *)args
                  callback:(RCTResponseSenderBlock)callback) {
    NSString *title = [RCTConvert NSString:args[@"title"]];
    NSString *iconAlignment = [RCTConvert NSString:args[@"iconAlignment"]];
    NSString *type = [RCTConvert NSString:args[@"type"]];
    NSString *iconName = [RCTConvert NSString:args[@"icon"]];
    BOOL isLarge = [RCTConvert BOOL:args[@"large"]];

    BPKButton *button = [[BPKButton alloc] initWithSize:[RCTBPKButtonManager sizeForIsLarge:isLarge] style:[RCTBPKButtonManager styleForName:type]];

    UIImage *icon = isLarge ?
    [BPKIcon largeTemplateIconNamed:iconName]
    : [BPKIcon smallTemplateIconNamed:iconName];
    [button setImage:icon];
    
    [button setTitle:title];
    
    if ([iconAlignment isEqual: @"leading"]) {
        button.imagePosition = BPKButtonImagePositionLeading;
    } else if ([iconAlignment isEqual: @"trailing"]) {
        button.imagePosition = BPKButtonImagePositionTrailing;
    }
    
    self.callback = callback;
    [button addTarget:self action:@selector(onButtonClick) forControlEvents:UIControlEventTouchUpInside];
    
    self.button = button;
}

- (UIView *)view {
    return self.button;
}

- (void)onButtonClick {
    self.callback(@[]);
}

@end
