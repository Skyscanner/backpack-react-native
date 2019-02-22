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
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.uimanager.annotations.ReactProp
import net.skyscanner.backpack.calendar.model.CalendarDay
import net.skyscanner.backpack.reactnative.calendar.events.CalendarChangeEvent
import java.text.SimpleDateFormat
import java.util.*

class CalendarViewManager : SimpleViewManager<RNCalendarView>() {

  companion object {
    const val VIEW_NAME = "AndroidBPKCalendarView"
    val TIMEZONE = TimeZone.getTimeZone("UTC")
  }

  override fun getName() = VIEW_NAME

  override fun createViewInstance(reactContext: ThemedReactContext): RNCalendarView {
    return RNCalendarView(reactContext)
  }

  @ReactProp(name = "selectedDates")
  fun setSelectedDates(view: RNCalendarView, dates: ReadableArray) {
    view.selectedDates = (0..(dates.size() - 1)).map {
      unixToCalendar(dates.getInt(it))
    }.toTypedArray()
  }

  @ReactProp(name = "locale")
  fun setLocale(view: RNCalendarView, locale: String) {
    view.locale = locale
  }

  @ReactProp(name = "minDate")
  fun setMinDate(view: RNCalendarView, minDate: Int?) {
    minDate?.let {
      view.minDate = unixToCalendar(it)
    }
  }

  @ReactProp(name = "maxDate")
  fun setMaxDate(view: RNCalendarView, maxDate: Int?) {
    maxDate?.let {
      view.maxDate = unixToCalendar(it)
    }
  }

  override fun addEventEmitters(reactContext: ThemedReactContext?, view: RNCalendarView?) {
    val dispatcher = reactContext!!.getNativeModule(UIManagerModule::class.java).eventDispatcher

    view?.onDatesChange = { range ->
      val dates = mutableListOf<CalendarDay>()
      range.start?.let { dates.add(it) }
      range.end?.let { dates.add(it) }

      dispatcher.dispatchEvent(CalendarChangeEvent(view!!.id, dates.toTypedArray()))
    }
  }

  private fun unixToCalendar(unixTime: Int): Calendar {
    return Calendar.getInstance(TIMEZONE).apply {
      timeInMillis = unixTime * 1000L
    }
  }
}
