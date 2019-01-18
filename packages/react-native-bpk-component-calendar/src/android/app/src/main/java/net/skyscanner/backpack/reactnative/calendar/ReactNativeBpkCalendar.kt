package net.skyscanner.backpack.reactnative.calendar

import android.content.Context
import android.util.AttributeSet
import net.skyscanner.backpack.calendar.BpkCalendar

class ReactNativeBpkCalendar @JvmOverloads constructor(
  context: Context,
  attrs: AttributeSet? = null,
  defStyle: Int = 0
) : BpkCalendar(context, attrs, defStyle) {

  override fun requestLayout() {
    super.requestLayout()

    this.post {
      layout(left, top, right, bottom)
      onLayout(false, left, top, right, bottom)
    }
  }
}
