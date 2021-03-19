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

import com.facebook.react.bridge.Dynamic
import com.facebook.react.bridge.JSApplicationIllegalArgumentException
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.BaseViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import java.util.*
import net.skyscanner.backpack.rating.BpkRating

class BpkRatingViewManager : BaseViewManager<RNBpkRating, BpkRatingShadowNode>() {

  companion object {
    const val VIEW_NAME = "AndroidBPKRatingView"
  }

  override fun getName() = VIEW_NAME

  public override fun createViewInstance(reactContext: ThemedReactContext): RNBpkRating {
    return RNBpkRating(reactContext)
  }

  override fun createShadowNodeInstance(): BpkRatingShadowNode {
    return BpkRatingShadowNode()
  }

  override fun getShadowNodeClass(): Class<BpkRatingShadowNode> {
    return BpkRatingShadowNode::class.java
  }

  override fun updateExtraData(root: RNBpkRating, extraData: Any) {}

  @ReactProp(name = "title")
  fun setTitle(view: RNBpkRating, titles: ReadableArray) {
    view.state.title = { score ->
      pickValueForScore(score, titles, "title").asString()
    }
  }

  @ReactProp(name = "subtitle")
  fun setSubtitle(view: RNBpkRating, subtitles: ReadableArray) {
    view.state.subtitle = { score ->
      pickValueForScore(score, subtitles, "subtitle").asString()
    }
  }

  @ReactProp(name = "value")
  fun setValue(view: RNBpkRating, value: Float) {
    view.state.value = value
  }

  @ReactProp(name = "size")
  fun setSize(view: RNBpkRating, size: String) {
    view.state.size = size.asRatingSize()
  }

  @ReactProp(name = "orientation")
  fun setOrientation(view: RNBpkRating, orientation: String) {
    view.state.orientation = orientation.asRatingStyle()
  }

  @ReactProp(name = "icon")
  fun setIcon(view: RNBpkRating, icons: ReadableArray) {
    view.state.icon = { score ->
      val context = view.context
      val iconName = pickValueForScore(score, icons, "icon").asString()
      val iconId = context.resources.getIdentifier(iconName, "drawable", view.context.packageName)
      context.getDrawable(iconId) ?: throw JSApplicationIllegalArgumentException("Icon $iconName not found")
    }
  }

  override fun onAfterUpdateTransaction(view: RNBpkRating) {
    super.onAfterUpdateTransaction(view)
    view.state.dispatchUpdateTransactionFinished()
  }

  private fun pickValueForScore(score: BpkRating.Score, values: ReadableArray, propName: String): Dynamic {
    val value = when (values.size()) {
      0 -> throw JSApplicationIllegalArgumentException("$propName property should not be an empty array")
      3 -> values.getDynamic(score.index)
      else -> values.getDynamic(0)
    }

    if (value.isNull) {
      throw JSApplicationIllegalArgumentException("$propName property should not be null")
    }

    return value
  }

  private fun String.asRatingSize(): BpkRating.Size {
    return when (this.toLowerCase(Locale.ROOT)) {
      "icon" -> BpkRating.Size.Icon
      "xs" -> BpkRating.Size.ExtraSmall
      "sm" -> BpkRating.Size.Small
      "base" -> BpkRating.Size.Base
      "lg" -> BpkRating.Size.Large
      else -> throw JSApplicationIllegalArgumentException("$this is not a valid rating size")
    }
  }

  private fun String.asRatingStyle(): BpkRating.Style {
    return when (this.toLowerCase(Locale.ROOT)) {
      "pill" -> BpkRating.Style.Horizontal
      "horizontal" -> BpkRating.Style.Horizontal
      "vertical" -> BpkRating.Style.Vertical
      else -> throw JSApplicationIllegalArgumentException("$this is not a valid rating orientation")
    }
  }

  private val BpkRating.Score.index
    get() = when (this) {
      BpkRating.Score.Low -> 0
      BpkRating.Score.Medium -> 1
      BpkRating.Score.High -> 2
    }
}
