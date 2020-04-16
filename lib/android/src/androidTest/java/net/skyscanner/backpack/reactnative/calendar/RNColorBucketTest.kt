/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package net.skyscanner.backpack.reactnative.calendar

import androidx.test.ext.junit.runners.AndroidJUnit4
import net.skyscanner.backpack.calendar.model.CalendarCellStyle
import net.skyscanner.backpack.calendar.model.ColoredBucket
import org.junit.Assert.assertEquals
import org.junit.Test
import org.junit.runner.RunWith
import org.threeten.bp.LocalDate

@RunWith(AndroidJUnit4::class)
class RNColorBucketTest {

  @Test
  fun test_asColorBucket() {
    val startDate = LocalDate.of(2020, 4, 15)
    val endDate = LocalDate.of(2020, 4, 17)
    val date = LocalDate.of(2020, 4, 16)

    assertEquals(
      ColoredBucket(CalendarCellStyle.Custom(0), setOf(date)),
      RNColorBucket(0, AnyMatcher(arrayOf(date)), textStyle = null, cellStyle = null)
        .asColorBucket(startDate, endDate)
    )
  }

  @Test
  fun test_asColorBucket_with_textStyle() {
    val startDate = LocalDate.of(2020, 4, 15)
    val endDate = LocalDate.of(2020, 4, 17)
    val date = LocalDate.of(2020, 4, 16)

    assertEquals(
      ColoredBucket(CalendarCellStyle.Custom(0, CalendarCellStyle.TextStyle.Dark), setOf(date)),
      RNColorBucket(0, AnyMatcher(arrayOf(date)), textStyle = "dark", cellStyle = null)
        .asColorBucket(startDate, endDate)
    )
  }

  @Test
  fun test_asColorBucket_with_cellStyle() {
    val startDate = LocalDate.of(2020, 4, 15)
    val endDate = LocalDate.of(2020, 4, 17)
    val date = LocalDate.of(2020, 4, 16)

    assertEquals(
      ColoredBucket(CalendarCellStyle.Positive, setOf(date)),
      RNColorBucket(0, AnyMatcher(arrayOf(date)), textStyle = null, cellStyle = "positive")
        .asColorBucket(startDate, endDate)
    )
  }
}
