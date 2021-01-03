/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package net.skyscanner.backpack.reactnative.calendar

import com.facebook.react.bridge.JSApplicationIllegalArgumentException
import net.skyscanner.backpack.calendar.model.CalendarCellStyle
import org.threeten.bp.Instant
import org.threeten.bp.LocalDate

internal object TypeConversions {
  fun stringToCellStyle(cellStyleString: String): CalendarCellStyle {
    return when (cellStyleString) {
      "negative" -> CalendarCellStyle.Negative
      "positive" -> CalendarCellStyle.Positive
      "neutral" -> CalendarCellStyle.Neutral
      "highlight" -> CalendarCellStyle.Hightlight
      else -> throw JSApplicationIllegalArgumentException("Invalid cellStyle: $cellStyleString")
    }
  }

  fun unixTimestampToLocalDate(timestamp: Int): LocalDate {
    return Instant
      .ofEpochMilli(timestamp * 1000L)
      .atZone(CalendarViewManager.ZONE_ID_UTC).toLocalDate()
  }
}
