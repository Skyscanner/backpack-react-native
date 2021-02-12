package net.skyscanner.backpack

import android.content.res.Configuration
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.modules.i18nmanager.I18nUtil
import net.skyscanner.backpack.util.BpkTheme

class MainActivity : ReactActivity() {
    override fun onCreate(savedInstance: Bundle?) {
        super.onCreate(savedInstance)
        BpkTheme.applyDefaultsToContext(this)
        val sharedI18nUtilInstance = I18nUtil.getInstance()
        sharedI18nUtilInstance.allowRTL(this, true)
    }

  /**
   * This function has been added due to the following issue in react-native,
   * whereby the native Appearance implementation does not change the app when changing
   * from Dark Mode or Light Mode.
   * https://github.com/facebook/react-native/issues/28823
   * PR open since 2020: https://github.com/facebook/react-native/pull/29106
   */
    override fun onConfigurationChanged(newConfig: Configuration) {
        super.onConfigurationChanged(newConfig)
        getReactInstanceManager().onConfigurationChanged(this, newConfig)
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    override fun getMainComponentName(): String? {
        return "native"
    }
}
