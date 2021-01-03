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

import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.test.ext.junit.runners.AndroidJUnit4
import net.skyscanner.backpack.reactnative.testing.ReactContextTestRule
import org.hamcrest.Matchers.`is`
import org.hamcrest.Matchers.instanceOf
import org.junit.Assert.assertEquals
import org.junit.Assert.assertThat
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class RNBpkFlareTest {

  @get:Rule
  val contextRule = ReactContextTestRule()

  @Test
  fun test_add_internal_view() {
    val subject = RNBpkFlare(contextRule.context)
    val view = FrameLayout(contextRule.context)
    val view2 = FrameLayout(contextRule.context)
    subject.addViewInternal(view, 0)
    subject.addViewInternal(view2, 0)

    assertEquals(1, subject.childCount)

    val viewWrapper = subject.getChildAt(0)
    assertThat(viewWrapper, `is`(instanceOf(ViewGroup::class.java)))

    viewWrapper as ViewGroup

    assertEquals(2, viewWrapper.childCount)
  }
}
