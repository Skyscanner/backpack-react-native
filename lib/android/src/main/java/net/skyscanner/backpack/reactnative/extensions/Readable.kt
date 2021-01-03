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

package net.skyscanner.backpack.reactnative.extensions

import android.content.Context
import com.facebook.react.bridge.JSApplicationIllegalArgumentException
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap

internal fun <T> ReadableMap.getOptional(key: String, getter: (map: ReadableMap, key: String) -> T?): T? {
  if (!this.hasKey(key)) {
    return null
  }

  return getter.invoke(this, key)
}

internal fun <T> ReadableMap.getRequired(key: String, getter: (map: ReadableMap, key: String) -> T?): T {
  if (!this.hasKey(key)) {
    throw JSApplicationIllegalArgumentException("$key was not found and it's a required prop")
  }

  return getter.invoke(this, key)
    ?: throw JSApplicationIllegalArgumentException("$key is a required prop but its value was null")
}

internal fun ReadableMap.getDrawableId(context: Context, key: String): Int? {
  val resource = this.getString(key) ?: return null
  return context.resources.getIdentifier(resource, "drawable", context.packageName)
}

internal fun <T> ReadableArray.getRequired(key: String, idx: Int, getter: (array: ReadableArray, idx: Int) -> T?): T {
  return getter(this, idx)
    ?: throw JSApplicationIllegalArgumentException("item $idx is null in $key, and it's a required prop")
}
