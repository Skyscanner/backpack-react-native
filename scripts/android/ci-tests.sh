#!/bin/bash

# Backpack - Skyscanner's Design System
#
# Copyright 2016-2020 Skyscanner Ltd
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

which gcloud > /dev/null

if [ $? -ne 0 ]; then
  echo "'gcloud' command not found in this machine."
  exit $?
fi;

app_path=./android/app/build/outputs/apk/debug/app-debug.apk
test_app_path=./lib/android/build/outputs/apk/androidTest/debug/backpack-react-native-debug-androidTest.apk

if [ ! -f $app_path ]; then
  echo "Couldn't find app build, ensure you have run \"./gradlew :app:assembleDebug\""
fi

if [ ! -f $test_app_path ]; then
  echo "Couldn't find test app build, ensure you have run \"./gradlew :backpack-react-native:assembleAndroidTest\""
fi

set -e

gcloud firebase test android run \
    --type instrumentation \
    --app $app_path \
    --test $test_app_path \
    --device model=blueline,version=28

