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
#import "RCTBPKDialogButtonAction.h"

NS_ASSUME_NONNULL_BEGIN

@interface RCTBPKDialogButtonAction ()
@property(nonatomic, assign) BPKButtonStyle style;
@property(nonatomic, copy) NSString *title;

- (instancetype _Nonnull)initWithButtonStyle:(BPKButtonStyle)style title:(NSString *)title;
@end

@implementation RCTBPKDialogButtonAction

- (instancetype _Nonnull)initWithButtonStyle:(BPKButtonStyle)style title:(NSString *)title {
    self = [super init];

    if (self) {
        self.style = style;
        self.title = title;
    }

    return self;
}

+ (instancetype _Nonnull)actionWithTitle:(NSString *)title style:(BPKButtonStyle)style {
    return [[self alloc] initWithButtonStyle:style title:title];
}

@end

@implementation RCTConvert (RCTBPKDialogButtonAction)

RCT_ARRAY_CONVERTER(RCTBPKDialogButtonAction);

+ (BPKButtonStyle)buttomStyleFrom:(NSString *)style {
    if ([style isEqual:@"primary"]) {
        return BPKButtonStylePrimary;
    } else if ([style isEqual:@"secondary"]) {
        return BPKButtonStyleSecondary;
    } else if ([style isEqual:@"destructive"]) {
        return BPKButtonStyleDestructive;
    } else if ([style isEqual:@"featured"]) {
        return BPKButtonStyleFeatured;
    } else {
        return BPKButtonStylePrimary;
    }
}

+ (RCTBPKDialogButtonAction *_Nullable)RCTBPKDialogButtonAction:(id)json {
    if (!json) {
        return nil;
    }

    if ([json isKindOfClass:[NSDictionary class]]) {
        NSDictionary *payload = (NSDictionary *)json;
        NSString *title = payload[@"text"];
        BPKButtonStyle style = [self buttomStyleFrom:payload[@"type"]];
        return [RCTBPKDialogButtonAction actionWithTitle:title style:style];
    }

    RCTLogConvertError(json, @"a valid RCTBPKDialogButtonAction action");
    return nil;
}

@end
NS_ASSUME_NONNULL_END
