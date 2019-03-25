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

import android.content.Context
import android.os.Handler
import android.util.AttributeSet
import android.view.Choreographer
import android.view.View
import android.widget.FrameLayout
import net.skyscanner.backpack.calendar.BpkCalendar
import net.skyscanner.backpack.calendar.model.CalendarDay
import net.skyscanner.backpack.calendar.model.CalendarRange
import net.skyscanner.backpack.calendar.model.CalendarSelection
import net.skyscanner.backpack.calendar.model.SingleDay
import net.skyscanner.backpack.calendar.presenter.SelectionType
import net.skyscanner.backpack.calendar.view.OnYearChangedListener
import kotlin.collections.contentEquals
import java.util.*

class RNCalendarView(
  context: Context
): FrameLayout(context) {

  private var calendar = RNCompatBpkCalendar(context)
  private var controller: CalendarController? = null
  private var selection: CalendarSelection? = null

  init {
    layoutParams = FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.MATCH_PARENT,
            FrameLayout.LayoutParams.MATCH_PARENT)

    addView(calendar)
  }

  var locale: String? = null
    set(value) {
      if (field != null && value == null) {
        throw IllegalArgumentException("[RNCalendarView] Can't set locale to null")
      }

      if (value != field) {
        field = value
        markStale()
      }
    }

  var minDate: CalendarDay? = null
    set(value) {
      if (value != field) {
        field = value
        markStale()
      }
    }

  var maxDate: CalendarDay? = null
    set(value) {
      if (value != field) {
        field = value
        markStale()
      }
    }

  var selectedDates: Array<CalendarDay> = arrayOf()

  var selectionType: SelectionType = SelectionType.RANGE

  var onDatesChange: ChangeCallback? = null

  fun render() {
    locale ?: throw IllegalStateException("[RNCalendarView] Locale has not been initialized")

    selection = selectedDaysToSelection(selectedDates)

    if (isStale()) {
      controller = createController()
      calendar.setController(controller!!)
      // we set it here to avoid firing the callback when `initiallySelected` dates are provided
      controller?.onDatesChange = onDatesChange
    } else {
      controller?.onDatesChange = onDatesChange
      controller?.selectionType = selectionType
    }
  }

  private fun createController(): CalendarController {
    val currentController = CalendarController(context, Locale.forLanguageTag(locale!!))
    currentController.selectionType = selectionType
    minDate?.let { currentController.startDate = it }
    maxDate?.let { currentController.endDate = it }
    selection?.let { currentController.updateSelection(it) }

    return currentController
  }

  private fun selectedDaysToSelection(selectedDays: Array<CalendarDay>): CalendarSelection {
    return when (selectedDays.size) {
      1, 2 -> if (selectionType == SelectionType.RANGE) {
        val end = if (selectedDays.size == 2) selectedDays[1] else null
        CalendarRange(selectedDays[0], end)
      } else {
        SingleDay(selectedDays[0])
      }
      // Empty range when no dates are selected because it resets to controller to no dates selected
      0 -> CalendarRange()
      // TODO: add support for multiple selections
      else -> throw IllegalStateException("[RNCalendarView] No more than 2 selectedDates are supported")
    }
  }

  private fun markStale() {
    controller = null
  }

  private fun isStale() = controller == null

  private val measureAndLayout = Runnable {
    measure(
            View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
            View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY))
    layout(left, top, right, bottom)
  }

  override fun requestLayout() {
    super.requestLayout()

    // The calendar relies on a measure + layout pass happening after ir calls requestLayout()
    // based on: https://github.com/facebook/react-native/blob/8d5ac8de766b9e435cbfa9bfa6b8a2b75b0e2a19/ReactAndroid/src/main/java/com/facebook/react/views/toolbar/ReactToolbar.java#L175
    this.post(measureAndLayout)
  }


  private inner class RNCompatBpkCalendar @JvmOverloads constructor(
          context: Context,
          attrs: AttributeSet? = null,
          defStyle: Int = 0
  ) : BpkCalendar(context, attrs, defStyle), OnYearChangedListener {

    override fun onYearChanged(year: Int) {
      super.onYearChanged(year)
      this@RNCalendarView.requestLayout()
    }
  }
}
