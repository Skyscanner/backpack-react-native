package net.skyscanner.backpack.reactnative.calendar

import android.widget.FrameLayout
import net.skyscanner.backpack.spinner.BpkSpinner
import net.skyscanner.backpack.text.BpkText

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.CallbackImpl
import com.facebook.react.uimanager.*
import com.facebook.react.uimanager.annotations.ReactProp
import net.skyscanner.backpack.reactnative.calendar.calendar.BpkCalendar
import net.skyscanner.backpack.reactnative.calendar.calendar.model.CalendarDay
import net.skyscanner.backpack.reactnative.calendar.events.CalendarChangeEvent
import java.util.*


class CalendarViewManager : SimpleViewManager<BpkCalendar>() {
//  override fun updateExtraData(root: BpkText?, extraData: Any?) {
//    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
//  }
//
//  override fun getShadowNodeClass(): Class<out ReactShadowNode<*>> {
//    return ReactShadowNode()
//  }

  // TODO: rtl and locale needs to come from js/react native somehow
  private val controller = BridgedCalendarController(false, Locale.UK)
  private var viewInstance: BpkCalendar? = null

  override fun getName(): String {
    return "RCTCalendarView"
  }

  override fun createViewInstance(reactContext: ThemedReactContext): BpkCalendar {
////    val foo: Boolean? = null
////    foo!!
//    return BpkSpinner(reactContext).apply {
//      layoutParams = FrameLayout.LayoutParams(300, 300)
//    }
    return BpkCalendar(reactContext).apply {
      setController(controller)
      viewInstance = this
    }
  }
//
//  @ReactProp(name = "onDateChange")
//  fun setOnDateChange(view: BpkCalendar, callback: CallbackImpl) {
//    controller.onDataChange = callback
//    view.setController(controller)
//  }

  @ReactProp(name = "selectedDates")
  fun setSelectedDates(view: BpkCalendar, dates: ReadableArray) {
    // TODO: if dates.size() > 2 throw warning
    // TODO: The calendar does not programmatically setting the dates
    view.setController(controller)
  }

  override fun addEventEmitters(reactContext: ThemedReactContext?, view: BpkCalendar?) {
    val dispatcher = reactContext!!.getNativeModule(UIManagerModule::class.java).eventDispatcher

    controller.onDataChange = { range ->
      val dates = mutableListOf<CalendarDay>()
      range.start?.let { dates.add(it) }
      range.end?.let { dates.add(it) }

      dispatcher.dispatchEvent(CalendarChangeEvent(view!!.id, dates.toTypedArray()))
    }
  }
}
