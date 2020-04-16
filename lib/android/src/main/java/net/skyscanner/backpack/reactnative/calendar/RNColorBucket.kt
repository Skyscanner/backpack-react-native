package net.skyscanner.backpack.reactnative.calendar

import androidx.annotation.ColorInt
import net.skyscanner.backpack.calendar.model.CalendarCellStyle
import net.skyscanner.backpack.calendar.model.ColoredBucket
import org.threeten.bp.LocalDate

internal data class RNColorBucket(
  @ColorInt val color: Int,
  val days: DateMatcher,
  val textStyle: String?,
  val cellStyle: String?
) {

  fun asColorBucket(startDate: LocalDate, endDate: LocalDate): ColoredBucket {
    if (this.cellStyle !== null) {
      return ColoredBucket(
        TypeConversions.stringToCellStyle(this.cellStyle), days.toSet(startDate, endDate))
    }

    val textStyle = this.textStyle?.let {
      if (it == "dark") {
        CalendarCellStyle.TextStyle.Dark
      } else {
        CalendarCellStyle.TextStyle.Light
      }
    }

    return ColoredBucket(
      CalendarCellStyle.Custom(this.color, textStyle), days.toSet(startDate, endDate))
  }
}
