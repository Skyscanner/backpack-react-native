package net.skyscanner.backpack.reactnative.calendar

import android.content.Context
import android.os.Handler
import android.widget.FrameLayout
import net.skyscanner.backpack.calendar.BpkCalendar
import net.skyscanner.backpack.calendar.model.CalendarDay
import net.skyscanner.backpack.calendar.model.CalendarRange
import kotlin.collections.contentEquals
import java.util.*

class RNCalendarView(
  context: Context
): FrameLayout(context) {

  private var controller: CalendarController? = null

  var locale: String? = null
    set(value) {
      if (field != null && value == null) {
        throw IllegalArgumentException("[RNCalendarView] Can't set locale to null")
      }

      if (value != field) {
        field = value
        scheduleReRender()
      }
    }

  var minDate: Calendar? = null
    set(value) {
      if (value != field) {
        field = value
        scheduleReRender()
      }
    }

  var maxDate: Calendar? = null
    set(value) {
      if (value != field) {
        field = value
        scheduleReRender()
      }
    }

  var selectedDates: Array<Calendar> = arrayOf()
    set(value) {
      if (!value.contentEquals(field)) {
        field = value
        val range = selectedDaysToRange(field)
        controller?.updateSelection(range)
        selectedRange = range
      }
    }

  private var selectedRange: CalendarRange? = null

  var onDatesChange: ChangeCallback? = null
    set(value) {
      field = value
      controller?.onDatesChange = value
    }

  init {
    layoutParams = FrameLayout.LayoutParams(
      FrameLayout.LayoutParams.MATCH_PARENT,
      FrameLayout.LayoutParams.MATCH_PARENT)
  }

  private fun render() {
    if (childCount > 0) {
      removeAllViews()
    }

    locale ?: throw IllegalStateException("[RNCalendarView] Locale has not been initialized")

    val currentController = CalendarController(context, Locale.forLanguageTag(locale!!))
    currentController.onDatesChange = onDatesChange
    minDate?.let { currentController.startDate = it }
    maxDate?.let { currentController.endDate = it }
    selectedRange?.let { currentController.updateSelection(it) }

    val calendar = BpkCalendar(context)
    calendar.setController(currentController)
    addView(calendar)

    controller = currentController
  }

  private fun scheduleReRender() {
    Handler().post{ render() }
  }

  private fun calendarToCalendarDay(date: Calendar): CalendarDay {
    return CalendarDay(
      date.get(Calendar.YEAR),
      date.get(Calendar.MONTH),
      date.get(Calendar.DAY_OF_MONTH))
  }

  private fun selectedDaysToRange(selectedDays: Array<Calendar>): CalendarRange {
    val range = CalendarRange()
    when (selectedDays.size) {
      1 -> range.start = calendarToCalendarDay(selectedDays[0])
      2 -> {
        range.start = calendarToCalendarDay(selectedDays[0])
        range.end = calendarToCalendarDay(selectedDays[1])
      }
      0 -> Unit
      // TODO: add support for different selection types
      else -> throw IllegalStateException("[RNCalendarView] No more than 2 selectedDates are supported")
    }

    return range
  }

}
