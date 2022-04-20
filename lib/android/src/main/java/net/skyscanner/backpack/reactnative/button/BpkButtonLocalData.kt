/**
 * Backpack for Android - Skyscanner's Design System
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

package net.skyscanner.backpack.reactnative.button

import android.content.Context
import android.graphics.drawable.Drawable
import net.skyscanner.backpack.button.BpkButton

internal class BpkButtonLocalData(
  private val title: String?,
  private val type: BpkButton.Type,
  private val size: BpkButton.Size,
  private val icon: Drawable?,
  private val iconPosition: Int,
  private val enabled: Boolean
) {
  fun asBpkButton(context: Context) = BpkButton(context, type, size).also {
    it.text = title
    it.icon = icon
    it.iconPosition = iconPosition
    it.isEnabled = enabled
  }
}
