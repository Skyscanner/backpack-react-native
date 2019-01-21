package net.skyscanner.backpack.reactnative.calendar

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class CalendarPackage : ReactPackage {

  override fun createNativeModules(reactContext: ReactApplicationContext?): MutableList<NativeModule> {
    return mutableListOf()
  }

  override fun createViewManagers(reactContext: ReactApplicationContext?): MutableList<ViewManager<*, *>> {
    return mutableListOf(
      CalendarViewManager() as ViewManager<*, *>
    )
  }

}
