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

import kotlin.reflect.KProperty

private const val STATE_CLEAN = 0
private const val STATE_DIRTY = 1
private const val STATE_INVALID_INSTANCE = 2

/**
 * [BpkViewStateHolder] should be used by RN view wrappers to hold the view state
 * and react to view update transactions.
 *
 * Example:
 * ```Kotlin
 * class StateHolder: BpkViewStateHolder() {
 *   var title: String
 *    set(value) {
 *      field = value
 *      markDirty() // view should update in the next render transaction
 *    }
 * }
 *
 * class View(val stateHolder: BpkViewStateHolder) {
 *   init {
 *     stateHolder.onAfterUpdateTransaction(::render)
 *   }
 *
 *   render() {
 *      // this will only ever be called when the view is dirty and needs to re-render
 *      nativeView.title = stateHolder.title
 *      updateNativeView();
 *   }
 * }
 * ```
 */
open class BpkViewStateHolder {
  private var state = STATE_CLEAN
  private val callbacks = mutableSetOf<() -> Unit>()

  internal fun markDirty() {
    state = state or STATE_DIRTY
  }

  internal fun markInvalid() {
    state = state or STATE_INVALID_INSTANCE
  }

  fun isDirty() = state and STATE_DIRTY == STATE_DIRTY

  fun isInvalid() = state and STATE_INVALID_INSTANCE == STATE_INVALID_INSTANCE

  private fun shouldUpdate() = state != STATE_CLEAN

  private fun markClean() {
    state = STATE_CLEAN
  }

  fun onAfterUpdateTransaction(callback: () -> Unit) {
    callbacks.add(callback)
  }

  fun dispatchUpdateTransactionFinished() {
    if (shouldUpdate()) {
      callbacks.forEach { it.invoke() }
      markClean()
    }
  }

  companion object {
    class StateUpdaterDelegate<in R : BpkViewStateHolder, T>(
      initialVal: T,
      val onUpdate: (R) -> Unit
    ) {
      private var value: T = initialVal
      operator fun getValue(thisRef: R, property: KProperty<*>): T {
        return value
      }

      operator fun setValue(thisRef: R, property: KProperty<*>, newValue: T) {
        value = newValue
        onUpdate(thisRef)
      }
    }

    fun <R : BpkViewStateHolder, T> markDirtyOnUpdate(initialVal: T) =
      StateUpdaterDelegate<R, T>(initialVal) { it.markDirty() }

    fun <R : BpkViewStateHolder, T> markInvalidOnUpdate(initialVal: T) =
      StateUpdaterDelegate<R, T>(initialVal) { it.markInvalid() }
  }
}
