//
//  ToggleNavigationBarMenuModule.m
//  Backpack Native
//
//  Created by Hugo Tunius on 01/08/2018.
//  Copyright 2016-2021 Skyscanner Ltd
//

#import "ToggleNavigationBarMenuModule.h"
#import <React/RCTDevMenu.h>

@interface ToggleNavigationBarMenuModule ()
@property(nonatomic, strong) RCTDevMenuItem *devMenuItem;
@end

@implementation ToggleNavigationBarMenuModule
RCT_EXPORT_MODULE();
@synthesize bridge = _bridge;

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

- (void)setBridge:(RCTBridge *)bridge {
    _bridge = bridge;

    [_bridge.devMenu addItem:self.devMenuItem];
}

- (RCTDevMenuItem *)devMenuItem {
    if (!_devMenuItem) {
        _devMenuItem = [RCTDevMenuItem
            buttonItemWithTitleBlock:^NSString * {
              return @"Toggle Navigation Bar";
            }
            handler:^{
              NSLog(@"My Test Clicked!");
            }];
    }

    return _devMenuItem;
}

@end
