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

import android.content.Context
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import com.facebook.react.bridge.JSApplicationIllegalArgumentException
import com.facebook.react.bridge.JavaOnlyArray
import com.facebook.react.bridge.JavaOnlyMap
import java.util.Locale
import net.skyscanner.backpack.calendar.model.CalendarCellStyle
import net.skyscanner.backpack.calendar.presenter.HighlightedDaysAdapter
import net.skyscanner.backpack.reactnative.testing.Matchers.throws
import org.hamcrest.CoreMatchers.`is`
import org.hamcrest.CoreMatchers.instanceOf
import org.junit.Assert.assertArrayEquals
import org.junit.Assert.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.threeten.bp.LocalDate

@RunWith(AndroidJUnit4::class)
class RNFooterViewTest {

  // 2020-04-16 in seconds
  private val dateSeconds = 1586995200

  val context: Context
    get() = InstrumentationRegistry.getInstrumentation().targetContext

  @Test
  fun test_fromJS() {
    val footerView = RNFooterView.fromJS(
      context,
      JavaOnlyMap.of("__type", "highlightedDays",
        "days", JavaOnlyArray.of(
          JavaOnlyMap.of(
            "date", dateSeconds,
            "description", "test day"
          ))))
    assertThat(footerView, `is`(instanceOf(RNHighlightedDaysFooterView::class.java)))
  }

  @Test
  fun test_fromJS_with_invalid_type() {
    assertThat({
      RNFooterView.fromJS(
        context,
        JavaOnlyMap.of("__type", "invalid"))
    }, throws(JSApplicationIllegalArgumentException::class))
  }

  @Test
  fun test_HighlightedDaysFooterView_fromJS() {
    val footerView = RNHighlightedDaysFooterView.fromJS(
      context,
      JavaOnlyMap.of(
        "__type", "highlightedDays",
        "days", JavaOnlyArray.of(
          JavaOnlyMap.of(
            "date", dateSeconds,
            "description", "test day"
          ))))

    assertArrayEquals(
      arrayOf(
        HighlightedDaysAdapter.HighlightedDay(
          date = LocalDate.of(2020, 4, 16),
          description = "test day")),
      footerView.days.toTypedArray())
  }

  @Test
  fun test_HighlightedDaysFooterView_fromJS_with_color() {
    val footerView = RNHighlightedDaysFooterView.fromJS(
      context,
      JavaOnlyMap.of(
        "__type", "highlightedDays",
        "days", JavaOnlyArray.of(
          JavaOnlyMap.of(
            "date", dateSeconds,
            "description", "test day",
            "color", 1
          ))))

    assertArrayEquals(
      arrayOf(
        HighlightedDaysAdapter.HighlightedDay(
          date = LocalDate.of(2020, 4, 16),
          description = "test day",
          color = 1)),
      footerView.days.toTypedArray())
  }

  @Test
  fun test_HighlightedDaysFooterView_fromJS_with_cellStyle() {
    val footerView = RNHighlightedDaysFooterView.fromJS(
      context,
      JavaOnlyMap.of(
        "__type", "highlightedDays",
        "days", JavaOnlyArray.of(
          JavaOnlyMap.of(
            "date", dateSeconds,
            "description", "test day",
            "cellStyle", "positive"
          ))))

    assertArrayEquals(
      arrayOf(
        HighlightedDaysAdapter.HighlightedDay(
          date = LocalDate.of(2020, 4, 16),
          description = "test day",
          color = CalendarCellStyle.Positive.color(context))),
      footerView.days.toTypedArray())
  }

  @Test
  fun test_HighlightedDaysFooterView_fromJS_with_color_and_cellStyle() {
    val footerView = RNHighlightedDaysFooterView.fromJS(
      context,
      JavaOnlyMap.of(
        "__type", "highlightedDays",
        "days", JavaOnlyArray.of(
          JavaOnlyMap.of(
            "date", dateSeconds,
            "description", "test day",
            "color", 1,
            "cellStyle", "positive"
          ))))

    assertArrayEquals(
      arrayOf(
        HighlightedDaysAdapter.HighlightedDay(
          date = LocalDate.of(2020, 4, 16),
          description = "test day",
          color = CalendarCellStyle.Positive.color(context))),
      footerView.days.toTypedArray())
  }

  @Test
  fun test_HighlightedDaysFooterView_asFooterAdapter() {
    val footerView = RNFooterView.fromJS(
      context,
      JavaOnlyMap.of(
        "__type", "highlightedDays",
        "days", JavaOnlyArray.of(
          JavaOnlyMap.of(
            "date", dateSeconds,
            "description", "test day"
          ))))

    assertThat(
      footerView.asFooterAdapter(Locale.UK),
      `is`(instanceOf(HighlightedDaysAdapter::class.java)))
  }

  @Test
  fun test_HighlightedDaysFooterView_invalid_fields() {
    assertThat({
      RNFooterView.fromJS(
        context,
        JavaOnlyMap.of(
          "__type", "highlightedDays",
          "daysss", JavaOnlyArray.of(
            JavaOnlyMap.of(
              "date", dateSeconds,
              "description", "test day"
            )
          )
        )
      ).asFooterAdapter(Locale.UK)
    }, throws(JSApplicationIllegalArgumentException::class))

    assertThat({
      RNFooterView.fromJS(
        context,
        JavaOnlyMap.of(
          "__type", "highlightedDays",
          "days", JavaOnlyArray.of(
            JavaOnlyMap.of(
              "description", "test day"
            )
          )
        )
      ).asFooterAdapter(Locale.UK)
    }, throws(JSApplicationIllegalArgumentException::class))

    assertThat({
      RNFooterView.fromJS(
        context,
        JavaOnlyMap.of(
          "__type", "highlightedDays",
          "days", JavaOnlyArray.of(
            JavaOnlyMap.of(
              "date", dateSeconds
            )
          )
        )
      ).asFooterAdapter(Locale.UK)
    }, throws(JSApplicationIllegalArgumentException::class))
  }
}
