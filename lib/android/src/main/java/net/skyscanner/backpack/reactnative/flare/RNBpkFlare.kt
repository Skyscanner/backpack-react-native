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

import android.content.Context
import android.view.View
import android.view.ViewGroup
import androidx.annotation.VisibleForTesting
import com.facebook.react.bridge.ReactContext
import com.facebook.react.views.view.ReactViewGroup
import net.skyscanner.backpack.flare.BpkFlare
import net.skyscanner.backpack.reactnative.BpkViewStateHolder

class RNBpkFlare(
  val reactContext: ReactContext,
  val state: StateHolder = StateHolder()
) : BpkFlare(reactContext) {

  @VisibleForTesting
  internal val internalView = ReactChildrenViewWrapper(reactContext)

  init {
    addView(internalView,
      ViewGroup.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT,
        ViewGroup.LayoutParams.MATCH_PARENT))

    state.onAfterUpdateTransaction(::render)
  }

  private fun render() {
    this.pointerDirection = state.pointerDirection
  }

  fun addViewInternal(child: View, index: Int) {
    internalView.addView(child, index)
  }

  companion object {
    class StateHolder : BpkViewStateHolder() {
      var pointerDirection: PointerDirection by markDirtyOnUpdate(PointerDirection.DOWN)
    }
  }

  /**
   * This view ensure BpkFlare has only one children, it will throw an exception otherwise.
   * To prevent this we only add this view to BpkFlare and add all react views inside this view.
   */
  internal inner class ReactChildrenViewWrapper(context: Context) : ReactViewGroup(context)
}
