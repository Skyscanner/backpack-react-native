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

package net.skyscanner.backpack.reactnative.flare

import android.view.View
import androidx.annotation.VisibleForTesting
import com.facebook.react.bridge.JSApplicationIllegalArgumentException
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import net.skyscanner.backpack.flare.BpkFlare

class BpkFlareViewManager : ViewGroupManager<RNBpkFlare>() {
  companion object {
    const val VIEW_NAME = "AndroidBPKFlareView"
  }

  @VisibleForTesting
  public override fun createViewInstance(reactContext: ThemedReactContext): RNBpkFlare {
    return RNBpkFlare(reactContext)
  }

  @ReactProp(name = "pointerDirection")
  fun setPointerDirection(view: RNBpkFlare, pointerDirection: String) {
    view.state.pointerDirection = when (pointerDirection) {
      "down" -> BpkFlare.PointerDirection.DOWN
      "up" -> BpkFlare.PointerDirection.UP
      else -> throw JSApplicationIllegalArgumentException("$pointerDirection is not a valid pointerDirection")
    }
  }

  override fun onAfterUpdateTransaction(view: RNBpkFlare) {
    super.onAfterUpdateTransaction(view)
    view.state.dispatchUpdateTransactionFinished()
  }

  override fun getName(): String {
    return VIEW_NAME
  }

  override fun addView(parent: RNBpkFlare, child: View, index: Int) {
    parent.addViewInternal(child, index)
  }
}
