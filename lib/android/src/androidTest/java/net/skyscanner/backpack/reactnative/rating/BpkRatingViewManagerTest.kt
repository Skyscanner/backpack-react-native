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

import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.facebook.react.bridge.*
import com.facebook.react.uimanager.ReactStylesDiffMap
import com.facebook.react.uimanager.ThemedReactContext
import io.mockk.*
import net.skyscanner.backpack.R
import net.skyscanner.backpack.rating.BpkRating
import net.skyscanner.backpack.reactnative.testing.Matchers.throws
import net.skyscanner.backpack.reactnative.testing.ReactViewManagerTestRule
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertThat
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class BpkRatingViewManagerTest {

  @get:Rule
  val managerRule = ReactViewManagerTestRule(BpkRatingViewManager::class)
  private val manager: BpkRatingViewManager
    get() = managerRule.manager

  private val themedContext: ThemedReactContext
    get() = managerRule.themedContext

  @Test
  fun test_title() {
    val view = manager.createViewInstance(themedContext)
    manager.updateProperties(view, buildProps("title", JavaOnlyArray.of("low", "med", "high")))

    assertNotNull(view.state.title)
    assertEquals("low", view.state.title?.invoke(BpkRating.Score.Low))
    assertEquals("med", view.state.title?.invoke(BpkRating.Score.Medium))
    assertEquals("high", view.state.title?.invoke(BpkRating.Score.High))
  }

  @Test
  fun test_title_single_value() {
    val view = manager.createViewInstance(themedContext)
    manager.updateProperties(view, buildProps("title", JavaOnlyArray.of("all")))

    assertNotNull(view.state.title)
    assertEquals("all", view.state.title?.invoke(BpkRating.Score.Low))
    assertEquals("all", view.state.title?.invoke(BpkRating.Score.Medium))
    assertEquals("all", view.state.title?.invoke(BpkRating.Score.High))
  }

  @Test
  fun test_title_invalid_values() {
    val view = manager.createViewInstance(themedContext)
    assertThat({
      manager.updateProperties(view, buildProps("title", JavaOnlyArray.of(null)))
    }, throws(JSApplicationIllegalArgumentException::class))
    assertThat({
      manager.updateProperties(view, buildProps("title", JavaOnlyArray.of()))
    }, throws(JSApplicationIllegalArgumentException::class))
  }

  @Test
  fun test_subtitle() {
    val view = manager.createViewInstance(themedContext)
    manager.updateProperties(view, buildProps("subtitle", JavaOnlyArray.of("low", "med", "high")))

    assertNotNull(view.state.subtitle)
    assertEquals("low", view.state.subtitle?.invoke(BpkRating.Score.Low))
    assertEquals("med", view.state.subtitle?.invoke(BpkRating.Score.Medium))
    assertEquals("high", view.state.subtitle?.invoke(BpkRating.Score.High))
  }

  @Test
  fun test_subtitle_single_value() {
    val view = manager.createViewInstance(themedContext)
    manager.updateProperties(view, buildProps("subtitle", JavaOnlyArray.of("all")))

    assertNotNull(view.state.subtitle)
    assertEquals("all", view.state.subtitle?.invoke(BpkRating.Score.Low))
    assertEquals("all", view.state.subtitle?.invoke(BpkRating.Score.Medium))
    assertEquals("all", view.state.subtitle?.invoke(BpkRating.Score.High))
  }

  @Test
  fun test_subtitle_invalid_values() {
    val view = manager.createViewInstance(themedContext)
    assertThat({
      manager.updateProperties(view, buildProps("subtitle", JavaOnlyArray.of(null)))
    }, throws(JSApplicationIllegalArgumentException::class))
    assertThat({
      manager.updateProperties(view, buildProps("subtitle", JavaOnlyArray.of()))
    }, throws(JSApplicationIllegalArgumentException::class))
  }

  @Test
  fun test_value() {
    val view = manager.createViewInstance(themedContext)
    manager.updateProperties(view, buildProps("value", 1f))

    assertEquals(1f, view.state.value)
  }

  @Test
  fun test_size() {
    val view = manager.createViewInstance(themedContext)
    val options = mapOf(
      "icon" to BpkRating.Size.Icon,
      "xs" to BpkRating.Size.ExtraSmall,
      "sm" to BpkRating.Size.Small,
      "base" to BpkRating.Size.Base,
      "lg" to BpkRating.Size.Large)

    options.entries.forEach { entry ->
      val jsValue = entry.key
      val expectedValue = entry.value

      manager.updateProperties(view, buildProps("size", jsValue))
      assertEquals(expectedValue, view.state.size)
    }

    assertThat({
      manager.updateProperties(view, buildProps("size", "invalid"))
    }, throws(JSApplicationIllegalArgumentException::class))
  }

  @Test
  fun test_orientation() {
    val view = manager.createViewInstance(themedContext)
    val options = mapOf(
      "horizontal" to BpkRating.Style.Horizontal,
      "vertical" to BpkRating.Style.Vertical)

    options.entries.forEach { entry ->
      val jsValue = entry.key
      val expectedValue = entry.value

      manager.updateProperties(view, buildProps("orientation", jsValue))
      assertEquals(expectedValue, view.state.orientation)
    }

    assertThat({
      manager.updateProperties(view, buildProps("orientation", "invalid"))
    }, throws(JSApplicationIllegalArgumentException::class))
  }

  @Test
  fun test_icon() {
    val view = manager.createViewInstance(themedContext)
    manager.updateProperties(view, buildProps(
      "size", "icon",
      "icon", JavaOnlyArray.of("bpk_flag", "bpk_food", "bpk_flask")))

    val flag = drawableToBitmap(themedContext.getDrawable(R.drawable.bpk_flag))!!
    val food = drawableToBitmap(themedContext.getDrawable(R.drawable.bpk_food))!!
    val flask = drawableToBitmap(themedContext.getDrawable(R.drawable.bpk_flask))!!

    assertNotNull(view.state.icon)

    assertTrue(flag.sameAs(drawableToBitmap(view.state.icon?.invoke(BpkRating.Score.Low))))
    assertTrue(food.sameAs(drawableToBitmap(view.state.icon?.invoke(BpkRating.Score.Medium))))
    assertTrue(flask.sameAs(drawableToBitmap(view.state.icon?.invoke(BpkRating.Score.High))))
  }

  @Test
  fun test_icon_single_value() {
    val view = manager.createViewInstance(themedContext)
    manager.updateProperties(view, buildProps(
      "size", "icon",
      "icon", JavaOnlyArray.of("bpk_flag")))

    val flag = drawableToBitmap(themedContext.getDrawable(R.drawable.bpk_flag))!!

    assertNotNull(view.state.icon)

    assertTrue(flag.sameAs(drawableToBitmap(view.state.icon?.invoke(BpkRating.Score.Low))))
    assertTrue(flag.sameAs(drawableToBitmap(view.state.icon?.invoke(BpkRating.Score.Medium))))
    assertTrue(flag.sameAs(drawableToBitmap(view.state.icon?.invoke(BpkRating.Score.High))))
  }

  @Test
  fun test_icon_invalid_values() {
    val view = manager.createViewInstance(themedContext)
    manager.updateProperties(view, buildProps("size", "icon"))
    assertThat({
      manager.updateProperties(view, buildProps("icon", JavaOnlyArray.of(null)))
    }, throws(JSApplicationIllegalArgumentException::class))
    assertThat({
      manager.updateProperties(view, buildProps("icon", JavaOnlyArray.of()))
    }, throws(JSApplicationIllegalArgumentException::class))
    assertThat({
      manager.updateProperties(view, buildProps("icon", JavaOnlyArray.of("invalidIcon")))
    }, throws(android.content.res.Resources.NotFoundException::class))
  }

  @Test
  fun test_render_once_after_transaction() {
    val stateHolder = mockk<RNBpkRating.Companion.StateHolder>(relaxed = true)
    val view = RNBpkRating(themedContext, stateHolder)
    manager.updateProperties(view, buildProps(
      "value", 1f,
      "icon", JavaOnlyArray.of("bpk_flag", "bpk_food", "bpk_flask"),
      "subtitle", JavaOnlyArray.of("low", "med", "high"),
      "title", JavaOnlyArray.of("low", "med", "high"),
      "orientation", "horizontal",
      "size", "xs"
    ))

    verify(exactly = 1) { stateHolder.dispatchUpdateTransactionFinished() }
  }

  private fun buildProps(vararg keysAndValues: Any?): ReactStylesDiffMap? {
    return ReactStylesDiffMap(JavaOnlyMap.of(*keysAndValues))
  }

  private fun drawableToBitmap(drawable: Drawable?): Bitmap? {
    if (drawable == null) {
      return null
    }

    if (drawable is BitmapDrawable) {
      if (drawable.bitmap != null) {
        return drawable.bitmap
      }
    }
    val bitmap = if (drawable.intrinsicWidth <= 0 || drawable.intrinsicHeight <= 0) {
      Bitmap.createBitmap(1, 1, Bitmap.Config.ARGB_8888) // Single color bitmap will be created of 1x1 pixel
    } else {
      Bitmap.createBitmap(drawable.intrinsicWidth, drawable.intrinsicHeight, Bitmap.Config.ARGB_8888)
    }
    val canvas = Canvas(bitmap)
    drawable.setBounds(0, 0, canvas.width, canvas.height)
    drawable.draw(canvas)
    return bitmap
  }
}
