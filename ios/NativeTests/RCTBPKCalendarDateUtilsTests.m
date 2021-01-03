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

#import <XCTest/XCTest.h>

#import <BackpackReactNative/RCTBPKCalendarDateUtils.h>

@interface RCTBPKCalendarDateUtilsTests : XCTestCase
@property(nonatomic, strong) NSCalendar *localCalendar;
@property(nonatomic, strong) NSCalendar *utcCalendar;

@property(nonatomic, readonly) NSDate *midnight20190124UTC;
@property(nonatomic, readonly) NSDate *midnight20190124BST;
@end

@implementation RCTBPKCalendarDateUtilsTests

- (NSDate *)midnight20190121UTC {
    return [NSDate dateWithTimeIntervalSince1970:1548028800];
}

- (NSDate *)midnight20190124UTC {
    return [NSDate dateWithTimeIntervalSince1970:1548288000];
}

- (NSDate *)midnight20190124BST {
    return [NSDate dateWithTimeIntervalSince1970:1548298800];
}

- (void)setUp {
    self.localCalendar = [[NSCalendar alloc] initWithCalendarIdentifier:NSCalendarIdentifierGregorian];
    // Brasilia Standard Time
    self.localCalendar.timeZone = [[NSTimeZone alloc] initWithName:@"America/Fortaleza"];

    self.utcCalendar = [[NSCalendar alloc] initWithCalendarIdentifier:NSCalendarIdentifierGregorian];
    self.utcCalendar.timeZone = [[NSTimeZone alloc] initWithName:@"UTC"];
}

- (void)testUTCtoLocal {
    NSDate *result = [RCTBPKCalendarDateUtils convertDateToLocal:self.midnight20190124UTC
                                                   localCalendar:self.localCalendar
                                                     utcCalendar:self.utcCalendar];

    XCTAssertEqualObjects(result, self.midnight20190124BST);
}

- (void)testLocalToUTC {
    NSDate *result = [RCTBPKCalendarDateUtils convertDateToUTC:self.midnight20190124BST
                                                 localCalendar:self.localCalendar
                                                   utcCalendar:self.utcCalendar];

    XCTAssertEqualObjects(result, self.midnight20190124UTC);
}

- (void)testInverseLocal {
    NSDate *originalDate = [self.localCalendar dateWithEra:1
                                                      year:2017
                                                     month:05
                                                       day:25
                                                      hour:0
                                                    minute:0
                                                    second:0
                                                nanosecond:0];

    NSDate *utcDate = [RCTBPKCalendarDateUtils convertDateToUTC:originalDate
                                                  localCalendar:self.localCalendar
                                                    utcCalendar:self.utcCalendar];

    NSDate *result = [RCTBPKCalendarDateUtils convertDateToLocal:utcDate
                                                   localCalendar:self.localCalendar
                                                     utcCalendar:self.utcCalendar];

    XCTAssertEqualObjects(originalDate, result);
    XCTAssertNotEqualObjects(originalDate, utcDate);
}

- (void)testDateIsBefore {
    XCTAssertTrue([RCTBPKCalendarDateUtils date:self.midnight20190121UTC isBeforeDate:self.midnight20190124UTC]);
    XCTAssertFalse([RCTBPKCalendarDateUtils date:self.midnight20190124UTC isBeforeDate:self.midnight20190121UTC]);
    XCTAssertFalse([RCTBPKCalendarDateUtils date:self.midnight20190121UTC isBeforeDate:self.midnight20190121UTC]);
}

- (void)testDateIsAfter {
    XCTAssertTrue([RCTBPKCalendarDateUtils date:self.midnight20190124UTC isAfterDate:self.midnight20190121UTC]);
    XCTAssertFalse([RCTBPKCalendarDateUtils date:self.midnight20190121UTC isAfterDate:self.midnight20190124UTC]);
    XCTAssertFalse([RCTBPKCalendarDateUtils date:self.midnight20190121UTC isAfterDate:self.midnight20190121UTC]);
}

@end
