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

package net.skyscanner.backpack.reactnative

import android.content.Context
import android.content.res.Resources
import android.util.Log
import com.facebook.react.views.text.ReactFontManager

/**
 * [BackpackReactNative] is the entry point of backpack-react-native for Android.
 */
class BackpackReactNative {
  companion object {
    private const val TAG = "BackpackReactNative"
    private val RELATIVE_MAPPINGS = mapOf(
      "skyscanner_relative_android" to "skyscanner_relative_android_book",
      "skyscanner_relative_android_bold" to "skyscanner_relative_android_bold",
      "skyscanner_relative_android_black" to "skyscanner_relative_android_black"
    )

    /**
     * Initializes backpack-react-native.
     *
     * This should be called before the javascript code is loaded, e.g. in the Application's "onCreate"
     * method.
     */
    @JvmStatic
    fun init(context: Context) {
      setupRelative(context)
    }

    private fun setupRelative(context: Context) {
      val resources: Resources = context.resources
      try {
        val fontManger = ReactFontManager.getInstance()

        RELATIVE_MAPPINGS.entries.forEach { entry ->
          val rnName = entry.key
          val resourceName = entry.value
          val resourceId = resources.getIdentifier(resourceName, "font", context.packageName)
          fontManger.addCustomFont(context, rnName, resourceId)
        }

        Log.i(TAG, "Relative font configured successfully")
      } catch (e: Throwable) {
        val msg = "Unable to load relative font for Android. To use relative ensure you are using the internal version of backpack-android (backpack-android:X.X.X-internal)"
        Log.w(TAG, msg, e)
      }
    }
  }
}
