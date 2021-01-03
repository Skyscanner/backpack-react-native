#!/bin/bash

# Backpack - Skyscanner's Design System
#
# Copyright 2016-2021 Skyscanner Ltd
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

function waitUntil() {
	echo "🕙  Waiting $1 seconds for $2"
	sleep $1
}

function waitForEmulator() {
  if [ `ps aux | grep qemu | grep -v grep | grep -v $avd_name | wc -l` -gt 0 ]; then
    echo "More than one emulator running, cannot check if $avd_name boot is finished"
    echo "Waiting 15 seconds instead..."
    sleep 15
  else
    echo "🕙  Waiting for the emulator to boot.."
    secondsWaiting=0
    while [ "`adb shell getprop sys.boot_completed 2> /dev/null | tr -d '\r' `" != "1" ]; do 
      sleep 1; 
      secondsWaiting=$(( $secondsWaiting + 1 ))

      if [ $secondsWaiting -eq 20 ]; then
        echo "Emulator has not started after 20 seconds, giving up";
        exit 1
      fi
    done
  fi
}

avd_name="$1"
allow_multiple="$2"

if [[ "$avd_name" == "" ]]; then
  echo "
Usage:
  ./scripts/start_emulator.sh [avd-name] [options]

Options:
  --allow-multiple          Allow multiple emulators to be running at the same time.
"
  exit 1
fi

emulator=$ANDROID_SDK_ROOT/emulator/emulator

$emulator -list-avds | grep "$avd_name" > /dev/null

if [ $? -ne 0 ]; then
  echo "Avd ${avd_name} not found. Please follow CONTRIBUTION.md instructions to install it."
  exit 1
fi

if [[ ! $allow_multiple == "--allow-multiple" ]] && [ `ps aux | grep qemu | wc -l` -gt 2 ]; then
  echo "There are more than one emulator running, please close all other emulator and keep only $avd_name running."
  exit 1
fi

if [ `ps aux | grep qemu | grep $avd_name | wc -l` -eq 1 ]; then
  adb reconnect > /dev/null
  waitUntil 1 "the emulator to reconnect"
else
  echo "Emulator not running, trying to start $avd_name."
  $emulator -no-snapshot -no-boot-anim -avd $avd_name &

  if [ $? -ne 0 ]; then
    echo "Unable to start $avd_name";
    exit $?
  fi

  waitForEmulator
fi

echo "$avd_name is ready!"


