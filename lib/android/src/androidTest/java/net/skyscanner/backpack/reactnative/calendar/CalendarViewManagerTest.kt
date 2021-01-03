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
import com.facebook.react.bridge.JSApplicationIllegalArgumentException
import com.facebook.react.bridge.JavaOnlyArray
import com.facebook.react.bridge.JavaOnlyMap
import com.facebook.react.uimanager.ReactStylesDiffMap
import com.facebook.react.uimanager.ThemedReactContext
import com.jakewharton.threetenabp.AndroidThreeTen
import io.mockk.mockk
import io.mockk.verify
import net.skyscanner.backpack.calendar.presenter.HighlightedDaysAdapter
import net.skyscanner.backpack.calendar.presenter.SelectionType
import net.skyscanner.backpack.reactnative.testing.Matchers.throws
import net.skyscanner.backpack.reactnative.testing.ReactViewManagerTestRule
import org.junit.Assert.assertArrayEquals
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertThat
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.threeten.bp.LocalDate

@RunWith(AndroidJUnit4::class)
class CalendarViewManagerTest {

  @get:Rule
  val managerRule = ReactViewManagerTestRule(CalendarViewManager::class)
  private val manager: CalendarViewManager
    get() = managerRule.manager

  private val themedContext: ThemedReactContext
    get() = managerRule.themedContext

  private val date1Seconds = 1584316800 // UTC 2020-03-16 in seconds
  private val date2Seconds = 1584662400 // UTC 2020-03-16 in seconds

  private lateinit var date1: LocalDate
  private lateinit var date2: LocalDate

  @Before
  fun setup() {
    AndroidThreeTen.init(InstrumentationRegistry.getInstrumentation().targetContext)
    date1 = LocalDate.of(2020, 3, 16)
    date2 = LocalDate.of(2020, 3, 20)
  }

  @Test
  fun test_title() {
    val view = createWithLocale()
    manager.updateProperties(view, buildProps(
      "selectedDates",
      JavaOnlyArray.of(date1Seconds, date2Seconds)))

    assertNotNull(view.state.selectedDates)
    assertArrayEquals(
      arrayOf(date1, date2),
      view.state.selectedDates)
  }

  @Test
  fun test_selection_type() {
    val view = createWithLocale()
    val options = mapOf(
      "range" to SelectionType.RANGE,
      "single" to SelectionType.SINGLE,
      "multiple" to SelectionType.RANGE // multiple is not supported yet
    )

    options.entries.forEach { entry ->
      val selectionType = entry.key
      val expected = entry.value

      manager.updateProperties(view, buildProps("selectionType", selectionType))
      assertNotNull(view.state.selectionType)

      assertEquals(expected, view.state.selectionType)
    }
  }

  @Test
  fun test_selection_type_invalid() {
    val view = createWithLocale()
    assertThat({
      manager.updateProperties(view, buildProps("selectionType", "invalid"))
    }, throws(JSApplicationIllegalArgumentException::class))
  }

  @Test
  fun test_locale() {
    val view = manager.createViewInstance(themedContext)
    manager.updateProperties(view, buildProps("locale", "pt_BR"))

    assertNotNull(view.state.locale)
    assertEquals("pt_BR", view.state.locale)
  }

  @Test
  fun test_min_date() {
    val view = createWithLocale()
    manager.updateProperties(view, buildProps("minDate", date1Seconds))

    assertNotNull(view.state.minDate)
    assertEquals(date1, view.state.minDate)
  }

  @Test
  fun test_max_date() {
    val view = createWithLocale()
    manager.updateProperties(view, buildProps("maxDate", date2Seconds))

    assertNotNull(view.state.maxDate)
    assertEquals(date2, view.state.maxDate)
  }

  @Test
  fun test_disable_dates_matcher() {
    val view = createWithLocale()
    manager.updateProperties(view, buildProps(
      "disabledDates", JavaOnlyMap.of(
        "type", "range",
        "dates", JavaOnlyArray.of(date1Seconds, date2Seconds)
    )))

    assertNotNull(view.state.disabledDateMatcher)
    assertEquals(RangeMatcher(date1, date2), view.state.disabledDateMatcher)
  }

  @Test
  fun test_disable_dates_matcher_invalid() {
    val view = createWithLocale()
    assertThat({
      manager.updateProperties(view, buildProps(
        "disabledDates", JavaOnlyMap.of(
          "type", "invalid",
          "dates", JavaOnlyArray.of(date1Seconds, date2Seconds)
      )))
    }, throws(JSApplicationIllegalArgumentException::class))

    assertThat({
      manager.updateProperties(view, buildProps(
        "disabledDates", JavaOnlyMap.of(
          "type", null,
          "dates", JavaOnlyArray.of(date1Seconds, date2Seconds)
      )))
    }, throws(JSApplicationIllegalArgumentException::class))

    assertThat({
      manager.updateProperties(view, buildProps(
        "disabledDates", JavaOnlyMap.of(
          "type", "range",
          "dates", null
      )))
    }, throws(JSApplicationIllegalArgumentException::class))
  }

  @Test
  fun test_color_buckets() {
    val view = createWithLocale()
    manager.updateProperties(view, buildProps(
      "colorBuckets", JavaOnlyArray.of(
        JavaOnlyMap.of(
          "color", 1,
          "textStyle", "light",
          "days", JavaOnlyMap.of(
            "type", "range",
            "dates", JavaOnlyArray.of(date1Seconds, date2Seconds))),
        JavaOnlyMap.of(
          "color", 2,
          "__cellStyle", "positive",
          "days", JavaOnlyMap.of(
            "type", "any",
            "dates", JavaOnlyArray.of(date2Seconds))))))

    assertNotNull(view.state.colorBuckets)
    assertArrayEquals(
      arrayOf(
        RNColorBucket(
          color = 1,
          days = RangeMatcher(date1, date2),
          textStyle = "light",
          cellStyle = null),
        RNColorBucket(
          color = 2,
          days = AnyMatcher(arrayOf(date2)),
          textStyle = null,
          cellStyle = "positive")),
      view.state.colorBuckets
    )
  }

  @Test
  fun test_color_buckets_invalid() {
    val view = createWithLocale()

    assertThat({
      manager.updateProperties(view,
        buildProps(
          "colorBuckets", JavaOnlyArray.of(null)))
    }, throws(JSApplicationIllegalArgumentException::class))

    assertThat({
      manager.updateProperties(view, buildProps(
        "colorBuckets", JavaOnlyArray.of(
          JavaOnlyMap.of(
            "color", 1,
            "textStyle", "light",
            "days", null))))
    }, throws(JSApplicationIllegalArgumentException::class))
  }

  @Test
  fun test_footer_view() {
    val view = createWithLocale()
    manager.updateProperties(view, buildProps(
      "androidFooterView", null))

    assertNull(view.state.footerView)

    manager.updateProperties(view, buildProps(
      "androidFooterView", JavaOnlyMap.of(
        "__type", "highlightedDays",
        "days", JavaOnlyArray.of(
          JavaOnlyMap.of(
            "date", date1Seconds,
            "description", "test day",
            "color", 1
          )))))

    assertEquals(
      RNHighlightedDaysFooterView(
        view.context,
        setOf(HighlightedDaysAdapter.HighlightedDay(date1, "test day", 1))
        ),
      view.state.footerView)
  }

  @Test
  fun test_footer_view_invalid() {
    val view = createWithLocale()

    assertThat({
      manager.updateProperties(view,
        buildProps(
          "androidFooterView", JavaOnlyMap.of(
            "__type", "invalid")))
    }, throws(JSApplicationIllegalArgumentException::class))

    assertThat({
      manager.updateProperties(view, buildProps(
        "androidFooterView", JavaOnlyMap.of(
          "__type", "highlightedDays",
          "daysss", JavaOnlyArray.of(
            JavaOnlyMap.of(
              "date", date1Seconds,
              "description", "test day"
            )))))
    }, throws(JSApplicationIllegalArgumentException::class))

    assertThat({
      manager.updateProperties(view, buildProps(
        "androidFooterView", JavaOnlyMap.of(
          "__type", "highlightedDays",
          "days", JavaOnlyArray.of(
            JavaOnlyMap.of(
              "description", "test day"
              )))))
    }, throws(JSApplicationIllegalArgumentException::class))

    assertThat({
      manager.updateProperties(view, buildProps(
        "androidFooterView", JavaOnlyMap.of(
          "__type", "highlightedDays",
          "days", JavaOnlyArray.of(
            JavaOnlyMap.of(
              "date", date1Seconds
            )))))
    }, throws(JSApplicationIllegalArgumentException::class))
  }

  @Test
  fun test_render_once_after_transaction() {
    val stateHolder = mockk<RNCalendarView.Companion.StateHolder>(relaxed = true)
    val view = RNCalendarView(themedContext, stateHolder)

    manager.updateProperties(view,
      buildProps(
        "selectedDates", JavaOnlyArray.of(date1Seconds, date2Seconds),
        "locale", "en",
        "disabledDates", JavaOnlyMap.of(
          "type", "range",
          "dates", JavaOnlyArray.of(date1Seconds, date2Seconds)),
        "selectionType", "range",
        "minDate", date1Seconds,
        "maxDate", date2Seconds,
        "disabledDates", JavaOnlyMap.of(
          "type", "any",
          "dates", JavaOnlyArray.of(date1Seconds, date2Seconds)),
        "colorBuckets", JavaOnlyArray.of(
          JavaOnlyMap.of(
            "color", 2,
            "__cellStyle", "positive",
            "days", JavaOnlyMap.of(
            "type", "any",
            "dates", JavaOnlyArray.of(date2Seconds)))),
        "androidFooterView", JavaOnlyMap.of(
          "__type", "highlightedDays",
          "days", JavaOnlyArray.of(
            JavaOnlyMap.of(
              "date", date1Seconds,
              "description", "test day",
              "color", 1
            )))))

    verify(exactly = 1) { stateHolder.dispatchUpdateTransactionFinished() }
  }

  @Test
  fun test_add_event_emitters() {
    val view = createWithLocale()
    manager.addEventEmitters(themedContext, view)
    assertNotNull(view.state.onDatesChange)
  }

  private fun buildProps(vararg keysAndValues: Any?): ReactStylesDiffMap? {
    return ReactStylesDiffMap(JavaOnlyMap.of(*keysAndValues))
  }

  private fun createWithLocale(locale: String = "en"): RNCalendarView {
    val view = manager.createViewInstance(themedContext)
    view.state.locale = locale
    return view
  }
}
