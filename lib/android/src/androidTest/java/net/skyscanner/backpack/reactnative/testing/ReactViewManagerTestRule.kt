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
package net.skyscanner.backpack.reactnative.testing

import android.util.DisplayMetrics
import androidx.test.platform.app.InstrumentationRegistry
import com.facebook.react.bridge.CatalystInstance
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.DisplayMetricsHolder
import com.facebook.react.uimanager.ThemedReactContext
import kotlin.reflect.KClass
import net.skyscanner.backpack.util.BpkTheme
import org.junit.rules.TestWatcher
import org.junit.runner.Description

class ReactViewManagerTestRule<T : Any>(private val managerClass: KClass<T>) : TestWatcher() {
  lateinit var context: ReactApplicationContext
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
