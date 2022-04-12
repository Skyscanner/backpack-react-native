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

import android.view.View
import androidx.annotation.VisibleForTesting
import android.content.res.Resources
import androidx.appcompat.content.res.AppCompatResources
import com.facebook.react.bridge.JSApplicationIllegalArgumentException
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import net.skyscanner.backpack.button.BpkButton
import net.skyscanner.backpack.reactnative.R
import java.util.*

class BpkButtonViewManager : ViewGroupManager<RNBpkButton>() {
  companion object {
    const val VIEW_NAME = "AndroidBPKButtonView"
  }

  override fun getName() = VIEW_NAME

  @VisibleForTesting
  public override fun createViewInstance(reactContext: ThemedReactContext): RNBpkButton {
    return RNBpkButton(reactContext)
  }

  @ReactProp(name = "title")
  fun setTitle(view: RNBpkButton, title: String) {
    view.state.title = title
  }

  @ReactProp(name = "type")
  fun setType(view: RNBpkButton, type: String) {
    view.state.type = when(type) {
      "primary" -> BpkButton.Type.Primary
      "secondary" -> BpkButton.Type.Secondary
      "destructive" -> BpkButton.Type.Destructive
      "featured" -> BpkButton.Type.Featured
      "primaryOnDark" -> BpkButton.Type.PrimaryOnDark
      "primaryOnLight" -> BpkButton.Type.PrimaryOnLight
      else -> throw JSApplicationIllegalArgumentException("Button type $type is not supported")
    }
  }

//  @ReactProp(name = "large")
//  fun isLarge(view: RNBpkButton, large: Boolean) {
//    view.state.large = large
//  }

  @ReactProp(name = "icon")
  fun setIcon(view: RNBpkButton, icon: String?) {
    val context = view.context
    val iconId = context.resources.getIdentifier(icon, "drawable", view.context.packageName)
    view.state.icon = AppCompatResources.getDrawable(context, R.drawable.bpk_weather)//context.getDrawable(iconId) ?: throw JSApplicationIllegalArgumentException("Icon $icon not found")
  }

  @ReactProp(name = "iconAlignment")
  fun setIconAlignment(view: RNBpkButton, iconAlignment: String) {
    view.state.iconAlignment = iconAlignment
  }

//  @ReactProp(name = "onPress")
//  fun setOnPress(reactContext: ThemedReactContext, view: RNBpkButton) {
//    val dispatcher = reactContext.getNativeModule(UIManagerModule::class.java)?.eventDispatcher
//
////    view.state.onPress = { () -> Unit }
//  }

//  public override fun addEventEmitters(reactContext: ThemedReactContext, view: RNDialog) {
//    val dispatcher = reactContext.getNativeModule(UIManagerModule::class.java)?.eventDispatcher
//
//    view.state.onPress = { type, pos ->
//      dispatcher?.dispatchEvent(ButtonActionEvent(view.id, type, pos))
//    }
//  }

  override fun onAfterUpdateTransaction(view: RNBpkButton) {
    super.onAfterUpdateTransaction(view)
    view.state.dispatchUpdateTransactionFinished()
  }
}
