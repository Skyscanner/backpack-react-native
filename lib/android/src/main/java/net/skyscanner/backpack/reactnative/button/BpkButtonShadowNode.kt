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

import android.view.View
import android.view.ViewGroup
import com.facebook.react.uimanager.LayoutShadowNode
import com.facebook.yoga.YogaMeasureFunction
import com.facebook.yoga.YogaMeasureMode
import com.facebook.yoga.YogaMeasureOutput
import com.facebook.yoga.YogaNode
import net.skyscanner.backpack.reactnative.button.BpkButtonLocalData

/**
 * Custom shadow node for [BpkButtonViewManager].
 *
 * This class will measure to the same size as the current [RNBpkButton] being rendered.
 * To approach used here is based on the code for react native's EditText and CheckBox components.
 *
 * A high level overview of what is happening is as follows:
 *
 * 1. [BpkButtonViewManager] will receive props from js code, update [RNBpkButton] instance and
 *   call [RNBpkButton.render] after the all props have been updated
 *
 * 2. [RNBpkButton.render] will create an instance of [BpkButtonLocalData] containing the information
 *   to create a copy of the current [RNBpkButton] being rendered. RNBpkButton will then call
 *   UIManagerModule.setViewLocalData which will trigger [BpkButtonShadowNode.setLocalData]
 *
 * 3. [BpkButtonShadowNode.setLocalData] will mark this node as dirty which will cause
 *   [BpkButtonShadowNode.measure] to be called in next layout pass.
 *
 * 4. [BpkButtonShadowNode.measure] will use the [BpkButtonLocalData] to create a copy of the current
 *   view being rendered and measure itself.
 */
class BpkButtonShadowNode internal constructor() : LayoutShadowNode(), YogaMeasureFunction {

  private var localData: BpkButtonLocalData? = null
  private var lastWidth = 0
  private var lastHeight = 0

  init {
    initMeasureFunction()
  }

  private fun initMeasureFunction() {
    setMeasureFunction(this)
  }

  override fun setLocalData(data: Any) {
    data as BpkButtonLocalData
    localData = data
    dirty()
  }

  override fun measure(
    node: YogaNode,
    width: Float,
    widthMode: YogaMeasureMode,
    height: Float,
    heightMode: YogaMeasureMode
  ): Long {
    val data = localData

    if (data != null) {
      val view = data.asBpkButton(themedContext).apply {
        layoutParams = ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT)
      }
      val spec = View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED)
      view.measure(spec, spec)

      lastWidth = view.measuredWidth
      lastHeight = view.measuredHeight
    }

    return YogaMeasureOutput.make(lastWidth, lastHeight)
  }
}
