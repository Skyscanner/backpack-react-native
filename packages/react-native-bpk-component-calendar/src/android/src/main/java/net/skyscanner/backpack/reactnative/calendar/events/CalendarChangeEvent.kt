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
      .map { it.date.time }

    val datesArray = Arguments.createArray()
    parsedDates.forEach {
      datesArray.pushDouble(it.toDouble())
    }

    eventData.putArray("selectedDates", datesArray)
    return eventData
  }
}
