/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
import android.util.Log
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.annotation.VisibleForTesting
import androidx.appcompat.content.res.AppCompatResources
import net.skyscanner.backpack.button.BpkButton
import net.skyscanner.backpack.reactnative.BpkViewStateHolder
import com.facebook.react.bridge.ReactContext
import com.facebook.react.views.view.ReactViewGroup
import net.skyscanner.backpack.reactnative.R

typealias ActionCallback = () -> Unit

typealias Action = Pair<String, BpkButton.Type>

class RNBpkButton(
  private val reactContext: ReactContext,
  val state: StateHolder = StateHolder()
) : FrameLayout(reactContext) {

  @VisibleForTesting
  internal var button: BpkButton? = null

  init {
//    addView(button)
    state.onAfterUpdateTransaction(::render)
  }

  fun render() {
    button = if(button == null || state.isInvalid()) {
      val view = BpkButton(reactContext, state.type, BpkButton.Size.Standard).apply {
        icon = state.icon//AppCompatResources.getDrawable(context, R.drawable.bpk_weather)
        iconPosition = 1
        text = state.title
        loading = false
      }
      addView(view, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
      view
    } else {
      button!!
    }
    Log.d("Render: ", "View: ${button}")
  }

  companion object {
    class StateHolder : BpkViewStateHolder() {
      var title: String? by markDirtyOnUpdate(null)
      var type: BpkButton.Type by markDirtyOnUpdate(BpkButton.Type.Primary)
      var large: Boolean by markDirtyOnUpdate(false)
      var icon: Drawable? by markDirtyOnUpdate(null)
      var iconAlignment: String? by markDirtyOnUpdate(null)
      var onPress: ActionCallback? by markInvalidOnUpdate(null)
    }
  }
}
