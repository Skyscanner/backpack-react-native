//
//  ToggleNavigationBarMenuModule.h
//  Backpack Native
//
//  Created by Hugo Tunius on 01/08/2018.
//  Copyright 2016-2021 Skyscanner Ltd
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@class RCTDevMenuItem;
@interface ToggleNavigationBarMenuModule : NSObject <RCTBridgeModule>
@property(nonatomic, strong, readonly) RCTDevMenuItem *devMenuItem;
@end
