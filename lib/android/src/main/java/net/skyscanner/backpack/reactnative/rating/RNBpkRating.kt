/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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
import net.skyscanner.backpack.rating.BpkRating
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.bridge.ReactContext

private const val STATE_CLEAN = 0
private const val STATE_DIRTY = 1
private const val STATE_INVALID_INSTANCE = 2

open class RNBpkRating(private val reactContext: ReactContext): FrameLayout(reactContext) {

  private var state = STATE_INVALID_INSTANCE
  private var rating: BpkRating? = null

  init {
    layoutParams = LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT)
  }

  var title: ((BpkRating.Score) -> String)? = null
    set(value) {
      field = value
      markDirty()
    }

  var subtitle: ((BpkRating.Score) -> String)? = null
    set(value) {
      field = value
      markDirty()
    }

  var value: Float = 0f
    set(value) {
      field = value
      markDirty()
    }

  var icon: ((BpkRating.Score) -> Drawable)? = null
    set(value) {
      field = value
      markDirty()
    }

  var size: BpkRating.Size = BpkRating.Size.Base
    set(value) {
      field = value
      markInvalid()
    }

  var orientation: BpkRating.Orientation = BpkRating.Orientation.Horizontal
    set(value) {
      field = value
      markInvalid()
    }

  fun render() {
    if (shouldUpdate()) {
      val view = getUpdatedView(orientation, size)
      val uiManager = reactContext.getNativeModule(UIManagerModule::class.java)
      val localData = BpkRatingLocalData(view, orientation, size)
      // This will trigger measure to run in BpkRatingShadowNode
      uiManager.setViewLocalData(id, localData)
      rating = view
      state = STATE_CLEAN
    }
  }

  private fun markDirty() {
    state = state or STATE_DIRTY
  }

  private fun markInvalid() {
    state = state or STATE_INVALID_INSTANCE
  }

  private fun isInvalid() = state and STATE_INVALID_INSTANCE == STATE_INVALID_INSTANCE

  private fun shouldUpdate() = state != STATE_CLEAN

  private fun getUpdatedView(orientation: BpkRating.Orientation, size: BpkRating.Size): BpkRating {
    val view = if (rating == null || isInvalid()) {
      // Orientation and Size can only be set in the constructor, so we need a new instance for that
      removeAllViews()
      val view = BpkRating(context, orientation, size)
      addView(view)
      view
    } else {
      rating!!
    }

    title?.let { view.title = it }
    subtitle?.let { view.subtitle = it }
    icon?.let { view.icon = it }
    view.value = value

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
}
