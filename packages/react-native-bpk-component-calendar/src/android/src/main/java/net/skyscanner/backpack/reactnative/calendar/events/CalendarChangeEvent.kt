/**
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
package net.skyscanner.backpack.reactnative.calendar.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event
import com.facebook.react.uimanager.events.RCTEventEmitter
import net.skyscanner.backpack.calendar.model.CalendarDay
import net.skyscanner.backpack.reactnative.calendar.CalendarViewManager
import java.util.*

class CalendarChangeEvent(
  id: Int,
  private val selectedDates: Array<CalendarDay>
): Event<CalendarChangeEvent>(id) {
  companion object {
    const val EVENT_NAME = "topChange"
  }

  override fun getEventName(): String {
    return EVENT_NAME
  }

  override fun dispatch(rctEventEmitter: RCTEventEmitter?) {
    rctEventEmitter?.receiveEvent(viewTag, eventName, serializeEventData())
  }

  private fun serializeEventData(): WritableMap {
    val eventData = Arguments.createMap()
    val parsedDates = selectedDates
      .map { it.date.time / 1000 }

    val datesArray = Arguments.createArray()
    parsedDates.forEach {
      datesArray.pushDouble(it.toDouble())
    }

    eventData.putArray("selectedDates", datesArray)
    return eventData
  }
}
