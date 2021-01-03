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
package net.skyscanner.backpack.reactnative

import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class BpkViewStateHolderTest {

  private lateinit var subject: BpkViewStateHolder

  @Before
  fun setup() {
    subject = BpkViewStateHolder()
  }

  @Test
  fun test_mark_dirty() {
    subject.markDirty()
    assertTrue(subject.isDirty())
    assertFalse(subject.isInvalid())
  }

  @Test
  fun test_mark_invalid() {
    subject.markInvalid()
    assertTrue(subject.isInvalid())
    assertFalse(subject.isDirty())
  }

  @Test
  fun test_trigger_callbacks() {
    var calls = 0
    subject.onAfterUpdateTransaction {
      calls += 1
    }

    subject.dispatchUpdateTransactionFinished()
    assertEquals(0, calls)

    subject.markDirty()
    subject.dispatchUpdateTransactionFinished()
    subject.dispatchUpdateTransactionFinished()
    assertEquals(1, calls)

    subject.markInvalid()
    subject.dispatchUpdateTransactionFinished()
    subject.dispatchUpdateTransactionFinished()
    assertEquals(2, calls)
  }
}
