package net.skyscanner.backpack.reactnative.testing

import androidx.test.platform.app.InstrumentationRegistry
import com.facebook.react.bridge.CatalystInstance
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ThemedReactContext
import net.skyscanner.backpack.util.BpkTheme
import org.junit.rules.TestWatcher
import org.junit.runner.Description

class ReactContextTestRule: TestWatcher() {
  lateinit var context: ReactApplicationContext
  lateinit var catalystInstance: CatalystInstance
  lateinit var themedContext: ThemedReactContext

  override fun starting(description: Description) {
    context = ReactApplicationContext(InstrumentationRegistry.getInstrumentation().targetContext)
    BpkTheme.applyDefaultsToContext(context)
    catalystInstance = ReactTestHelper.createMockCatalystInstance()
    context.initializeWithInstance(catalystInstance)
    themedContext = ThemedReactContext(context, context)
    super.starting(description)
  }
}
