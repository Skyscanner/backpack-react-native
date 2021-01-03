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

import androidx.test.platform.app.InstrumentationRegistry
import com.facebook.react.bridge.CatalystInstance
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ThemedReactContext
import net.skyscanner.backpack.util.BpkTheme
import org.junit.rules.TestWatcher
import org.junit.runner.Description

class ReactContextTestRule : TestWatcher() {
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
