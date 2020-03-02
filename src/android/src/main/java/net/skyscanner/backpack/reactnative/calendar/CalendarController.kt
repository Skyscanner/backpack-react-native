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
import android.view.View
import net.skyscanner.backpack.calendar.model.CalendarColoring
import net.skyscanner.backpack.calendar.model.CalendarSelection
import net.skyscanner.backpack.calendar.model.ColoredBucket
import net.skyscanner.backpack.calendar.presenter.BpkCalendarController
import net.skyscanner.backpack.calendar.presenter.SelectionType
import org.threeten.bp.LocalDate
import java.util.*

typealias ChangeCallback = (CalendarSelection) -> Unit

class CalendarController(
  private val applicationContext: Context,
  override var locale: Locale,
  var disabledDateMatcher: DateMatcher? = null
): BpkCalendarController() {

  override var endDate: LocalDate = super.endDate
  override var startDate: LocalDate = super.startDate

  override var selectionType: SelectionType = SelectionType.RANGE

  override fun isDateDisabled(date: LocalDate): Boolean {
    return disabledDateMatcher?.match(date) ?: false
  }

  override var calendarColoring: CalendarColoring? = null

  var onDatesChange: ChangeCallback? = null

  override val isRtl: Boolean
    get() {
      // Based on skyscanner-app/android/src/libraries/legacy/src/main/java/net/skyscanner/go/core/localization/RtlManagerImpl.java
      val config = applicationContext.resources.configuration
      return config.layoutDirection == View.LAYOUT_DIRECTION_RTL
    }

  override fun onRangeSelected(range: CalendarSelection) {
    onDatesChange?.invoke(range)
  }
}
