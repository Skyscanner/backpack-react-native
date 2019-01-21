package net.skyscanner.backpack.reactnative.calendar

import android.content.Context
import android.view.View
import net.skyscanner.backpack.calendar.model.CalendarRange
import net.skyscanner.backpack.calendar.presenter.BpkCalendarController
import java.util.*

typealias ChangeCallback = (CalendarRange) -> Unit

class CalendarController(
  private val applicationContext: Context,
  override var locale: Locale
): BpkCalendarController() {

  override var endDate: Calendar = super.endDate
  override var startDate: Calendar = super.startDate

  var onDatesChange: ChangeCallback? = null

  override val isRtl: Boolean
    get() {
      // Based on skyscanner-app/android/src/libraries/legacy/src/main/java/net/skyscanner/go/core/localization/RtlManagerImpl.java
      val config = applicationContext.resources.configuration
      return config.layoutDirection == View.LAYOUT_DIRECTION_RTL
    }

  override fun onRangeSelected(range: CalendarRange) {
    onDatesChange?.invoke(range)
  }
}
