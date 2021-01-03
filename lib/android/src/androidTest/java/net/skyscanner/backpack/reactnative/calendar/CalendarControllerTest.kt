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
import androidx.test.platform.app.InstrumentationRegistry
import com.jakewharton.threetenabp.AndroidThreeTen
import java.util.Locale
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.threeten.bp.LocalDate

@RunWith(AndroidJUnit4::class)
class CalendarControllerTest {

  @Before
  fun setup() {
    AndroidThreeTen.init(InstrumentationRegistry.getInstrumentation().targetContext)
  }

  @Test
  fun test_is_date_disabled() {
    val controller = CalendarController(
      InstrumentationRegistry.getInstrumentation().targetContext,
      Locale.UK
    )

    val date = LocalDate.of(2020, 3, 16)

    assertFalse(controller.isDateDisabled(date))

    controller.disabledDateMatcher = AnyMatcher(arrayOf(date))

    assertTrue(controller.isDateDisabled(date))
    assertFalse(controller.isDateDisabled(date.plusDays(1)))
  }
}
