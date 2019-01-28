/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
