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
#import "RCTBPKSnackbarManager.h"

#import <Backpack/Icon.h>
#import <Backpack/Snackbar.h>

#import "RCTConvert+RCTBPKSnackbar.h"

// A snack bar and its callback
@interface RCTBPKSnackbarWithCallback : NSObject
@property(nonatomic, weak) BPKSnackbar *snackbar;
@property(nonatomic, strong) RCTResponseSenderBlock callback;
@end

@implementation RCTBPKSnackbarWithCallback

@end

@interface RCTBPKSnackbarManager() <BPKSnackbarDelegate>

// Ideally we'd use `NSHashTable` with weak pointers here but because we also need to keep
// track of the callback we have to use another object to store the callback(strong) and the snackbar(weak).
@property(nonatomic, readonly, strong) NSMutableArray<RCTBPKSnackbarWithCallback *> *activeSnackbars;
@end

@implementation RCTBPKSnackbarManager
@synthesize activeSnackbars = _activeSnackbars;

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup {
    return NO;
}

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(showWithArgs:(NSDictionary<NSString *, id> *)args
                  callback:(RCTResponseSenderBlock)callback) {
    UIViewController *presentingViewController = RCTPresentedViewController();
    NSString *title = [RCTConvert NSString:args[@"title"]];
    NSString *text = [RCTConvert NSString:args[@"text"]];
    NSString *icon = [RCTConvert NSString:args[@"icon"]];
    NSDictionary *action = [RCTConvert NSDictionary:args[@"action"]];
    BPKSnackbarDuration duration = [RCTConvert BPKSnackbarDuration:args[@"duration"]];
    BPKSnackbar *_Nullable snackbar = nil;

    if (action || icon) {
        NSString *buttonTitle = [RCTConvert NSString:action[@"text"]];
        NSString *buttonIconName = [RCTConvert NSString:action[@"icon"]];
        NSString *buttonAccessibilityLabel = [RCTConvert NSString:action[@"accessibilityLabel"]];
        UIImage *leftIcon = [[self class] createIconWithName:icon];
        UIImage *buttonIcon = [[self class] createIconWithName:buttonIconName];

        BPKSnackbarButton *button = nil;

        if (buttonTitle) {
            button = [BPKSnackbarButton buttonWithTitle:buttonTitle];
        } else if (buttonIcon && buttonAccessibilityLabel.length > 0) {
            button = [BPKSnackbarButton buttonWithIcon:buttonIcon accessibilityLabel:buttonAccessibilityLabel];
        }

        snackbar = [[BPKSnackbar alloc] initWithText:text
                                               title:title
                                              button:button
                                            leftIcon:leftIcon
                                            duration:duration
                                      viewController:presentingViewController
                                            delegate:self];
    } else {
        snackbar = [[BPKSnackbar alloc] initWithText:text
                                               title:title
                                            duration:duration
                                      viewController:presentingViewController
                                            delegate:self];
    }

    RCTBPKSnackbarWithCallback *snackbarWithCallback = [RCTBPKSnackbarWithCallback new];
    snackbarWithCallback.snackbar = snackbar;
    snackbarWithCallback.callback = callback;
    [self.activeSnackbars addObject:snackbarWithCallback];

    [snackbar show];
}

RCT_EXPORT_METHOD(dismissAll) {
    for (RCTBPKSnackbarWithCallback *snackbarWithCallback in self.activeSnackbars) {
        [snackbarWithCallback.snackbar dismiss];
    }

    [self.activeSnackbars removeAllObjects];
}

- (NSDictionary<NSString *, id> *)constantsToExport {
    return @{
        @"LENGTH_LONG": @(BPKSnackbarDurationLong),
        @"LENGTH_SHORT": @(BPKSnackbarDurationShort),
        @"LENGTH_INDEFINITE": @(BPKSnackbarDurationIndefinite),
    };
}

#pragma mark - Snackbar Delegate

- (void)snackbar:(BPKSnackbar *)snackbar dismissedWithCause:(BPKSnackbarDismissCause)cause {
    for (RCTBPKSnackbarWithCallback *snackbarWithCallback in self.activeSnackbars) {
        if (snackbarWithCallback.snackbar == snackbar) {
            if (cause == BPKSnackbarDismissCauseActionButton) {
                snackbarWithCallback.callback(@[]);
            }

            [self.activeSnackbars removeObject:snackbarWithCallback];
            break;
        }
    }
}

#pragma mark - RCTInvalidating

- (void)invalidate {
    for (RCTBPKSnackbarWithCallback *snackbarWithCallback in self.activeSnackbars) {
        [snackbarWithCallback.snackbar dismiss];
    }

    [self.activeSnackbars removeAllObjects];
}

#pragma mark - Private

- (NSMutableArray<RCTBPKSnackbarWithCallback *> *)activeSnackbars {
    if (!_activeSnackbars) {
        _activeSnackbars = [[NSMutableArray alloc] init];
    }

    return _activeSnackbars;
}

+ (UIImage *)createIconWithName:(NSString *_Nullable)name {
    if (!name) {
        return nil;
    }

    return [BPKIcon templateIconNamed:name size:BPKIconSizeSmall];
}


@end
