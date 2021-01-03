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

import com.facebook.react.bridge.CatalystInstance
import com.facebook.react.bridge.queue.MessageQueueThreadSpec
import com.facebook.react.bridge.queue.ReactQueueConfiguration
import com.facebook.react.bridge.queue.ReactQueueConfigurationImpl
import com.facebook.react.bridge.queue.ReactQueueConfigurationSpec
import com.facebook.react.uimanager.UIManagerModule
import io.mockk.every
import io.mockk.mockk

/**
 * Based on https://github.com/facebook/react-native/blob/master/ReactAndroid/src/test/java/com/facebook/react/bridge/ReactTestHelper.java
 */
object ReactTestHelper {
  /** @return a CatalystInstance mock that has a default working ReactQueueConfiguration.
   */
  fun createMockCatalystInstance(): CatalystInstance {
    val spec = ReactQueueConfigurationSpec.builder()
      .setJSQueueThreadSpec(MessageQueueThreadSpec.mainThreadSpec())
      .setNativeModulesQueueThreadSpec(MessageQueueThreadSpec.mainThreadSpec())
      .build()
    val ReactQueueConfiguration: ReactQueueConfiguration = ReactQueueConfigurationImpl.create(
      spec
    ) { e -> throw RuntimeException(e) }
    val reactInstance: CatalystInstance = mockk(relaxed = true)
    every { reactInstance.reactQueueConfiguration } returns ReactQueueConfiguration
    every { reactInstance.getNativeModule(UIManagerModule::class.java) } returns mockk(relaxed = true)
    return reactInstance
  }
}
