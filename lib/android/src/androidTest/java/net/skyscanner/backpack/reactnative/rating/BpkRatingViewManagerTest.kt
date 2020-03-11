package net.skyscanner.backpack.reactnative.rating

import androidx.test.ext.junit.runners.AndroidJUnit4
import com.facebook.react.bridge.JavaOnlyArray
import com.facebook.react.bridge.JavaOnlyMap
import com.facebook.react.uimanager.ReactStylesDiffMap
import net.skyscanner.backpack.rating.BpkRating
import net.skyscanner.backpack.reactnative.testing.ReactViewManagerTestRule
import org.junit.Assert
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class BpkRatingViewManagerTest {

  @get:Rule
  val managerRule = ReactViewManagerTestRule(BpkRatingViewManager::class)
  private val manager: BpkRatingViewManager
    get() = managerRule.manager

  @Test
  fun test_title() {
    val view =  manager.createViewInstance(managerRule.themedContext)
    manager.updateProperties(view, buildProps("title", JavaOnlyArray.of("low", "med", "high")))

    Assert.assertNotNull(view.title)
    Assert.assertEquals("low", view.title?.invoke(BpkRating.Score.Low))
    Assert.assertEquals("med", view.title?.invoke(BpkRating.Score.Medium))
    Assert.assertEquals("high", view.title?.invoke(BpkRating.Score.High))
  }

  private fun buildProps(vararg keysAndValues: Any?): ReactStylesDiffMap? {
    return ReactStylesDiffMap(JavaOnlyMap.of(*keysAndValues))
  }
}
