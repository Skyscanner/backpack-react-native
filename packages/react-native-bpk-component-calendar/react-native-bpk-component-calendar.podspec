require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "react-native-bpk-component-calendar"
  s.version      = package['version']
  s.summary      = "Backpack calendar component for React Native"

  s.authors      = { "backpack" => "backpacksquad@skyscanner.net" }
  s.homepage     = "https://backpack.github.io/components/calendar?platform=ios"
  s.license      = "MIT"
  s.platform     = :ios, "10.0"

  s.source       = { :git => "https://github.com/Skyscanner/backpack-react-native.git" }
  s.source_files  = "src/ios/CalendarBridge/**/*.{h,m}"

  s.dependency 'React'
  s.dependency 'Backpack', '~> 6.1.0'
end
