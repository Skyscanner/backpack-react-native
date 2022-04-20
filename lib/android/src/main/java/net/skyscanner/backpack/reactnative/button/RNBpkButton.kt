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

import android.widget.FrameLayout
import androidx.appcompat.content.res.AppCompatResources
import com.facebook.react.R
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.JSApplicationIllegalArgumentException
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.uimanager.events.RCTEventEmitter
import net.skyscanner.backpack.button.BpkButton
import net.skyscanner.backpack.reactnative.BpkViewStateHolder

class RNBpkButton(
  private val reactContext: ReactContext,
  val state: StateHolder = StateHolder()
) : BpkButton(reactContext) {

  init {
    layoutParams = FrameLayout.LayoutParams(
      FrameLayout.LayoutParams.WRAP_CONTENT,
      FrameLayout.LayoutParams.WRAP_CONTENT
    )
    state.onAfterUpdateTransaction(::render)
    setOnClickListener {
      val event: WritableMap = Arguments.createMap()
      reactContext
        .getJSModule(RCTEventEmitter::class.java)
        .receiveEvent(id, "buttonClick", event)
    }
  }

  fun render() {
    type = state.type
    icon = if (state.icon == null) {
      null
    } else {
      val bpkIcon = state.icon!!.replace('-', '_').let { "bpk_$it" }
      val suffix = if (state.size == Size.Standard) {
        "_sm"
      } else {
        ""
      }
      val iconId =
        context.resources.getIdentifier("$bpkIcon$suffix", "drawable", context.packageName)
      iconId.takeUnless { it == 0 }?.let {
        AppCompatResources.getDrawable(context, iconId)
      }
    }
    text = state.title
    if (getTag(R.id.accessibility_label) == null) {
      contentDescription = text
    }
    size = state.size
    iconPosition = if (state.iconOnly) {
      ICON_ONLY
    } else {
      when (state.iconAlignment) {
        "leading" -> START
        "trailing", null -> END
        else -> throw JSApplicationIllegalArgumentException("Button iconAlignment $state.iconAlignment is not supported")
      }
    }
    loading = state.loading
    isEnabled = state.enabled
    val uiManager = reactContext.getNativeModule(UIManagerModule::class.java)
    val localData = BpkButtonLocalData(
      state.title,
      state.type,
      state.size,
      icon,
      iconPosition,
      state.enabled,
      state.loading
    )
    // This will trigger measure to run in BpkButtonShadowNode
    uiManager?.setViewLocalData(id, localData)
  }

  companion object {
    class StateHolder : BpkViewStateHolder() {
      var title: String? by markDirtyOnUpdate(null)
      var type: Type by markDirtyOnUpdate(Type.Primary)
      var size: Size by markDirtyOnUpdate(Size.Standard)
      var icon: String? by markDirtyOnUpdate(null)
      var iconAlignment: String? by markDirtyOnUpdate(null)
      var iconOnly: Boolean by markDirtyOnUpdate(false)
      var enabled: Boolean by markDirtyOnUpdate(true)
      var loading: Boolean by markDirtyOnUpdate(false)
    }
  }
}
