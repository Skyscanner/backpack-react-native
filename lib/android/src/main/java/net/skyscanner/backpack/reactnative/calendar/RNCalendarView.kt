/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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
import android.util.AttributeSet
import android.widget.FrameLayout
import java.util.*
import net.skyscanner.backpack.calendar.BpkCalendar
import net.skyscanner.backpack.calendar.model.*
import net.skyscanner.backpack.calendar.presenter.SelectionType
import net.skyscanner.backpack.calendar.view.OnYearChangedListener
import net.skyscanner.backpack.reactnative.BpkViewStateHolder
import org.threeten.bp.LocalDate

class RNCalendarView(
  context: Context,
  val state: StateHolder = StateHolder()
) : FrameLayout(context) {

  private var calendar = RNCompatBpkCalendar(context)
  private var controller: CalendarController? = null
  private var selection: CalendarSelection? = null

  init {
    layoutParams = LayoutParams(
            LayoutParams.MATCH_PARENT,
            LayoutParams.MATCH_PARENT)

    addView(calendar)
    state.onAfterUpdateTransaction(::render)
  }

  fun render() {
    state.locale ?: throw IllegalStateException("[RNCalendarView] Locale has not been initialized")

    selection = selectedDaysToSelection(state.selectedDates)

    if (state.isInvalid() || controller == null) {
      controller = createController()
      calendar.setController(controller!!)
      // we set it here to avoid firing the callback when `initiallySelected` dates are provided
      controller?.onDatesChange = state.onDatesChange
    } else {
      controller?.onDatesChange = state.onDatesChange
      controller?.selectionType = state.selectionType
      controller?.disabledDateMatcher = state.disabledDateMatcher
      controller?.calendarColoring = state.colorBuckets?.let {
        CalendarColoring(it.map { bucket -> bucket.toColorBucket() }.toSet())
      }

      if (state.shouldUpdateContent) {
        state.shouldUpdateContent = false
        controller?.updateContent()
      }
    }
  }

  private fun createController(): CalendarController {
    val currentController = CalendarController(context, Locale.forLanguageTag(state.locale!!))
    currentController.selectionType = state.selectionType
    state.minDate?.let { currentController.startDate = it }
    state.maxDate?.let { currentController.endDate = it }
    selection?.let { currentController.updateSelection(it) }
    state.disabledDateMatcher?.let { currentController.disabledDateMatcher = it }
    state.colorBuckets?.let { currentController.calendarColoring = CalendarColoring(
            it.map { bucket -> bucket.toColorBucket() }.toSet()) }

    return currentController
  }

  private fun selectedDaysToSelection(selectedDays: Array<LocalDate>): CalendarSelection {
    return when (selectedDays.size) {
      1, 2 -> if (state.selectionType == SelectionType.RANGE) {
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

  private val measureAndLayout = Runnable {
    measure(
            MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY))
    layout(left, top, right, bottom)
  }

  override fun requestLayout() {
    super.requestLayout()

    // The calendar relies on a measure + layout pass happening after ir calls requestLayout()
    // based on: https://github.com/facebook/react-native/blob/8d5ac8de766b9e435cbfa9bfa6b8a2b75b0e2a19/ReactAndroid/src/main/java/com/facebook/react/views/toolbar/ReactToolbar.java#L175
    this.post(measureAndLayout)
  }

  companion object {
    class StateHolder : BpkViewStateHolder() {
      internal var shouldUpdateContent = false
      var locale: String? = null
        set(value) {
          if (field != null && value == null) {
            throw IllegalArgumentException("[RNCalendarView] Can't set locale to null")
          }

          if (value != field) {
            field = value
            markInvalid()
          }
        }

      var minDate: LocalDate? by markInvalidOnUpdate(null)
      var maxDate: LocalDate? by markInvalidOnUpdate(null)

      var selectedDates: Array<LocalDate> by markDirtyOnUpdate(arrayOf())
      var selectionType: SelectionType by markDirtyOnUpdate(SelectionType.RANGE)
      var onDatesChange: ChangeCallback? by markDirtyOnUpdate(null)

      var disabledDateMatcher: DateMatcher? = null
        set(value) {
          if (value != field) {
            field = value
            shouldUpdateContent = true
            markDirty()
          }
        }

      internal var colorBuckets: Array<RNColorBucket>? = null
        set(value) {
          field = value
          shouldUpdateContent = true
          markDirty()
        }
    }
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

  private fun RNColorBucket.toColorBucket(): ColoredBucket {
    if (this.cellStyle !== null) {
      when (cellStyle) {
        "negative" -> ColoredBucket(CalendarCellStyle.Negative, this.days.toSet())
        "positive" -> ColoredBucket(CalendarCellStyle.Positive, this.days.toSet())
        "neutral" -> ColoredBucket(CalendarCellStyle.Neutral, this.days.toSet())
        else -> throw IllegalStateException("Invalid cellStyle: $cellStyle")
      }
    }

    val textStyle = this.textStyle?.let {
      if (it == "dark") {
        CalendarCellStyle.TextStyle.Dark
      } else {
        CalendarCellStyle.TextStyle.Light
      }
    }

    return ColoredBucket(CalendarCellStyle.Custom(this.color, textStyle), this.days.toSet())
  }

  private fun DateMatcher.toSet(): Set<LocalDate> {
    val plusOne = { it: LocalDate -> it.plusDays(1) }
    val minusOne = { it: LocalDate -> it.minusDays(1) }

    return when (this) {
      is RangeMatcher -> generateSequence(this.start, plusOne).takeWhile { it <= this.end }.toSet()
      is BeforeMatcher -> generateSequence(this.end, minusOne).takeWhile { it >= state.minDate }.toSet()
      is AfterMatcher -> generateSequence(this.start, plusOne).takeWhile { it <= state.maxDate }.toSet()
      is AnyMatcher -> this.dates.toSet()
      else -> emptySet()
    }
  }
}
