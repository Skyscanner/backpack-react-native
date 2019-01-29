//
//  RCTBPKCalendarDateUtilsTests.m
//  Backpack Native Tests
//
//  Created by Hugo Tunius on 29/01/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <XCTest/XCTest.h>

#import <react-native-bpk-component-calendar/RCTBPKCalendarDateUtils.h>

@interface RCTBPKCalendarDateUtilsTests : XCTestCase
@property(nonatomic, strong) NSCalendar *localCalendar;
@property(nonatomic, strong) NSCalendar *utcCalendar;

@property(nonatomic, readonly) NSDate *midnight20190124UTC;
@property(nonatomic, readonly) NSDate *midnight20190124BST;
@end

@implementation RCTBPKCalendarDateUtilsTests

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
  NSDate *originalDate = [self.localCalendar dateWithEra:1 year:2017 month:05 day:25 hour:0 minute:0 second:0 nanosecond:0];

  NSDate *utcDate = [RCTBPKCalendarDateUtils convertDateToUTC:originalDate
                                                localCalendar:self.localCalendar
                                                  utcCalendar:self.utcCalendar];

  NSDate *result = [RCTBPKCalendarDateUtils convertDateToLocal:utcDate
                                                 localCalendar:self.localCalendar
                                                   utcCalendar:self.utcCalendar];


  XCTAssertEqualObjects(originalDate, result);
  XCTAssertNotEqualObjects(originalDate, utcDate);
}

@end
