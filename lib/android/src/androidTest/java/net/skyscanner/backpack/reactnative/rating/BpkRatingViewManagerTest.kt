package net.skyscanner.backpack.reactnative.rating

import android.util.DisplayMetrics
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import com.facebook.react.bridge.CatalystInstance
import com.facebook.react.bridge.JavaOnlyArray
import com.facebook.react.bridge.JavaOnlyMap
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.DisplayMetricsHolder
import com.facebook.react.uimanager.ReactStylesDiffMap
import com.facebook.react.uimanager.ThemedReactContext
import net.skyscanner.backpack.rating.BpkRating
import net.skyscanner.backpack.reactnative.testing.ReactTestHelper.createMockCatalystInstance
import net.skyscanner.backpack.util.BpkTheme
import org.junit.Assert
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class BpkRatingViewManagerTest {

  private lateinit var context: ReactApplicationContext
  private lateinit var catalystInstanceMock: CatalystInstance
  private lateinit var themedContext: ThemedReactContext
  private lateinit var manager: BpkRatingViewManager

  @Before
  fun setUp() {
    context = ReactApplicationContext(InstrumentationRegistry.getInstrumentation().targetContext)
    BpkTheme.applyDefaultsToContext(context)
    catalystInstanceMock = createMockCatalystInstance()
    context.initializeWithInstance(catalystInstanceMock)
    themedContext = ThemedReactContext(context, context)
    manager = BpkRatingViewManager()
    DisplayMetricsHolder.setWindowDisplayMetrics(DisplayMetrics())
  }

  @Test
  fun test_title() {
    val view = manager.createViewInstance(themedContext)
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
