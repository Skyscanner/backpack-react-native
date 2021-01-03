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

package net.skyscanner.backpack.reactnative.snackbar

import android.R.id
import android.util.Log
import android.view.View
import android.view.ViewGroup
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.JSApplicationIllegalArgumentException
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.views.modal.ReactModalHostView
import net.skyscanner.backpack.reactnative.extensions.getDrawableId
import net.skyscanner.backpack.reactnative.extensions.getOptional
import net.skyscanner.backpack.reactnative.extensions.getRequired
import net.skyscanner.backpack.snackbar.BpkSnackbar

class BpkSnackbarModule(
  val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

  companion object {
    const val NAME = "AndroidBpkSnackbar"
  }

  private val activeSnackbars: ArrayList<BpkSnackbar> = arrayListOf()

  override fun getName() = NAME

  override fun getConstants(): Map<String, Any>? {
    val constants: MutableMap<String, Any> = HashMap()
    constants["LENGTH_LONG"] = BpkSnackbar.LENGTH_LONG
    constants["LENGTH_SHORT"] = BpkSnackbar.LENGTH_SHORT
    constants["LENGTH_INDEFINITE"] = BpkSnackbar.LENGTH_INDEFINITE
    return constants
  }

  @ReactMethod
  fun show(options: ReadableMap, callback: Callback) {
    val view = currentActivity?.window?.decorView?.findViewById<View>(id.content) as ViewGroup?
    if (view == null) {
      Log.e(NAME, "Could not find a suitable view to render the snackbar")
      return
    }

    activeSnackbars.clear()

    if (view.hasWindowFocus()) {
      displaySnackbar(view, options, callback)
      return
    }

    val modals = getAllModalRootViews(view, ArrayList())
    for (modal in modals) {
      displaySnackbar(modal, options, callback)
    }
  }

  @ReactMethod
  fun dismiss() {
    for (snackbar in activeSnackbars) {
      snackbar.dismiss()
    }
    activeSnackbars.clear()
  }

  private fun displaySnackbar(
    view: View,
    options: ReadableMap,
    callback: Callback
  ) {
    val text = options.getRequired("text", ReadableMap::getString)
    val duration = options.getRequired("duration", ReadableMap::getInt)
    val title = options.getOptional("title", ReadableMap::getString)
    val icon = options.getOptional("icon") { map, key -> map.getDrawableId(reactContext, key) }
    val action = options.getOptional("action", ReadableMap::getMap)

    val snackbar = BpkSnackbar.make(view, text, duration)
    title?.let { snackbar.setTitle(it) }
    icon?.let { snackbar.setIcon(icon) }

    if (action != null) {
      val actionText = action.getOptional("text", ReadableMap::getString)
      val actionIcon = action.getOptional("icon") { map, key -> map.getDrawableId(reactContext, key) }

      val onClick = SafeClickListener(callback)

      actionText?.let { snackbar.setAction(it, onClick) }
        ?: actionIcon?.let { snackbar.setAction(it, onClick) }
        ?: throw JSApplicationIllegalArgumentException("Snackbar action should have a text or an icon")
    }

    activeSnackbars.add(snackbar)
    snackbar.show()
  }

  private fun getAllModalRootViews(
    view: ViewGroup,
    modals: ArrayList<View>
  ): ArrayList<View> {
    if (view is ReactModalHostView) {
      modals.add(view.getChildAt(0))
    }
    for (i in view.childCount - 1 downTo 0) {
      val child = view.getChildAt(i)
      if (child is ViewGroup) {
        getAllModalRootViews(child, modals)
      }
    }
    return modals
  }

  /**
   * Click listener that prevent double-taps which can lead to a crash.
   */
  private class SafeClickListener(val callback: Callback) : View.OnClickListener {
    var callbackWasCalled = false
    override fun onClick(v: View?) {
      if (!callbackWasCalled) {
        callbackWasCalled = true
        callback.invoke()
      }
    }
  }
}
