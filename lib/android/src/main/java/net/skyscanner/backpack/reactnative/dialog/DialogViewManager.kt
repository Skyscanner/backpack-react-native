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
package net.skyscanner.backpack.reactnative.dialog

import android.content.res.Resources
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.JSApplicationIllegalArgumentException
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import net.skyscanner.backpack.button.BpkButton
import net.skyscanner.backpack.dialog.BpkDialog
import net.skyscanner.backpack.dialog.BpkDialog.Style
import net.skyscanner.backpack.reactnative.dialog.events.DialogActionEvent

class DialogViewManager : ViewGroupManager<RNDialog>() {

  companion object {
    const val VIEW_NAME = "AndroidBPKDialogView"
  }

  override fun getName() = VIEW_NAME

  public override fun createViewInstance(reactContext: ThemedReactContext): RNDialog {
    return RNDialog(reactContext)
  }

  @ReactProp(name = "dialogType")
  fun setDialogType(view: RNDialog, dialogType: String) {
    view.state.dialogType = when (dialogType) {
      "alert" -> Style.ALERT
      "bottomSheet" -> Style.BOTTOM_SHEET
      else -> throw JSApplicationIllegalArgumentException("Dialog type $dialogType is not supported")
    }
  }

  @ReactProp(name = "title")
  fun setTitle(view: RNDialog, title: String?) {
    view.state.title = title
  }

  @ReactProp(name = "description")
  fun setDescription(view: RNDialog, description: String?) {
    view.state.description = description
  }

  @ReactProp(name = "icon")
  fun setIcon(view: RNDialog, icon: ReadableMap?) {
    icon?.let {
      val resources: Resources = view.context.resources
      val iconId = resources.getIdentifier(icon.getString("iconId"), "drawable", view.context.packageName)
      val iconColorId = resources.getIdentifier(icon.getString("iconColor"), "color", view.context.packageName)
      if (iconColorId == 0) {
        throw Resources.NotFoundException("Unable to find color with id=$iconColorId")
      }
      view.state.icon = BpkDialog.Icon(iconId, ContextCompat.getColor(view.context, iconColorId))
    }
  }

  @ReactProp(name = "actions")
  fun setActions(view: RNDialog, actions: ReadableArray?) {
    actions?.let {
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

  @ReactProp(name = "scrimEnabled")
  fun setScrimEnabled(view: RNDialog, scrimEnabled: Boolean) {
    view.state.scrimEnabled = scrimEnabled
  }

  @ReactProp(name = "isOpen")
  fun setIsOpen(view: RNDialog, isOpen: Boolean) {
    view.state.isOpen = isOpen
  }

  public override fun addEventEmitters(reactContext: ThemedReactContext, view: RNDialog) {
    val dispatcher = reactContext.getNativeModule(UIManagerModule::class.java).eventDispatcher

    view.state.onAction = { type, pos ->
      dispatcher.dispatchEvent(DialogActionEvent(view.id, type, pos))
    }
  }

  override fun onAfterUpdateTransaction(view: RNDialog) {
    super.onAfterUpdateTransaction(view)
    view.state.dispatchUpdateTransactionFinished()
  }

  private fun toMapsList(readableArray: ReadableArray): List<ReadableMap?> =
    (0 until readableArray.size()).map { i ->
      readableArray.getMap(i)
    }
}
