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
import com.facebook.react.bridge.JSApplicationIllegalArgumentException
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import net.skyscanner.backpack.button.BpkButton

class BpkButtonViewManager : ViewGroupManager<RNBpkButton>() {
  companion object {
    const val VIEW_NAME = "AndroidBPKButtonView"
  }

  @VisibleForTesting
  public override fun createViewInstance(reactContext: ThemedReactContext): RNBpkButton {
    return RNBpkButton(reactContext)
  }

  @ReactProp(name = "title")
  fun setTitle(view: RNBpkButton, title: String) {
    view.state.text = title
  }

  @ReactProp(name = "type")
  fun setTitle(view: RNBpkButton, type: String) {
    view.state.type = BpkButton.type.Primary
  }

  @ReactProp(name = "large")
  fun setTitle(view: RNBpkButton, large: Boolean) {
    if (large) {
      view.state.size = "Large"
    } else {
      view.state.size = "Standard"
    }
  }

  @ReactProp(name: "icon")
  fun setIcon(view: RNDialog, icon: ReadableMap?) {
    icon?.let {
      val resources: Resources = view.context.resources
      val iconId = resources.getIdentifier(icon.getString("iconId"), "drawable", view.context.packageName)
      view.state.icon = BpkButton.Icon(iconId, ContextCompat.getColor(view.context, "blue"))
    }
  }

  @ReactProp(name = "iconAlignment")
  fun setTitle(view: RNBpkButton, iconAlignment: Boolean) {
    if (large) {
      view.state.size = "Large"
    } else {
      view.state.size = "Standard"
    }
  }

  @ReactProp(name = "onPress")
  fun setActions(view: RNButton, onPress: ReadableArray?) {
    onPress?.let {
      view.state.actions = toMapsList(it).map { each ->
        val buttonType = when (val type = each?.getString("type")) {
          "primary" -> BpkButton.Type.Primary
          "secondary" -> BpkButton.Type.Secondary
          "outline" -> BpkButton.Type.Outline
          "featured" -> BpkButton.Type.Featured
          "destructive" -> BpkButton.Type.Destructive
          else -> throw JSApplicationIllegalArgumentException("Action button type $type is not supported")
        }
        Pair(each.getString("text")!!, buttonType)
      }.toTypedArray()
    }
  }

  public override fun addEventEmitters(reactContext: ThemedReactContext, view: RNDialog) {
    val dispatcher = reactContext.getNativeModule(UIManagerModule::class.java)?.eventDispatcher

    view.state.onAction = { type, pos ->
      dispatcher?.dispatchEvent(ButtonActionEvent(view.id, type, pos))
    }
  }
  
  override fun onAfterUpdateTransaction(view: RNBpkButton) {
    super.onAfterUpdateTransaction(view)
    view.state.dispatchUpdateTransactionFinished()
  }

  // override fun getName(): String {
  //   return VIEW_NAME
  // }

  // override fun addView(parent: RNBpkButton, child: View, index: Int) {
  //   parent.addViewInternal(child, index)
  // }

  private fun toMapsList(readableArray: ReadableArray): List<ReadableMap?> =
    (0 until readableArray.size()).map { i ->
      readableArray.getMap(i)
    }
}
