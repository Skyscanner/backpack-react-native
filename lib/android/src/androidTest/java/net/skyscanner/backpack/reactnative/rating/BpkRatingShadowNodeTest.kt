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
package net.skyscanner.backpack.reactnative.rating

import androidx.test.ext.junit.runners.AndroidJUnit4
import com.facebook.soloader.SoLoader
import com.facebook.yoga.YogaMeasureMode
import io.mockk.mockk
import net.skyscanner.backpack.rating.BpkRating
import net.skyscanner.backpack.reactnative.testing.ReactContextTestRule
import org.hamcrest.Matchers.greaterThan
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertThat
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class BpkRatingShadowNodeTest {
  private lateinit var subject: BpkRatingShadowNode

  @get:Rule
  val contextRule = ReactContextTestRule()

  @Before
  fun setUp() {
    SoLoader.init(contextRule.context, 0)
    subject = BpkRatingShadowNode()
    subject.themedContext = contextRule.themedContext
  }

  @Test
  fun test_mark_dirty() {
    assertFalse(subject.isDirty)

    subject.setLocalData(
      BpkRatingLocalData(
        BpkRating(contextRule.themedContext),
        BpkRating.Style.Vertical,
        BpkRating.Size.Base))

    assertTrue(subject.isDirty)
  }

  @Test
  fun test_measure_with_no_data() {
    val result = subject.measure(mockk(), 0f, YogaMeasureMode.UNDEFINED, 0f, YogaMeasureMode.UNDEFINED)
    assertEquals(0, result)
  }

  @Test
  fun test_measure() {
    subject.setLocalData(
      BpkRatingLocalData(
        BpkRating(contextRule.themedContext),
        BpkRating.Style.Vertical,
        BpkRating.Size.Base))

    val result = subject.measure(mockk(), 0f, YogaMeasureMode.UNDEFINED, 0f, YogaMeasureMode.UNDEFINED)

    // There is no way to precisely test if the measure is correct here, so we just check if is
    // greater than 0. screenshots tests should cover this.
    assertThat(result.toInt(), greaterThan(0))
  }
}
