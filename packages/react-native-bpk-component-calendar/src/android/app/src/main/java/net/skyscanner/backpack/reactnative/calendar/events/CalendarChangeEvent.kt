package net.skyscanner.backpack.reactnative.calendar.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray
import com.facebook.react.uimanager.events.Event
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.facebook.react.bridge.WritableMap
import net.skyscanner.backpack.reactnative.calendar.calendar.model.CalendarDay
import java.util.*

class CalendarChangeEvent(
  val id:Int,
  val selectedDates: Array<CalendarDay>
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
      .map {
        // TODO: Make it easier to access year/day/month from the calendar day
        val date = Calendar.getInstance().apply {
          timeInMillis = it.date.time
        }

        val year = date.get(Calendar.YEAR)
        val month = date.get(Calendar.MONTH) + 1
        val day = date.get(Calendar.DAY_OF_MONTH)

        "$year-${String.format("%02d", month)}-${String.format("%02d", day)}T00:00:00"
      }

    val datesArray = Arguments.createArray()
    parsedDates.forEach {
      datesArray.pushString(it)
    }

    eventData.putArray("dates", datesArray)
    return eventData
  }
}
