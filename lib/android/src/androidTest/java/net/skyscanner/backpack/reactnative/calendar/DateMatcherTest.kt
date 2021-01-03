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
package net.skyscanner.backpack.reactnative.calendar

import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import com.facebook.react.bridge.JSApplicationIllegalArgumentException
import com.jakewharton.threetenabp.AndroidThreeTen
import net.skyscanner.backpack.reactnative.testing.Matchers.throws
import org.hamcrest.Matchers.*
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.threeten.bp.LocalDate

@RunWith(AndroidJUnit4::class)
class DateMatcherTest {

  @Before
  fun setup() {
    AndroidThreeTen.init(InstrumentationRegistry.getInstrumentation().targetContext)
  }

  @Test
  fun test_create_range_matcher_from_js() {
    val startDate = LocalDate.of(2020, 3, 16)
    val endDate = LocalDate.of(2020, 3, 20)
    val matcher = DateMatcher.fromJs("range", arrayOf(startDate, endDate))

    assertThat(matcher, `is`(instanceOf(RangeMatcher::class.java)))
    assertEquals(RangeMatcher(startDate, endDate), matcher)
  }

  @Test
  fun test_create_after_matcher_from_js() {
    val startDate = LocalDate.of(2020, 3, 16)
    val matcher = DateMatcher.fromJs("after", arrayOf(startDate))

    assertThat(matcher, `is`(instanceOf(AfterMatcher::class.java)))
    assertEquals(AfterMatcher(startDate), matcher)
  }

  @Test
  fun test_create_before_matcher_from_js() {
    val startDate = LocalDate.of(2020, 3, 16)
    val matcher = DateMatcher.fromJs("before", arrayOf(startDate))

    assertThat(matcher, `is`(instanceOf(BeforeMatcher::class.java)))
    assertEquals(BeforeMatcher(startDate), matcher)
  }

  @Test
  fun test_create_any_matcher_from_js() {
    val startDate = LocalDate.of(2020, 3, 16)
    val matcher = DateMatcher.fromJs("any", arrayOf(startDate, startDate, startDate))

    assertThat(matcher, `is`(instanceOf(AnyMatcher::class.java)))
    assertEquals(AnyMatcher(arrayOf(startDate, startDate, startDate)), matcher)
  }

  @Test
  fun test_create_invalid_matcher_from_js() {
    assertThat({
      DateMatcher.fromJs("invalid", arrayOf())
    }, throws(JSApplicationIllegalArgumentException::class))
  }

  @Test
  fun test_range_matcher() {
    val startDate = LocalDate.of(2020, 3, 16)
    val endDate = LocalDate.of(2020, 3, 20)
    val matcher = DateMatcher.fromJs("range", arrayOf(startDate, endDate))

    assertTrue(matcher.match(startDate))
    assertTrue(matcher.match(startDate.plusDays(2)))
    assertTrue(matcher.match(endDate))

    assertFalse(matcher.match(startDate.minusDays(1)))
    assertFalse(matcher.match(endDate.plusDays(1)))
  }

  @Test
  fun test_before_matcher() {
    val startDate = LocalDate.of(2020, 3, 16)
    val matcher = DateMatcher.fromJs("before", arrayOf(startDate))

    assertTrue(matcher.match(startDate.minusDays(1)))
    assertFalse(matcher.match(startDate))
    assertFalse(matcher.match(startDate.plusDays(1)))
  }

  @Test
  fun test_after_matcher() {
    val startDate = LocalDate.of(2020, 3, 16)
    val matcher = DateMatcher.fromJs("after", arrayOf(startDate))

    assertTrue(matcher.match(startDate.plusDays(1)))
    assertFalse(matcher.match(startDate))
    assertFalse(matcher.match(startDate.minusDays(1)))
  }

  @Test
  fun test_any_matcher() {
    val date1 = LocalDate.of(2020, 3, 16)
    val date2 = LocalDate.of(2020, 3, 1)

    val matcher = DateMatcher.fromJs("any", arrayOf(date1, date2))

    assertTrue(matcher.match(date1))
    assertTrue(matcher.match(date2))
    assertFalse(matcher.match(date2.plusDays(1)))
    assertFalse(matcher.match(date1.plusDays(1)))
  }

  @Test
  fun test_range_matcher_toSet() {
    val startDate = LocalDate.of(2020, 3, 16)
    val endDate = LocalDate.of(2020, 3, 20)
    val matcher = DateMatcher.fromJs("range", arrayOf(startDate, endDate))

    assertArrayEquals(
      buildRange(startDate, endDate, true).toTypedArray(),
      matcher.toSet(startDate, endDate).toTypedArray())

    // With lower bounds
    assertArrayEquals(
      buildRange(LocalDate.of(2020, 3, 17), endDate, true).toTypedArray(),
      matcher.toSet(LocalDate.of(2020, 3, 17), endDate).toTypedArray())

    // With upper bounds
    assertArrayEquals(
      buildRange(startDate, LocalDate.of(2020, 3, 19), true).toTypedArray(),
      matcher.toSet(startDate, LocalDate.of(2020, 3, 19)).toTypedArray())
  }

  @Test
  fun test_before_matcher_toSet() {
    val startDate = LocalDate.of(2020, 3, 16)
    val endDate = LocalDate.of(2020, 3, 20)
    val matcher = DateMatcher.fromJs("before", arrayOf(endDate))

    assertArrayEquals(
      buildRange(startDate, endDate).reversed().toTypedArray(),
      matcher.toSet(startDate, endDate).toTypedArray())

    // With lower bounds
    assertArrayEquals(
      buildRange(LocalDate.of(2020, 3, 17), endDate).reversed().toTypedArray(),
      matcher.toSet(LocalDate.of(2020, 3, 17), endDate).toTypedArray())

    // With upper bounds
    assertArrayEquals(
      // Before is exclusive but when the upper bound is smaller than the start date we should include all
      // dates, because in this case the upper bound is already before the end date
      buildRange(startDate, LocalDate.of(2020, 3, 19), inclusive = true).reversed().toTypedArray(),
      matcher.toSet(startDate, LocalDate.of(2020, 3, 19)).toTypedArray())
  }

  @Test
  fun test_after_matcher_toSet() {
    val startDate = LocalDate.of(2020, 3, 16)
    val endDate = LocalDate.of(2020, 3, 20)
    val matcher = DateMatcher.fromJs("after", arrayOf(startDate))

    assertArrayEquals(
      // After should exclude the start date but include the end
      buildRange(startDate.plusDays(1), endDate, inclusive = true).toTypedArray(),
      matcher.toSet(startDate, endDate).toTypedArray())

    // With lower bounds
    assertArrayEquals(
      // After is exclusive but when the lower bound is bigger than the start date we should include all
      // dates, because in this case the lower bound is already after the start date
      buildRange(LocalDate.of(2020, 3, 17), endDate, inclusive = true).toTypedArray(),
      matcher.toSet(LocalDate.of(2020, 3, 17), endDate).toTypedArray())

    // With upper bounds
    assertArrayEquals(
      buildRange(startDate.plusDays(1), LocalDate.of(2020, 3, 19), inclusive = true).toTypedArray(),
      matcher.toSet(startDate, LocalDate.of(2020, 3, 19)).toTypedArray())
  }

  @Test
  fun test_any_matcher_toSet() {
    val startDate = LocalDate.of(2020, 3, 16)
    val endDate = LocalDate.of(2020, 3, 20)
    val matcher = DateMatcher.fromJs("any", arrayOf(startDate, endDate))

    assertArrayEquals(arrayOf(startDate, endDate), matcher.toSet(startDate, endDate).toTypedArray())
  }

  private fun buildRange(start: LocalDate, end: LocalDate, inclusive: Boolean = false): List<LocalDate> {
    var range = start.until(end).days
    if (inclusive) {
      range += 1
    }
    return (0 until range).map {
      start.plusDays(it.toLong())
    }
  }
}
