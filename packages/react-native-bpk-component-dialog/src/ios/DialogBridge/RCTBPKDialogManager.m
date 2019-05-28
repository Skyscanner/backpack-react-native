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

#import "RCTBPKDialogManager.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>


#import "RCTConvert+RCTBPKDialog.h"
#import "RCTBPKDialog.h"
#import "RCTBPKDialogDateUtils.h"


@interface RCTBPKDialogManager() <RCTDialogHostViewInteractor>

@end


@implementation RCTBPKDialogManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
    RCTBPKDialog *dialog = [[RCTBPKDialog alloc] initWithBridge:self.bridge];
    dialog.delegate = self;
    return dialog;
}

- (void)presentBPKDialog:(RCTBPKDialog *)bpkDialog withViewController:(ViewController *)viewController
{
    dispatch_block_t completionBlock = ^{
        if (bpkDialog.onShow) {
            bpkDialog.onShow(nil)
        }
    };
    if (_presentationBlock) {
        _presentationBlock([bpkDialog reactViewController], viewController, YES, completionBlock);
    } else {
        [[bpkDialog reactViewController] presentViewController:viewController animated:YES completion:completionBlock]
    }
}

- (void)dismissBPKDialog:(RCTBPKDialog *)bpkDialog withViewController:(ViewController *)viewController
{
    dispatch_block_t completionBlock = ^{
        if (bpkDialog.identifier) {
            bpkDialog.onShow(nil)
        }
    };
    if (_dismissalBlock) {
        _dismissalBlock([bpkDialog reactViewController], viewController, YES, completionBlock);
    } else {
        [[bpkDialog reactViewController] dismissViewController:viewController animated:YES completion:completionBlock]
    }
}

RCT_REMAP_VIEW_PROPERTY(minDate, rct_minDate, NSDate)
RCT_REMAP_VIEW_PROPERTY(maxDate, rct_maxDate, NSDate)
RCT_EXPORT_VIEW_PROPERTY(selectionType, BPKDialogSelection)
RCT_EXPORT_VIEW_PROPERTY(locale, NSLocale)
RCT_REMAP_VIEW_PROPERTY(selectedDates, rct_selectedDates, NSArray<NSDate *> *)

RCT_EXPORT_VIEW_PROPERTY(onDateSelection, RCTBubblingEventBlock)


/*
 * When the dialog renders in certain configurations the initial
 * render is incorrect. With this method, called from `componentDidMount`,
 * is called the dialog is forced to re-render to fix the bug.
 */
RCT_EXPORT_METHOD(forceRender:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:
     ^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry){
         UIView *view = viewRegistry[reactTag];

         if ([view isKindOfClass:[BPKDialog class]]) {
             BPKDialog *dialog = (BPKDialog *)view;
             NSArray<BPKSimpleDate* > *selectedDates = dialog.selectedDates;

             dialog.selectedDates = @[];
             [dialog reloadData];

             /*
              * Force a slight pause before rendering again with the
              * selected dates.
              */
             [[NSOperationQueue currentQueue] addOperationWithBlock:^{
                 dialog.selectedDates = selectedDates;
                 [dialog reloadData];
             }];
         } else {
             RCTLogError(@"tried to force render: on non-BPKDialog view %@ "
                         "with tag #%@", view, reactTag);
         }
     }];

}

#pragma mark RCTDialogViewDelegate

/*
 * `RCTBPKDialogManager` acts as the delegate of all of the `RCTBPKDialog` views. This is just one
 * pattern and it's perfectly fine to call `onDateSelection` from the `RCTBPKDialog` directly.
 */
- (void)dialog:(RCTBPKDialog *)dialog didChangeDateSelection:(NSArray<BPKSimpleDate *> *)dateList {
    if (!dialog.onDateSelection) {
        return;
    }

    NSMutableArray<NSNumber *> * dateArray = [[NSMutableArray alloc] initWithCapacity:dateList.count];
    for (BPKSimpleDate *date in dateList) {
        // The React Native interface uses UTC dates regardless of the local time zone
        // Thus we need to convert the dates to UTC instead of the local time zone here.
        NSDate* localDate = [dialog dateFromSimpleDate:date];
        NSDate *dateInUTC = [RCTBPKDialogDateUtils convertDateToUTC:localDate
                                                        localDialog:dialog.gregorian
                                                          utcDialog:dialog.utcDialog];
        [dateArray addObject:@([dateInUTC timeIntervalSince1970])];
    }

    dialog.onDateSelection(@{@"selectedDates": dateArray});
}

@end
