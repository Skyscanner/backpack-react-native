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

import kotlin.reflect.KClass
import org.hamcrest.BaseMatcher
import org.hamcrest.Description

class ThrowsMatcher<T, E : Throwable>(val kclass: KClass<E>) : BaseMatcher<T>() {
  private var lastExceptionThrown: Throwable? = null

  override fun describeTo(description: Description?) {
    description?.appendText("to throw ")?.appendText(kclass.java.canonicalName)
  }

  override fun describeMismatch(item: Any?, description: Description?) {
    if (lastExceptionThrown != null) {
      description?.appendText("was ")?.appendValue(lastExceptionThrown?.javaClass?.canonicalName)
    } else {
      description?.appendText("didn't")
    }
  }

  override fun matches(p: Any): Boolean {
    if (p is Function0<*>) {
      try {
        p.invoke()
      } catch (e: Throwable) {
        lastExceptionThrown = e
        return kclass.java.isAssignableFrom(e.javaClass)
      }
    }

    return false
  }
}

object Matchers {

  /**
   * Creates a matcher to assert a method throws an exception.
   *
   * Example:
   * ```kotlin
   * asssertThat({ someMethod() }, throws(SomeException::class))
   *```
   * @param kclass the exception class
   * @returns [ThrowsMatcher] a new matcher
   */
  fun <T, E : Throwable> throws(kclass: KClass<E>) = ThrowsMatcher<T, E>(kclass)
}
