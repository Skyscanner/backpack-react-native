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

import android.content.Context
import android.widget.FrameLayout
import androidx.annotation.VisibleForTesting
import net.skyscanner.backpack.button.BpkButton
import net.skyscanner.backpack.dialog.BpkDialog
import net.skyscanner.backpack.reactnative.BpkViewStateHolder
import net.skyscanner.backpack.reactnative.dialog.events.DialogActionType

typealias ActionCallback = (DialogActionType, Int) -> Unit

typealias Action = Pair<String, BpkButton.Type>

class RNDialog(
  context: Context,
  val state: StateHolder = StateHolder()
) : FrameLayout(context) {

  @VisibleForTesting
  internal var dialog: BpkDialog? = null

  init {
    state.onAfterUpdateTransaction(::render)
  }

  private fun render() {
    val updatedDialog = getUpdatedDialog()
    if (state.isOpen) {
      updatedDialog.show()
    } else {
      updatedDialog.hide()
    }
  }

  private fun getUpdatedDialog(): BpkDialog {
    val updatedDialog = if (dialog == null || state.isInvalid()) {
      BpkDialog(context, state.dialogType).apply {
        // setup actions
        state.actions.forEachIndexed { index, element ->
          this.addActionButton(
            BpkButton(context, element.second).apply {
              text = element.first
              setOnClickListener {
                state.onAction?.invoke(DialogActionType.BUTTON_ACTION, index)
              }
            }
          )
        }

        this.setOnCancelListener {
          state.onAction?.invoke(DialogActionType.SCRIM_ACTION, 0)
        }
      }
    } else {
      dialog!!
    }

    state.title?.let { updatedDialog.title = it }
    state.description?.let { updatedDialog.description = it }
    state.icon?.let { updatedDialog.icon = it }
    updatedDialog.setCanceledOnTouchOutside(state.scrimEnabled)

    dialog = updatedDialog

    return dialog!!
  }

  companion object {
    class StateHolder : BpkViewStateHolder() {
      var dialogType: BpkDialog.Style by markInvalidOnUpdate(BpkDialog.Style.ALERT)
      var actions: Array<Action> by markInvalidOnUpdate(emptyArray())
      var onAction: ActionCallback? by markInvalidOnUpdate(null)

      var title: String? by markDirtyOnUpdate(null)
      var description: String? by markDirtyOnUpdate(null)
      var icon: BpkDialog.Icon? by markDirtyOnUpdate(null)
      var scrimEnabled: Boolean by markDirtyOnUpdate(true)
      var isOpen: Boolean by markDirtyOnUpdate(false)
    }
  }
}
