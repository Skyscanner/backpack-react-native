package net.skyscanner.backpack.reactnative.calendar

import androidx.annotation.ColorInt

internal data class RNColorBucket(
  @ColorInt val color: Int,
  val days: DateMatcher,
  val textStyle: String?,
  val cellStyle: String?
)
