require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "react-native-bpk-component-dialog"
  s.version      = package['version']
  s.summary      = "Backpack dialog component for React Native"

  s.authors      = { "backpack" => "backpacksquad@skyscanner.net" }
  s.homepage     = "https://backpack.github.io/components/dialog?platform=ios"
  s.license      = "MIT"
  s.platform     = :ios, "11.0"

  s.source       = { :git => "https://github.com/Skyscanner/backpack-react-native.git" }
  s.source_files  = "src/ios/DialogBridge/**/*.{h,m}"

  s.dependency 'React'
  s.dependency 'Backpack', '~> 23.0'
end
