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
package net.skyscanner.backpack.reactnative.calendar

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import net.skyscanner.backpack.calendar.model.CalendarRange
import net.skyscanner.backpack.calendar.model.SingleDay
import net.skyscanner.backpack.calendar.presenter.SelectionType
import net.skyscanner.backpack.reactnative.calendar.events.CalendarChangeEvent
import org.threeten.bp.Instant
import org.threeten.bp.LocalDate
import org.threeten.bp.ZoneId
import kotlin.IllegalArgumentException

class CalendarViewManager : ViewGroupManager<RNCalendarView>() {

  companion object {
    const val VIEW_NAME = "AndroidBPKCalendarView"
    internal val ZONE_ID_UTC = ZoneId.of("UTC")
  }

  // This means we are not relying on RN's css to layout children and doing it ourselves.
  // see RNCalendarView.requestLayout
  override fun needsCustomLayoutForChildren() = true

  override fun getName() = VIEW_NAME

  override fun createViewInstance(reactContext: ThemedReactContext): RNCalendarView {
    return RNCalendarView(reactContext)
  }

  @ReactProp(name = "selectedDates")
  fun setSelectedDates(view: RNCalendarView, dates: ReadableArray) {
    view.selectedDates = (0..(dates.size() - 1)).map {
      unixToCalendarDay(dates.getInt(it))
    }.toTypedArray()
  }

  @ReactProp(name = "selectionType")
  fun setSelectionType(view: RNCalendarView, selectionType: String) {
    view.selectionType = when (selectionType) {
      "range" -> SelectionType.RANGE
      "single" -> SelectionType.SINGLE
      "multiple" -> SelectionType.RANGE // TODO: support multiple selection
      else -> throw IllegalArgumentException("Selection type $selectionType is not supported")
    }
  }

  @ReactProp(name = "locale")
  fun setLocale(view: RNCalendarView, locale: String) {
    view.locale = locale
  }

  @ReactProp(name = "minDate")
  fun setMinDate(view: RNCalendarView, minDate: Int?) {
    minDate?.let {
      view.minDate = unixToCalendarDay(it)
    }
  }

  @ReactProp(name = "maxDate")
  fun setMaxDate(view: RNCalendarView, maxDate: Int?) {
    maxDate?.let {
      view.maxDate = unixToCalendarDay(it)
    }
  }

  @ReactProp(name = "disabledDates")
  fun setDisabledDates(view: RNCalendarView, disableDates: ReadableMap?) {
    if (disableDates != null) {
      val type = disableDates.getString("type")
      val dates = disableDates.getArray("dates")
      if (type === null || dates === null || dates.size() == 0) {
        throw IllegalArgumentException("Invalid disabledDates prop, either type` or `dates` is invalid")
      }

      val parsedDates = (0 until dates.size()).map {
        unixToCalendarDay(dates.getInt(it))
      }.toTypedArray()

      view.disabledDateMatcher = DateMatcher.fromJs(type, parsedDates)
    } else {
      view.disabledDateMatcher = null
    }
  }

  override fun addEventEmitters(reactContext: ThemedReactContext, view: RNCalendarView) {
    val dispatcher = reactContext.getNativeModule(UIManagerModule::class.java).eventDispatcher

    view.onDatesChange = { selection ->
      val dates = mutableListOf<LocalDate>()
      when (selection) {
        is CalendarRange -> {
          selection.start?.let { dates.add(it) }
          selection.end?.let { dates.add(it) }
        }
        is SingleDay -> {
          dates.add(selection.selectedDay)
        }
      }

      dispatcher.dispatchEvent(CalendarChangeEvent(view.id, dates.toTypedArray()))
    }
  }

  override fun onAfterUpdateTransaction(view: RNCalendarView) {
    super.onAfterUpdateTransaction(view)
    view.render()
  }

  private fun unixToCalendarDay(unixTime: Int): LocalDate {
    // TODO: Explore sending a "dummy" date here (01-01-2019) to avoid having to deal with timezones
    return Instant.ofEpochMilli(unixTime * 1000L).atZone(ZONE_ID_UTC).toLocalDate()
  }
}
