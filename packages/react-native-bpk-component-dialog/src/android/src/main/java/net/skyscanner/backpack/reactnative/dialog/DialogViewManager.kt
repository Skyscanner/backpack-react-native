/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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
package net.skyscanner.backpack.reactnative.dialog

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import net.skyscanner.backpack.reactnative.dialog.events.DialogActionEvent
import net.skyscanner.backpack.button.BpkButton
import net.skyscanner.backpack.dialog.BpkDialog.Style
import java.lang.IllegalArgumentException

class DialogViewManager : ViewGroupManager<RNDialog>() {

  companion object {
    const val VIEW_NAME = "AndroidBPKDialogView"
  }

  override fun getName() = VIEW_NAME

  override fun createViewInstance(reactContext: ThemedReactContext): RNDialog {
    return RNDialog(reactContext)
  }

  @ReactProp(name = "dialogType")
  fun setDialogType(view: RNDialog, dialogType: String) {
    view.dialogType = when (dialogType) {
      "alert" -> Style.ALERT
      "bottomSheet" -> Style.BOTTOM_SHEET
      else -> throw IllegalArgumentException("Dialog type $dialogType is not supported")
    }
  }

  @ReactProp(name = "title")
  fun setTitle(view: RNDialog, title: String) {
    view.title = title
  }

  @ReactProp(name = "description")
  fun setDescription(view: RNDialog, description: String?) {
    description?.let {
      view.description = description
    }
  }

  @ReactProp(name = "iconId")
  fun setIconId(view: RNDialog, iconId: String?) {
    iconId?.let {
      view.iconId = iconId
    }
  }

  @ReactProp(name = "iconColor")
  fun setIconColor(view: RNDialog, iconColor: String?) {
    iconColor?.let {
      view.iconColor = iconColor
    }
  }

  @ReactProp(name = "actionsName")
  fun setActionsName(view: RNDialog, actionsName: ReadableArray?) {
    actionsName?.let {
      view.actionsName = toList(actionsName).toTypedArray()
    }
  }

  @ReactProp(name = "actionsType")
  fun setActionsType(view: RNDialog, actionsType: ReadableArray?) {
    actionsType?.let {
      view.actionsType = toList(actionsType).map { type ->
        when(type) {
          "primary" -> BpkButton.Type.Primary
          "secondary" -> BpkButton.Type.Secondary
          "outline" -> BpkButton.Type.Outline
          "featured" -> BpkButton.Type.Featured
          "destructive" -> BpkButton.Type.Destructive
          else -> throw IllegalArgumentException("Action button type $type is not supported")
        }
      }.toTypedArray()
    }
  }

  @ReactProp(name = "isOpen")
  fun setTitle(view: RNDialog, isOpen: Boolean) {
    view.isOpen = isOpen
  }

  override fun addEventEmitters(reactContext: ThemedReactContext, view: RNDialog) {
    val dispatcher = reactContext.getNativeModule(UIManagerModule::class.java).eventDispatcher

    view.onAction = { pos ->
      dispatcher.dispatchEvent(DialogActionEvent(view.id, pos))
    }
  }

  override fun onAfterUpdateTransaction(view: RNDialog) {
    super.onAfterUpdateTransaction(view)
    view.render()
    if (view.isOpen) {
      view.show()
    } else {
      view.hide()
    }
  }

  private fun toList(readableArray: ReadableArray): List<String> =
    (0 until readableArray.size()).map { i ->
      readableArray.getString(i)?.let { it } ?: run { "haha" }
    }
}
