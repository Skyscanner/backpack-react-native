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
package net.skyscanner.backpack.reactnative.dialog

import android.content.Context
import android.widget.FrameLayout
import net.skyscanner.backpack.button.BpkButton
import net.skyscanner.backpack.dialog.BpkDialog
import net.skyscanner.backpack.reactnative.dialog.events.DialogActionType

typealias  ActionCallback = (DialogActionType, Int) -> Unit

typealias Action = Pair<String, BpkButton.Type>

class RNDialog(context: Context): FrameLayout(context) {

  private var dialog: BpkDialog = BpkDialog(context)

  private var dirty: Boolean = false

  var dialogType: BpkDialog.Style = BpkDialog.Style.ALERT
    set(value) {
      field = value
      createBpkDialog()
      dirty = true
    }

  var title: String? = null
    set(value) {
      field = value
      value?. let { dialog.title = it }
    }

  var description: String? = null
    set(value) {
      field = value
      value?. let { dialog.description = it }
    }

  var icon: BpkDialog.Icon? = null
    set(value) {
      field = value
      value?. let { dialog.icon = it }
    }

  var actions: Array<Action> = arrayOf()
    set(value) {
      field = value
      createBpkDialog()
      dirty = true
    }

  var scrimEnabled: Boolean = true

  var isOpen: Boolean = false

  var onAction: ActionCallback? = null

  fun show() = dialog.show()

  fun hide() = dialog.dismiss()

  private fun createBpkDialog() {
    dialog = BpkDialog(context, dialogType)
    title?. let { dialog.title = it }
    description?. let { dialog.description = it }
    icon?. let { dialog.icon = it }
  }

  fun setUpActions() {
    if (dirty) {
      dialog.setCanceledOnTouchOutside(scrimEnabled)
      dialog.setOnCancelListener {
        onAction?.invoke(DialogActionType.SCRIM_ACTION, 0)
      }
      actions.forEachIndexed { index, element ->
        dialog.addActionButton(
          BpkButton(context, element.second).apply {
            text = element.first
            setOnClickListener {
              onAction?.invoke(DialogActionType.BUTTON_ACTION, index)
            }
          }
        )
      }
      dirty = false
    }
  }
}
