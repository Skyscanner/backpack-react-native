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

package net.skyscanner.backpack.reactnative.button

import com.facebook.react.bridge.JSApplicationIllegalArgumentException
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.BaseViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import net.skyscanner.backpack.button.BpkButton

class BpkButtonViewManager : BaseViewManager<RNBpkButton, BpkButtonShadowNode>() {
  companion object {
    const val VIEW_NAME = "AndroidBPKButtonView"
  }

  override fun getName() = VIEW_NAME

  public override fun createViewInstance(reactContext: ThemedReactContext): RNBpkButton {
    return RNBpkButton(reactContext)
  }

  override fun createShadowNodeInstance(): BpkButtonShadowNode {
    return BpkButtonShadowNode()
  }

  override fun getShadowNodeClass(): Class<BpkButtonShadowNode> {
    return BpkButtonShadowNode::class.java
  }

  override fun updateExtraData(root: RNBpkButton, extraData: Any?) {}

  @ReactProp(name = "title")
  fun setTitle(view: RNBpkButton, title: String) {
    view.state.title = title
  }

  @ReactProp(name = "type")
  fun setType(view: RNBpkButton, type: String) {
    view.state.type = when (type) {
      "primary" -> BpkButton.Type.Primary
      "secondary" -> BpkButton.Type.Secondary
      "destructive" -> BpkButton.Type.Destructive
      "featured" -> BpkButton.Type.Featured
      "primaryOnDark" -> BpkButton.Type.PrimaryOnDark
      "primaryOnLight" -> BpkButton.Type.PrimaryOnLight
      else -> throw JSApplicationIllegalArgumentException("Button type $type is not supported")
    }
  }

  @ReactProp(name = "large")
  fun isLarge(view: RNBpkButton, large: Boolean) {
    view.state.size = if (large) BpkButton.Size.Large else BpkButton.Size.Standard
  }

  @ReactProp(name = "icon")
  fun setIcon(view: RNBpkButton, icon: String?) {
    view.state.icon = icon
  }

  @ReactProp(name = "iconAlignment")
  fun setIconAlignment(view: RNBpkButton, iconAlignment: String) {
    view.state.iconAlignment = iconAlignment
  }


  @ReactProp(name = "iconOnly")
  fun setIconOnly(view: RNBpkButton, iconOnly: Boolean) {
    view.state.iconOnly = iconOnly
  }

  override fun getExportedCustomBubblingEventTypeConstants(): MutableMap<String, Any> {
    return MapBuilder.builder<String, Any>().put(
      "buttonClick",
      MapBuilder.of(
        "phasedRegistrationNames",
        MapBuilder.of("bubbled", "onPress")
      )
    ).build()
  }

  override fun onAfterUpdateTransaction(view: RNBpkButton) {
    super.onAfterUpdateTransaction(view)
    view.state.dispatchUpdateTransactionFinished()
  }
}
