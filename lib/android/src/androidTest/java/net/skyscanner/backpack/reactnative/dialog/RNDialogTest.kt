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

import android.os.Looper
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.rule.ActivityTestRule
import com.facebook.react.uimanager.ThemedReactContext
import net.skyscanner.backpack.R
import net.skyscanner.backpack.button.BpkButton
import net.skyscanner.backpack.dialog.BpkDialog
import net.skyscanner.backpack.reactnative.testing.ReactContextTestRule
import net.skyscanner.backpack.reactnative.testing.TestActivity
import org.hamcrest.CoreMatchers.not
import org.hamcrest.CoreMatchers.sameInstance
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertThat
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class RNDialogTest {

  @get:Rule
  val contextRule = ReactContextTestRule()

  @get:Rule
  val activityRule = ActivityTestRule(TestActivity::class.java)

  private lateinit var themedReactContext: ThemedReactContext

  @Before
  fun setUp() {
    if (Looper.myLooper() == null) {
      Looper.prepare()
    }
    themedReactContext = ThemedReactContext(contextRule.context, activityRule.activity)
  }

  @Test
  fun test_render() {
    val stateHolder = RNDialog.Companion.StateHolder()
    val dialog = RNDialog(themedReactContext, stateHolder)

    val title = "Title"
    val description = "Description"
    val icon = BpkDialog.Icon(R.drawable.bpk_food, R.color.bpkSkyBlue)

    dialog.state.title = title
    dialog.state.description = description
    dialog.state.icon = icon

    stateHolder.dispatchUpdateTransactionFinished()

    val bpkDialog = dialog.dialog
    assertNotNull(bpkDialog)

    bpkDialog!!

    assertEquals(title, bpkDialog.title)
    assertEquals(description, bpkDialog.description)
    assertEquals(icon, bpkDialog.icon)
  }

  @Test
  fun test_updating_dialog_type() {
    val stateHolder = RNDialog.Companion.StateHolder()
    val dialog = RNDialog(themedReactContext, stateHolder)
    stateHolder.dispatchUpdateTransactionFinished()

    val instance = dialog.dialog

    dialog.state.dialogType = BpkDialog.Style.BOTTOM_SHEET
    stateHolder.dispatchUpdateTransactionFinished()
    val newInstance = dialog.dialog

    assertThat(instance, not(sameInstance(newInstance)))
  }

  @Test
  fun test_updating_actions() {
    val stateHolder = RNDialog.Companion.StateHolder()
    val dialog = RNDialog(themedReactContext, stateHolder)
    stateHolder.dispatchUpdateTransactionFinished()

    val instance = dialog.dialog

    dialog.state.actions = arrayOf("Primary" to BpkButton.Type.Primary)
    stateHolder.dispatchUpdateTransactionFinished()
    val newInstance = dialog.dialog

    assertThat(instance, not(sameInstance(newInstance)))
  }

  @Test
  fun test_updating_action_listener() {
    val stateHolder = RNDialog.Companion.StateHolder()
    val dialog = RNDialog(themedReactContext, stateHolder)
    stateHolder.dispatchUpdateTransactionFinished()

    val instance = dialog.dialog

    dialog.state.onAction = { _, _ -> }
    stateHolder.dispatchUpdateTransactionFinished()
    val newInstance = dialog.dialog

    assertThat(instance, not(sameInstance(newInstance)))
  }
}
