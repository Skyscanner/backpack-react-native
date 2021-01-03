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

import android.content.Context
import com.facebook.react.bridge.JSApplicationIllegalArgumentException
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import java.util.Locale
import net.skyscanner.backpack.calendar.presenter.HighlightedDaysAdapter
import net.skyscanner.backpack.calendar.presenter.MonthFooterAdapter
import net.skyscanner.backpack.reactnative.extensions.getOptional
import net.skyscanner.backpack.reactnative.extensions.getRequired

interface RNFooterView {
  companion object {
    fun fromJS(context: Context, viewDef: ReadableMap): RNFooterView {
      return when (val type = viewDef.getRequired("__type", ReadableMap::getString)) {
        "highlightedDays" -> RNHighlightedDaysFooterView.fromJS(context, viewDef)
        else -> throw JSApplicationIllegalArgumentException("Unsupported footer view type: $type")
      }
    }
  }

  fun asFooterAdapter(locale: Locale): MonthFooterAdapter
}

internal data class RNHighlightedDaysFooterView(
  val context: Context,
  val days: Set<HighlightedDaysAdapter.HighlightedDay>
) : RNFooterView {
  override fun asFooterAdapter(locale: Locale): MonthFooterAdapter {
    return HighlightedDaysAdapter(
      context,
      locale,
      days
    )
  }

  companion object {
    fun fromJS(context: Context, viewDef: ReadableMap): RNHighlightedDaysFooterView {
      val days = viewDef.getRequired("days", ReadableMap::getArray)
      return RNHighlightedDaysFooterView(
        context,
        (0 until days.size()).map {
        val day = days.getRequired("days", it, ReadableArray::getMap)
        val date = day.getRequired("date", ReadableMap::getInt).let(TypeConversions::unixTimestampToLocalDate)
        val description = day.getRequired("description", ReadableMap::getString)
        val color = day.getOptional("color", ReadableMap::getInt)
        val cellStyle = day.getOptional("cellStyle") { map, key ->
          map.getString(key)?.let(TypeConversions::stringToCellStyle)
        }
        val descriptionOnly = day.getOptional("descriptionOnly", ReadableMap::getBoolean)

        HighlightedDaysAdapter.HighlightedDay(
          date = date,
          description = description,
          color = cellStyle?.color(context) ?: color,
          descriptionOnly = descriptionOnly ?: false
        )
      }.toSet())
    }
  }
}
