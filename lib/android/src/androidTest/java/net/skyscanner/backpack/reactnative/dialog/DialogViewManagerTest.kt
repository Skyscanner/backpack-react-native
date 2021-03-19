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

import android.content.Intent
import android.os.Looper
import androidx.core.content.ContextCompat
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.rule.ActivityTestRule
import com.facebook.react.bridge.JSApplicationIllegalArgumentException
import com.facebook.react.bridge.JavaOnlyArray
import com.facebook.react.bridge.JavaOnlyMap
import com.facebook.react.uimanager.ReactStylesDiffMap
import com.facebook.react.uimanager.ThemedReactContext
import io.mockk.mockk
import io.mockk.verify
import net.skyscanner.backpack.R
import net.skyscanner.backpack.button.BpkButton
import net.skyscanner.backpack.dialog.BpkDialog
import net.skyscanner.backpack.reactnative.testing.Matchers.throws
import net.skyscanner.backpack.reactnative.testing.ReactViewManagerTestRule
import net.skyscanner.backpack.reactnative.testing.TestActivity
import org.junit.Assert.assertArrayEquals
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertThat
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Ignore
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class DialogViewManagerTest {

  @get:Rule
  val managerRule = ReactViewManagerTestRule(DialogViewManager::class)
  private val manager: DialogViewManager
    get() = managerRule.manager

  @get:Rule
  val activityRule = ActivityTestRule(TestActivity::class.java, false, false)

  private val themedContext: ThemedReactContext
    get() = managerRule.themedContext

  @Before
  fun setUp() {
    if (Looper.myLooper() == null) {
      Looper.prepare()
    }
  }

  @Test
  fun test_title() {
    val view = manager.createViewInstance(themedContext)
    manager.updateProperties(view, buildProps("title", "Some title"))

    assertNotNull(view.state.title)
    assertEquals("Some title", view.state.title)
  }

  @Test
  fun test_description() {
    val view = manager.createViewInstance(themedContext)
    manager.updateProperties(view, buildProps("description", "Some description"))

    assertNotNull(view.state.description)
    assertEquals("Some description", view.state.description)
  }

  @Test
  fun test_dialog_type() {
    val view = manager.createViewInstance(themedContext)

    manager.updateProperties(view, buildProps("dialogType", "alert"))
    assertEquals(BpkDialog.Style.ALERT, view.state.dialogType)

    manager.updateProperties(view, buildProps("dialogType", "bottomSheet"))
    assertEquals(BpkDialog.Style.BOTTOM_SHEET, view.state.dialogType)
  }

  @Test
  fun test_dialog_type_invalid_value() {
    val view = manager.createViewInstance(themedContext)
    assertThat({
      manager.updateProperties(view, buildProps("dialogType", "invalid"))
    }, throws(JSApplicationIllegalArgumentException::class))
  }

  @Test
  fun test_icon() {
    val view = manager.createViewInstance(themedContext)
    val skyBlueValue = ContextCompat.getColor(themedContext, R.color.bpkSkyBlue)
    manager.updateProperties(view, buildProps(
      "icon", JavaOnlyMap.of(
        "iconId", "bpk_food",
        "iconColor", "bpkSkyBlue")))

    assertNotNull(view.state.icon)
    assertEquals(BpkDialog.Icon(R.drawable.bpk_food, skyBlueValue), view.state.icon)
  }

  @Test
  fun test_icon_invalid_id() {
    val view = manager.createViewInstance(themedContext)
    assertThat({
      manager.updateProperties(view, buildProps(
        "icon", JavaOnlyMap.of(
        "iconId", "invalid",
        "iconColor", "bpkSkyBlue")))
    }, throws(android.content.res.Resources.NotFoundException::class))
  }

  @Test
  @Ignore("For some reason the test doesn't behave as expected, although on real device the exception is thrown")
  fun test_icon_invalid_color() {
    val view = manager.createViewInstance(themedContext)
    assertThat({
      manager.updateProperties(view, buildProps(
        "icon", JavaOnlyMap.of(
        "iconId", "bpk_food",
        "iconColor", " invalid")))
    }, throws(android.content.res.Resources.NotFoundException::class))
  }

  @Test
  fun test_actions() {
    val view = manager.createViewInstance(themedContext)
    val actions = JavaOnlyArray.of(
      JavaOnlyMap.of(
        "text", "Action",
        "type", "primary"),
      JavaOnlyMap.of(
        "text", "Secondary action",
        "type", "secondary"),
      JavaOnlyMap.of(
        "text", "Outline action",
        "type", "outline"),
      JavaOnlyMap.of(
        "text", "Featured action",
        "type", "featured"),
      JavaOnlyMap.of(
        "text", "Destructive action",
        "type", "destructive"))

    manager.updateProperties(view, buildProps("actions", actions))

    assertNotNull(view.state.actions)
    assertArrayEquals(arrayOf(
      "Action" to BpkButton.Type.Primary,
      "Secondary action" to BpkButton.Type.Secondary,
      "Outline action" to BpkButton.Type.Outline,
      "Featured action" to BpkButton.Type.Featured,
      "Destructive action" to BpkButton.Type.Destructive
    ), view.state.actions)
  }

  @Test
  fun test_actions_invalid_type() {
    val view = manager.createViewInstance(themedContext)
    val actions = JavaOnlyArray.of(JavaOnlyMap.of(
      "text", "Action",
      "type", "invalid"))

    assertThat({
      manager.updateProperties(view, buildProps("actions", actions))
    }, throws(JSApplicationIllegalArgumentException::class))
  }

  @Test
  fun test_scrim_enabled() {
    val view = manager.createViewInstance(themedContext)
    manager.updateProperties(view, buildProps("scrimEnabled", true))

    assertTrue(view.state.scrimEnabled)
  }

  @Test
  fun test_is_open() {
    // Dialog needs a running activity to open
    activityRule.launchActivity(Intent())
    val themedActivityContext = ThemedReactContext(managerRule.context, activityRule.activity)
    val view = manager.createViewInstance(themedActivityContext)
    manager.updateProperties(view, buildProps("isOpen", true))

    assertTrue(view.state.isOpen)
  }

  @Test
  fun test_render_once_after_transaction() {
    val stateHolder = mockk<RNDialog.Companion.StateHolder>(relaxed = true)
    val view = RNDialog(themedContext, stateHolder)

    manager.updateProperties(view, buildProps(
      "dialogType", "alert",
      "title", "title",
      "description", "description",
      "icon", JavaOnlyMap.of(
        "iconId", "bpk_flag",
        "iconColor", "bpkSkyBlue"),
      "actions", JavaOnlyArray.of(JavaOnlyMap.of(
        "text", "Action",
        "type", "primary")),
      "scrimEnabled", true,
      "isOpen", true
    ))

    verify(exactly = 1) { stateHolder.dispatchUpdateTransactionFinished() }
  }

  @Test
  fun test_add_event_emitters() {
    val view = manager.createViewInstance(themedContext)
    manager.addEventEmitters(managerRule.themedContext, view)
    assertNotNull(view.state.onAction)
  }

  private fun buildProps(vararg keysAndValues: Any?): ReactStylesDiffMap? {
    return ReactStylesDiffMap(JavaOnlyMap.of(*keysAndValues))
  }
}
