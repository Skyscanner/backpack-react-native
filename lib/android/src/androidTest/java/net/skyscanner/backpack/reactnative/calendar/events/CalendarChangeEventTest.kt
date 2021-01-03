/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package net.skyscanner.backpack.reactnative.calendar.events

import androidx.test.ext.junit.runners.AndroidJUnit4
import com.facebook.react.bridge.Arguments
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.facebook.soloader.SoLoader
import io.mockk.mockk
import io.mockk.verify
import net.skyscanner.backpack.reactnative.testing.ReactContextTestRule
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.threeten.bp.LocalDate

@RunWith(AndroidJUnit4::class)
class CalendarChangeEventTest {

  @get:Rule
  val contextRule = ReactContextTestRule()

  @Before
  fun setUp() {
    SoLoader.init(contextRule.context, 0)
  }

  @Test
  fun test_dispatch_event() {
    val dates = arrayOf(
      LocalDate.of(2020, 3, 16),
      LocalDate.of(2020, 3, 20))
    val subject = CalendarChangeEvent(1, dates)

    val eventEmitter = mockk<RCTEventEmitter>(relaxed = true)
    subject.dispatch(eventEmitter)

    val expectedPayload = Arguments.createMap().apply {
      val datesArray = Arguments.createArray()
      datesArray.pushDouble(1584316800.toDouble())
      datesArray.pushDouble(1584662400.toDouble())
      this.putArray("selectedDates", datesArray)
    }

    verify { eventEmitter.receiveEvent(eq(1), eq("topChange"), eq(expectedPayload)) }
  }
}
