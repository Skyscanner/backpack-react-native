package net.skyscanner.backpack.reactnative.testing

import android.util.DisplayMetrics
import androidx.test.platform.app.InstrumentationRegistry
import com.facebook.react.bridge.CatalystInstance
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.DisplayMetricsHolder
import com.facebook.react.uimanager.ThemedReactContext
import net.skyscanner.backpack.util.BpkTheme
import org.junit.rules.TestWatcher
import org.junit.runner.Description
import kotlin.reflect.KClass

class ReactViewManagerTestRule<T: Any>(private val managerClass: KClass<T>) : TestWatcher() {
  private lateinit var context: ReactApplicationContext
  private lateinit var catalystInstanceMock: CatalystInstance
  lateinit var themedContext: ThemedReactContext
  private var _manager: T? = null

  val manager: T
    get() = _manager!!

  override fun starting(description: Description?) {
    context = ReactApplicationContext(InstrumentationRegistry.getInstrumentation().targetContext)
    BpkTheme.applyDefaultsToContext(context)
    catalystInstanceMock = ReactTestHelper.createMockCatalystInstance()
    context.initializeWithInstance(catalystInstanceMock)
    themedContext = ThemedReactContext(context, context)
    _manager = managerClass.java.newInstance()
    DisplayMetricsHolder.setWindowDisplayMetrics(DisplayMetrics())
    super.starting(description)
  }
}
