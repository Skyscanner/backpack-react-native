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

import android.content.Context
import android.content.res.Resources
import android.widget.FrameLayout
import net.skyscanner.backpack.button.BpkButton
import net.skyscanner.backpack.dialog.BpkDialog

typealias  ActionCallback = (Int) -> Unit

typealias Action = Pair<String, BpkButton.Type>

class RNDialog(context: Context): FrameLayout(context) {

  private var dialog: BpkDialog = BpkDialog(context)

  var dialogType: BpkDialog.Style = BpkDialog.Style.ALERT

  var title: String = ""

  var description: String = ""

  var icon: BpkDialog.Icon? = null

  var actions: Array<Action> = arrayOf()

  var isOpen: Boolean = false

  var onAction: ActionCallback? = null

  fun show() {
    dialog.show()
  }

  fun hide() {
    dialog.dismiss()
  }

  fun render() {

    dialog = BpkDialog(context, dialogType)
    dialog.title = title
    dialog.description = description
    dialog.icon = icon
    actions.forEachIndexed { index, element ->
      dialog.addActionButton(
        BpkButton(context, element.second).apply {
          text = element.first
          setOnClickListener {
            onAction?.invoke(index)
            hide()
          }
        }
      )
    }
  }
}
