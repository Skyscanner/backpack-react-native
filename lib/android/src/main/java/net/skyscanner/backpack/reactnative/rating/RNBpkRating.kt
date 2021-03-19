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
package net.skyscanner.backpack.reactnative.rating

import android.graphics.drawable.Drawable
import android.view.ViewGroup
import android.widget.FrameLayout
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.UIManagerModule
import net.skyscanner.backpack.rating.BpkRating
import net.skyscanner.backpack.reactnative.BpkViewStateHolder

class RNBpkRating(
  private val reactContext: ReactContext,
  val state: StateHolder = StateHolder()
) : FrameLayout(reactContext) {

  private var rating: BpkRating? = null

  init {
    layoutParams = LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT)
    state.onAfterUpdateTransaction(::render)
  }

  fun render() {
    val view = getUpdatedView(state.orientation, state.size)
    val uiManager = reactContext.getNativeModule(UIManagerModule::class.java)
    val localData = BpkRatingLocalData(view, state.orientation, state.size)
    // This will trigger measure to run in BpkRatingShadowNode
    uiManager.setViewLocalData(id, localData)
    rating = view
  }

  private fun getUpdatedView(style: BpkRating.Style, size: BpkRating.Size): BpkRating {
    val view = if (rating == null || state.isInvalid()) {
      // Style and Size can only be set in the constructor, so we need a new instance for that
      removeAllViews()
      val view = BpkRating(context, style, size)
      addView(view)
      view
    } else {
      rating!!
    }

    state.title?.let { view.title = it }
    state.subtitle?.let { view.subtitle = it }
    state.icon?.let { view.icon = it }
    view.value = state.value

    requestLayout()

    return view
  }

  private fun addView(rating: BpkRating) {
    addView(rating, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
  }

  private val measureAndLayout = Runnable {
    measure(
            MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY))
    layout(left, top, right, bottom)
  }

  override fun requestLayout() {
    super.requestLayout()
    // Rating relies on a measure + layout pass happening after ir calls requestLayout()
    // based on: https://github.com/facebook/react-native/blob/8d5ac8de766b9e435cbfa9bfa6b8a2b75b0e2a19/ReactAndroid/src/main/java/com/facebook/react/views/toolbar/ReactToolbar.java#L175
    this.post(measureAndLayout)
  }

  companion object {
    class StateHolder : BpkViewStateHolder() {
      var title: ((BpkRating.Score) -> String)? by markDirtyOnUpdate(null)
      var subtitle: ((BpkRating.Score) -> String)? by markDirtyOnUpdate(null)
      var value: Float by markDirtyOnUpdate(0f)
      var icon: ((BpkRating.Score) -> Drawable)? by markDirtyOnUpdate(null)
      var size: BpkRating.Size by markInvalidOnUpdate(BpkRating.Size.Base)
      var orientation: BpkRating.Style by markInvalidOnUpdate(BpkRating.Style.Horizontal)
    }
  }
}
