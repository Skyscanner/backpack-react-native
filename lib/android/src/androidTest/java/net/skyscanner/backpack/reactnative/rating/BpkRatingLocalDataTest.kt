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
import net.skyscanner.backpack.rating.BpkRating
import net.skyscanner.backpack.reactnative.testing.ReactContextTestRule
import org.junit.Assert.*
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class BpkRatingLocalDataTest {

  @get:Rule
  val contextRule = ReactContextTestRule()

  @Test
  fun test_asBpkRating() {
    val title = { _: BpkRating.Score -> "title" }
    val subtitle = { _: BpkRating.Score -> "subtitle" }
    val value = 1f

    val bpkRating = BpkRating(contextRule.context)
    bpkRating.title = title
    bpkRating.subtitle = subtitle
    bpkRating.value = value

    val subject = BpkRatingLocalData(
      bpkRating,
      BpkRating.Style.Vertical,
      BpkRating.Size.Base
    ).asBpkRating(contextRule.context)

    assertEquals(title, subject.title)
    assertEquals(subtitle, subject.subtitle)
    assertEquals(value, subject.value)
  }
}
