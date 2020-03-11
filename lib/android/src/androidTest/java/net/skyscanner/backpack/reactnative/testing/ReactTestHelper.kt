package net.skyscanner.backpack.reactnative.testing

import com.facebook.react.bridge.CatalystInstance
import com.facebook.react.bridge.queue.MessageQueueThreadSpec
import com.facebook.react.bridge.queue.ReactQueueConfiguration
import com.facebook.react.bridge.queue.ReactQueueConfigurationImpl
import com.facebook.react.bridge.queue.ReactQueueConfigurationSpec
import com.facebook.react.uimanager.UIManagerModule
import org.mockito.Mockito.`when`
import org.mockito.Mockito.mock

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
    val reactInstance: CatalystInstance = mock(CatalystInstance::class.java)
    `when`(reactInstance.reactQueueConfiguration).thenReturn(ReactQueueConfiguration)
    `when`(reactInstance.getNativeModule(UIManagerModule::class.java))
      .thenReturn(mock(UIManagerModule::class.java))
    return reactInstance
  }
}
