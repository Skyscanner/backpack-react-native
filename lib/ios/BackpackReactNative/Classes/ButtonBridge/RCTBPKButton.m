//
//  RCTBPKButton.m
//  Backpack
//
//  Created by Nicolas Frugoni on 08/04/2022.
//

#import <Foundation/Foundation.h>
#import <Backpack/Icon.h>
#import "RCTBPKButton.h"

@implementation RCTBPKButton

- (instancetype)initWithType:(NSString *)type large:(BOOL)large {
    self = [super initWithSize:[RCTBPKButton sizeForIsLarge:large] style:[RCTBPKButton styleForName:type]];
    [self addTarget:self action:@selector(onClick) forControlEvents:UIControlEventTouchUpInside];
    return self;
}

- (void)setRct_title:(NSString *)rct_title {
    _rct_title = rct_title;
    [self setTitle:rct_title];
}

- (void)setRct_icon:(NSString *)rct_icon {
    _rct_icon = rct_icon;
    UIImage *icon = self.rct_large ?
    [BPKIcon largeTemplateIconNamed:rct_icon]
    : [BPKIcon smallTemplateIconNamed:rct_icon];
    [self setImage:icon];
}

- (void)setRct_iconAlignment:(NSString *)rct_iconAlignment {
    _rct_iconAlignment = rct_iconAlignment;
    if ([rct_iconAlignment isEqual: @"leading"]) {
        self.imagePosition = BPKButtonImagePositionLeading;
    } else if ([rct_iconAlignment isEqual: @"trailing"]) {
        self.imagePosition = BPKButtonImagePositionTrailing;
    }
}

- (void)setRct_type:(NSString *)rct_type {
    _rct_type = rct_type;
    [self setStyle:[RCTBPKButton styleForName:rct_type]];
}

- (void)setRct_large:(BOOL)rct_large {
    _rct_large = rct_large;
    [self setSize: [RCTBPKButton sizeForIsLarge:rct_large]];
}

- (void)onClick {
    self.rct_onPress(@[]);
}

- (void)setRct_onPress:(RCTResponseSenderBlock)rct_onPress {
    _rct_onPress = rct_onPress;
}

+ (BPKButtonSize)sizeForIsLarge:(BOOL)isLarge {
    if (isLarge) {
        return BPKButtonSizeLarge;
    }
    return BPKButtonSizeDefault;
}

- (void)setRct_loading:(BOOL)rct_loading {
    _rct_loading = rct_loading;
    self.isLoading = rct_loading;
}

- (void)setRct_enabled:(BOOL)rct_enabled {
    _rct_enabled = rct_enabled;
    self.enabled = rct_enabled;
}

+ (BPKButtonStyle)styleForName:(NSString *)name {
    if ([name isEqual: @"primary"]) {
        return BPKButtonStylePrimary;
    } else if ([name isEqual: @"secondary"]) {
        return BPKButtonStyleSecondary;
    } else if ([name isEqual: @"secondaryOnDark"]) {
        return BPKButtonStyleSecondaryOnDark;
    } else if ([name isEqual: @"destructive"]) {
        return BPKButtonStyleDestructive;
    } else if ([name isEqual: @"featured"]) {
        return BPKButtonStyleFeatured;
    } else if ([name isEqual: @"link"]) {
        return BPKButtonStyleLink;
    } else if ([name isEqual: @"linkOnDark"]) {
        return BPKButtonStyleLinkOnDark;
    } else if ([name isEqual: @"primaryOnDark"]) {
        return BPKButtonStylePrimaryOnDark;
    } else if ([name isEqual: @"primaryOnLight"]) {
        return BPKButtonStylePrimaryOnLight;
    }
    return BPKButtonStylePrimary;
}

@end
