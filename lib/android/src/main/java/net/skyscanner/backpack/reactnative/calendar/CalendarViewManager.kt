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

import androidx.annotation.VisibleForTesting
import com.facebook.react.bridge.JSApplicationIllegalArgumentException
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
import net.skyscanner.backpack.reactnative.extensions.getOptional
import org.threeten.bp.LocalDate
import org.threeten.bp.ZoneId

class CalendarViewManager : ViewGroupManager<RNCalendarView>() {

  companion object {
    const val VIEW_NAME = "AndroidBPKCalendarView"
    internal val ZONE_ID_UTC = ZoneId.of("UTC")
  }

  // This means we are not relying on RN's css to layout children and doing it ourselves.
  // see RNCalendarView.requestLayout
  override fun needsCustomLayoutForChildren() = true

  override fun getName() = VIEW_NAME

  @VisibleForTesting
  public override fun createViewInstance(reactContext: ThemedReactContext): RNCalendarView {
    return RNCalendarView(reactContext)
  }

  @ReactProp(name = "selectedDates")
  fun setSelectedDates(view: RNCalendarView, dates: ReadableArray) {
    view.state.selectedDates = (0..(dates.size() - 1)).map {
      TypeConversions.unixTimestampToLocalDate(dates.getInt(it))
    }.toTypedArray()
  }

  @ReactProp(name = "selectionType")
  fun setSelectionType(view: RNCalendarView, selectionType: String) {
    view.state.selectionType = when (selectionType) {
      "range" -> SelectionType.RANGE
      "single" -> SelectionType.SINGLE
      "multiple" -> SelectionType.RANGE // TODO: support multiple selection
      else -> throw JSApplicationIllegalArgumentException("Selection type $selectionType is not supported")
    }
  }

  @ReactProp(name = "locale")
  fun setLocale(view: RNCalendarView, locale: String) {
    view.state.locale = locale
  }

  @ReactProp(name = "minDate")
  fun setMinDate(view: RNCalendarView, minDate: Int?) {
    minDate?.let {
      view.state.minDate = TypeConversions.unixTimestampToLocalDate(it)
    }
  }

  @ReactProp(name = "maxDate")
  fun setMaxDate(view: RNCalendarView, maxDate: Int?) {
    maxDate?.let {
      view.state.maxDate = TypeConversions.unixTimestampToLocalDate(it)
    }
  }

  @ReactProp(name = "disabledDates")
  fun setDisabledDates(view: RNCalendarView, disableDates: ReadableMap?) {
    if (disableDates != null) {
      view.state.disabledDateMatcher = disableDates.toDateMatcher()
    } else {
      view.state.disabledDateMatcher = null
    }
  }

  @ReactProp(name = "colorBuckets")
  fun setColorBuckets(view: RNCalendarView, colourBuckets: ReadableArray?) {
    if (colourBuckets != null) {
      val parsedBuckets = (0 until colourBuckets.size()).map {
        val bucket = colourBuckets.getMap(it)
                ?: throw JSApplicationIllegalArgumentException("Invalid colour bucket provided to BpkCalendar")

        val textStyle = bucket.getOptional("textStyle", ReadableMap::getString)

        val color = bucket.getInt("color")
        val days = bucket.getMap("days")
                ?: throw JSApplicationIllegalArgumentException("Invalid colour bucket provided to BpkCalendar. `days` is null")

        val cellStyle = bucket.getOptional("__cellStyle", ReadableMap::getString)

        RNColorBucket(
          color = color,
          days = days.toDateMatcher(),
          textStyle = textStyle,
          cellStyle = cellStyle
        )
      }.toTypedArray()

      view.state.colorBuckets = parsedBuckets
    } else {
      view.state.colorBuckets = null
    }
  }

  @ReactProp(name = "androidFooterView")
  fun setFooterView(view: RNCalendarView, footerView: ReadableMap?) {
    if (footerView == null) {
      view.state.footerView = null
    } else {
      view.state.footerView = RNFooterView.fromJS(view.context, footerView)
    }
  }

  @VisibleForTesting
  public override fun addEventEmitters(reactContext: ThemedReactContext, view: RNCalendarView) {
    val dispatcher = reactContext.getNativeModule(UIManagerModule::class.java).eventDispatcher

    view.state.onDatesChange = { selection ->
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
    view.state.dispatchUpdateTransactionFinished()
  }
}

private fun ReadableMap.toDateMatcher(): DateMatcher {
  val type = this.getString("type")
  val dates = this.getArray("dates")
  if (type === null || dates === null || dates.size() == 0) {
    throw JSApplicationIllegalArgumentException("Invalid disabledDates prop, either type` or `dates` is invalid")
  }

  val parsedDates = (0 until dates.size()).map {
    TypeConversions.unixTimestampToLocalDate(dates.getInt(it))
  }.toTypedArray()

  return DateMatcher.fromJs(type, parsedDates)
}
