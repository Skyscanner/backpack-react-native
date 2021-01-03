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
package net.skyscanner.backpack.reactnative.flare

import android.widget.FrameLayout
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.facebook.react.bridge.JSApplicationIllegalArgumentException
import com.facebook.react.bridge.JavaOnlyMap
import com.facebook.react.uimanager.ReactStylesDiffMap
import com.facebook.react.uimanager.ThemedReactContext
import net.skyscanner.backpack.flare.BpkFlare
import net.skyscanner.backpack.reactnative.testing.Matchers.throws
import net.skyscanner.backpack.reactnative.testing.ReactViewManagerTestRule
import org.hamcrest.Matchers.`is`
import org.hamcrest.Matchers.instanceOf
import org.junit.Assert.assertEquals
import org.junit.Assert.assertThat
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class BpkFlareViewManagerTest {

  @get:Rule
  val managerRule = ReactViewManagerTestRule(BpkFlareViewManager::class)
  private val manager: BpkFlareViewManager
    get() = managerRule.manager

  private val themedContext: ThemedReactContext
    get() = managerRule.themedContext

  @Test
  fun test_create_view_instance() {
    val view = manager.createViewInstance(themedContext)
    assertThat(view, `is`(instanceOf(RNBpkFlare::class.java)))
  }

  @Test
  fun test_export_view_name() {
    assertEquals("AndroidBPKFlareView", manager.name)
  }

  @Test
  fun test_does_not_throw_if_more_than_one_children_is_added() {
    val view = manager.createViewInstance(themedContext)
    manager.addView(view, FrameLayout(managerRule.context), 0)
    manager.addView(view, FrameLayout(managerRule.context), 1)
  }

  @Test
  fun test_pointerDirection() {
    val view = manager.createViewInstance(themedContext)
    manager.updateProperties(view, buildProps(
      "pointerDirection", "down"))

    assertEquals(BpkFlare.PointerDirection.DOWN, view.state.pointerDirection)

    manager.updateProperties(view, buildProps(
      "pointerDirection", "up"))

    assertEquals(BpkFlare.PointerDirection.UP, view.state.pointerDirection)
  }

  @Test
  fun test_invalid_pointerDirection() {
    val view = manager.createViewInstance(themedContext)
    assertThat({
      manager.updateProperties(view, buildProps(
        "pointerDirection", "invalid"))
    }, throws(JSApplicationIllegalArgumentException::class))
  }

  private fun buildProps(vararg keysAndValues: Any?): ReactStylesDiffMap? {
    return ReactStylesDiffMap(JavaOnlyMap.of(*keysAndValues))
  }
}
