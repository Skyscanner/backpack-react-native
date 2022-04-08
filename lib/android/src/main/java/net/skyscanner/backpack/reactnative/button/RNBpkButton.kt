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
package net.skyscanner.backpack.reactnative.button

import android.content.Context
import android.widget.FrameLayout
import androidx.annotation.VisibleForTesting
import net.skyscanner.backpack.button.BpkButton
import net.skyscanner.backpack.dialog.BpkDialog
import net.skyscanner.backpack.reactnative.BpkViewStateHolder
import net.skyscanner.backpack.reactnative.dialog.events.DialogActionType

typealias ActionCallback = (DialogActionType, Int) -> Unit

typealias Action = Pair<String, BpkButton.Type>

class RNButton(
  context: Context,
  val state: StateHolder = StateHolder()
) : FrameLayout(context) {

  @VisibleForTesting
  internal var button: BpkButton? = null

  init {
    state.onAfterUpdateTransaction(::render)
  }

  fun render() {
    val view = BpkButton(context, element.second).apply {
      text = element.first
      setOnClickListener {
        state.onAction?.invoke(DialogActionType.BUTTON_ACTION, index)
      }
    })
    // if (state.isOpen) {
    //   updatedDialog.show()
    // } else {
    //   updatedDialog.hide()
    // }
  }

  // private fun getUpdatedButton(): BpkButton {
  //   val updatedButton = if (button == null || state.isInvalid()) {
  //     BpkDialog(context, state.dialogType).apply {
  //       // setup actions
  //       state.actions.forEachIndexed { index, element ->
  //         this.addActionButton(
  //           BpkButton(context, element.second).apply {
  //             text = element.first
  //             setOnClickListener {
  //               state.onAction?.invoke(DialogActionType.BUTTON_ACTION, index)
  //             }
  //           }
  //         )
  //       }

  //       this.setOnCancelListener {
  //         state.onAction?.invoke(DialogActionType.SCRIM_ACTION, 0)
  //       }
  //     }
  //   } else {
  //     dialog!!
  //   }

  //   state.title?.let { updatedDialog.title = it }
  //   state.description?.let { updatedDialog.description = it }
  //   state.icon?.let { updatedDialog.icon = it }
  //   updatedDialog.setCanceledOnTouchOutside(state.scrimEnabled)

  //   dialog = updatedDialog

  //   return dialog!!
  // }

  companion object {
    class StateHolder : BpkViewStateHolder() {
      var title: String? by markDirtyOnUpdate(null)
      var type: String? by markDirtyOnUpdate(null)
      var large: Boolean by markDirtyOnUpdate(false)
      var icon: BpkButton.Icon? by markDirtyOnUpdate(null)
      var iconAlignment: String? by markDirtyOnUpdate(null)
      var onPress: ActionCallback? by markInvalidOnUpdate(null)
    }
  }
}
