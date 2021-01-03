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

package net.skyscanner.backpack.reactnative.snackbar

import android.content.Intent
import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.matcher.ViewMatchers
import androidx.test.espresso.matcher.ViewMatchers.withEffectiveVisibility
import androidx.test.espresso.matcher.ViewMatchers.withText
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.rule.ActivityTestRule
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.JavaOnlyMap
import net.skyscanner.backpack.reactnative.testing.ReactContextTestRule
import net.skyscanner.backpack.reactnative.testing.TestActivity
import net.skyscanner.backpack.snackbar.BpkSnackbar
import net.skyscanner.backpack.util.BpkTheme
import org.junit.Assert.assertEquals
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class BpkSnackbarModuleTest {

  @get:Rule
  val activityRule = ActivityTestRule(TestActivity::class.java)

  @get:Rule
  val reactContextRule = ReactContextTestRule()

  @Before
  fun setUp() {
    BpkTheme.applyDefaultsToContext(activityRule.activity)
  }

  @Test
  fun test_constants() {
    val subject = BpkSnackbarModule(reactContextRule.context)
    val constants = subject.constants
    assertEquals(BpkSnackbar.LENGTH_SHORT, constants?.get("LENGTH_SHORT"))
    assertEquals(BpkSnackbar.LENGTH_LONG, constants?.get("LENGTH_LONG"))
    assertEquals(BpkSnackbar.LENGTH_INDEFINITE, constants?.get("LENGTH_INDEFINITE"))
  }

  @Test
  fun test_name() {
    val subject = BpkSnackbarModule(reactContextRule.context)
    assertEquals("AndroidBpkSnackbar", subject.name)
  }

  @Test
  fun test_render() {
    activityRule.activity.runOnUiThread {
      reactContextRule.context.onNewIntent(activityRule.activity, Intent())
      val subject = BpkSnackbarModule(reactContextRule.context)

      subject.show(
        JavaOnlyMap.of(
          "text", "Snackbar text",
          "duration", BpkSnackbar.LENGTH_SHORT),
        Callback { })
    }

    onView(withText("Snackbar text"))
      .check(matches(withEffectiveVisibility(
        ViewMatchers.Visibility.VISIBLE
      )))
  }
}
