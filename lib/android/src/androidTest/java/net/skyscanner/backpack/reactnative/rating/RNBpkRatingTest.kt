package net.skyscanner.backpack.reactnative.rating

import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import com.facebook.react.bridge.ReactApplicationContext
import net.skyscanner.backpack.rating.BpkRating
import net.skyscanner.backpack.reactnative.testing.ReactTestHelper
import net.skyscanner.backpack.util.BpkTheme
import org.junit.Assert
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class RNBpkRatingTest {
  @Test
  fun test_render() {
    val context = ReactApplicationContext(InstrumentationRegistry.getInstrumentation().targetContext)
    BpkTheme.applyDefaultsToContext(context)
    context.initializeWithInstance(ReactTestHelper.createMockCatalystInstance())
    val rating = RNBpkRating(context)
    rating.render()

    Assert.assertTrue(rating.getChildAt(0) is BpkRating)
  }
}
