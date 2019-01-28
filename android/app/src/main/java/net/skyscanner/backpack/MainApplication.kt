package net.skyscanner.backpack

import android.app.Application
import com.BV.LinearGradient.LinearGradientPackage
import com.airbnb.android.react.maps.MapsPackage
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.shell.MainReactPackage
import com.facebook.soloader.SoLoader
import net.skyscanner.backpack.reactnative.calendar.CalendarPackage
import java.util.Arrays

class MainApplication : Application(), ReactApplication {

    private val mReactNativeHost = object : ReactNativeHost(this) {
        override fun getUseDeveloperSupport(): Boolean {
            // Somehow build BuildConfig.DEBUG was being set to false
            // after the update to androidx and the latest backpack lib
            // which was causing the app not to boot. Since we only ever
            // use this app in debug mode there is no harm in setting this 
            // to always true. 
            return true
        }

        override fun getPackages(): List<ReactPackage> {
            return Arrays.asList(
                    MainReactPackage(),
                    MapsPackage(),
                    LinearGradientPackage(),
                    CalendarPackage()
            )
        }
    }

    override fun getReactNativeHost(): ReactNativeHost {
        return mReactNativeHost
    }

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, /* native exopackage */ false)
    }
}
