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

import androidx.core.content.ContextCompat
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.facebook.react.uimanager.UIManagerModule
import io.mockk.verify
import net.skyscanner.backpack.R
import net.skyscanner.backpack.rating.BpkRating
import net.skyscanner.backpack.reactnative.testing.ReactContextTestRule
import org.hamcrest.CoreMatchers.*
import org.junit.Assert.*
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

    val title = { _: BpkRating.Score -> "Title" }
    val subTitle = { _: BpkRating.Score -> "Subtitle" }
    val value = 1f
    val iconRes = ContextCompat.getDrawable(contextRule.context, R.drawable.bpk_flag)!!
    val icon = { _: BpkRating.Score -> iconRes }

    rating.state.title = title
    rating.state.subtitle = subTitle
    rating.state.value = value
    rating.state.icon = icon
    rating.render()

    verify { uiModule.setViewLocalData(eq(rating.id), any()) }

    val bpkRating = rating.getChildAt(0)
    assertTrue(bpkRating is BpkRating)

    bpkRating as BpkRating

    assertEquals(title, bpkRating.title)
    assertEquals(subTitle, bpkRating.subtitle)
    assertEquals(value, bpkRating.value)
    assertEquals(icon, bpkRating.icon)
  }

  @Test
  fun test_updating_orientation() {
    val rating = RNBpkRating(contextRule.context)
    rating.render()
    val instance = rating.getChildAt(0)

    rating.state.orientation = BpkRating.Style.Vertical
    rating.render()
    val newInstance = rating.getChildAt(0)

    // BpkRating does not expose the orientation so we check if a new instance is correctly created
    assertThat(instance, not(sameInstance(newInstance)))
  }

  @Test
  fun test_updating_zie() {
    val rating = RNBpkRating(contextRule.context)
    rating.render()
    val instance = rating.getChildAt(0)

    rating.state.size = BpkRating.Size.Base
    rating.render()
    val newInstance = rating.getChildAt(0)

    // BpkRating does not expose the size so we check if a new instance is correctly created
    assertThat(instance, not(sameInstance(newInstance)))
  }

  @Test
  fun test_update() {
    val rating = RNBpkRating(contextRule.context)

    val title = { _: BpkRating.Score -> "Title" }
    val subTitle = { _: BpkRating.Score -> "Subtitle" }
    val value = 1f
    val flagRes = ContextCompat.getDrawable(contextRule.context, R.drawable.bpk_flag)!!
    val flag = { _: BpkRating.Score -> flagRes }

    val flaskRes = ContextCompat.getDrawable(contextRule.context, R.drawable.bpk_flask)!!
    val flask = { _: BpkRating.Score -> flaskRes }

    rating.state.title = { "Tile1" }
    rating.state.subtitle = { "Subtitle1" }
    rating.state.value = 2f
    rating.state.icon = flag
    rating.render()
    rating.state.title = title
    rating.state.subtitle = subTitle
    rating.state.value = value
    rating.state.icon = flask
    rating.state.icon = flask
    rating.render()
    val bpkRating = rating.getChildAt(0)
    bpkRating as BpkRating

    assertEquals(title, bpkRating.title)
    assertEquals(subTitle, bpkRating.subtitle)
    assertEquals(value, bpkRating.value)
    assertEquals(flask, bpkRating.icon)
  }
}
