//
//  RCTBPKButton.h
//  Pods
//
//  Created by Nicolas Frugoni on 08/04/2022.
//

#import <Backpack/Button.h>
#import <React/RCTBridgeModule.h>

@interface RCTBPKButton : BPKButton

@property(nonatomic, strong) NSString *rct_title;
@property(nonatomic, strong) NSString *rct_iconAlignment;
@property(nonatomic, strong) NSString *rct_type;
@property(nonatomic, strong) NSString *rct_icon;
@property(nonatomic) BOOL rct_large;
@property(nonatomic) BOOL rct_loading;
@property(nonatomic) BOOL rct_enabled;
@property(nonatomic) RCTResponseSenderBlock onPress;

- (instancetype)initWithType:(NSString *)type large:(BOOL)large;

@end
