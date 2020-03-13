/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

import android.view.ViewGroup
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.facebook.react.uimanager.UIManagerModule
import com.nhaarman.mockitokotlin2.*
import net.skyscanner.backpack.rating.BpkRating
import net.skyscanner.backpack.reactnative.testing.ReactContextTestRule
import org.junit.Assert
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class RNBpkRatingTest {

  @get:Rule
  val contextRule = ReactContextTestRule()

  @Test
  fun test_render() {
    val uiModule = contextRule.catalystInstance.getNativeModule(UIManagerModule::class.java)

    val rating = RNBpkRating(contextRule.context)
    rating.render()

    verify(uiModule).setViewLocalData(eq(rating.id), any())
    Assert.assertTrue(rating.getChildAt(0) is BpkRating)
  }

  @Test
  fun test_updating_orientation() {
    val rating = spy(RNBpkRating(contextRule.context))
    rating.render()

    rating.orientation = BpkRating.Orientation.Vertical
    rating.render()

    // TODO: this test relies a bit too much on how this is implemented internally but there is no
    // way to check the orientation in BpkRating atm, so we are checking we correctly recreate the
    // view when orientation changes
    verify(rating, times(2)).removeAllViews()
    verify(rating, times(2)).addView(any(), any<ViewGroup.LayoutParams>())

    Assert.assertEquals(1, rating.childCount)
  }
}
