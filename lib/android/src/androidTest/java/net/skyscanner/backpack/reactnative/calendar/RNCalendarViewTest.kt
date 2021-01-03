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
import java.util.*
import net.skyscanner.backpack.calendar.BpkCalendar
import net.skyscanner.backpack.calendar.model.CalendarCellStyle
import net.skyscanner.backpack.calendar.model.ColoredBucket
import net.skyscanner.backpack.calendar.presenter.HighlightedDaysAdapter
import net.skyscanner.backpack.calendar.presenter.SelectionType
import net.skyscanner.backpack.reactnative.testing.ReactContextTestRule
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.threeten.bp.LocalDate

@RunWith(AndroidJUnit4::class)
class RNCalendarViewTest {

  @get:Rule
  val contextRule = ReactContextTestRule()

  @Before
  fun setup() {
    AndroidThreeTen.init(InstrumentationRegistry.getInstrumentation().targetContext)
  }

  @Test
  fun test_render() {
    val calendar = RNCalendarView(contextRule.context)

    val minDate = LocalDate.of(2020, 3, 16)
    val maxDate = LocalDate.of(2020, 3, 20)
    val locale = "en"
    val selectionType = SelectionType.RANGE
    val disabledDateMatcher = AnyMatcher(arrayOf(
      LocalDate.of(2020, 3, 19)))
    val colorBuckets = arrayOf(
      RNColorBucket(
        1,
        AnyMatcher(
          arrayOf(
            LocalDate.of(2020, 3, 17))),
        null,
        null))

    val footerView = RNHighlightedDaysFooterView(
      contextRule.context,
      setOf(HighlightedDaysAdapter.HighlightedDay(
        LocalDate.of(2020, 3, 17),
        "test")))

    calendar.state.minDate = minDate
    calendar.state.maxDate = maxDate
    calendar.state.locale = locale
    calendar.state.selectionType = selectionType
    calendar.state.disabledDateMatcher = disabledDateMatcher
    calendar.state.colorBuckets = colorBuckets
    calendar.state.footerView = footerView

    calendar.state.dispatchUpdateTransactionFinished()

    val bpkCalendar = calendar.getChildAt(0)
    assertTrue(bpkCalendar is BpkCalendar)

    bpkCalendar as BpkCalendar
    val controller = bpkCalendar.controller as CalendarController

    assertEquals(minDate, controller.startDate)
    assertEquals(maxDate, controller.endDate)

    assertEquals(selectionType, controller.selectionType)
    assertEquals(disabledDateMatcher, controller.disabledDateMatcher)

    assertEquals(
      setOf(
        ColoredBucket(
          CalendarCellStyle.Custom(1),
          setOf(LocalDate.of(2020, 3, 17))
        )),
      controller.calendarColoring?.coloredBuckets)

    // Footer adapter does not support equality by content so we can't compare here.
    assertNotNull(controller.monthFooterAdapter)

    assertEquals(Locale.ENGLISH, controller.locale)
  }
}
