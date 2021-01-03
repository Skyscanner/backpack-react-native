/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
import com.facebook.react.bridge.JSApplicationIllegalArgumentException
import net.skyscanner.backpack.calendar.model.CalendarCellStyle
import net.skyscanner.backpack.reactnative.testing.Matchers.throws
import org.junit.Assert.assertEquals
import org.junit.Assert.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.threeten.bp.LocalDate

@RunWith(AndroidJUnit4::class)
class TypeConversionsTest {

  @Test
  fun test_stringToCellStyle() {
    mapOf(
      "positive" to CalendarCellStyle.Positive,
      "neutral" to CalendarCellStyle.Neutral,
      "negative" to CalendarCellStyle.Negative,
      "highlight" to CalendarCellStyle.Hightlight
    ).entries.forEach {
      val str = it.key
      val expected = it.value

      assertEquals(expected, TypeConversions.stringToCellStyle(str))
    }
  }

  @Test
  fun test_stringToCellStyle_invalid() {
    assertThat({
      TypeConversions.stringToCellStyle("invalid")
    }, throws(JSApplicationIllegalArgumentException::class))
  }

  @Test
  fun test_unixTimestampToLocalDate() {
    val expected = LocalDate.of(2020, 4, 16)
    assertEquals(expected, TypeConversions.unixTimestampToLocalDate(1586995200))
  }
}
