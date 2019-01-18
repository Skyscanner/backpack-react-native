package net.skyscanner.backpack.reactnative.calendar

import net.skyscanner.backpack.reactnative.calendar.calendar.model.CalendarRange
import net.skyscanner.backpack.reactnative.calendar.calendar.presenter.BpkCalendarController
import java.util.*

typealias ChangeCallback = (CalendarRange) -> Unit

class BridgedCalendarController(
  override val isRtl: Boolean,
  override val locale: Locale,
  var onDataChange: ChangeCallback? = null
): BpkCalendarController() {

  override fun onRangeSelected(range: CalendarRange) {
    onDataChange?.invoke(range)
  }
}
