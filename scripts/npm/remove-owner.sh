#!/bin/sh
#
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
#
set -e

read -p "Username: " username
echo "Do you want to remove ${username} from the old packages (react-native-bpk-*) or the new single package (backpack-react-native)?"
read -p "Please pick an option (1/2):
[1] react-native-bpk-*
[2] backpack-react-native
" option

read -p "$option selected. Are you sure you want to remove $username (y/n)? " confirm

if [ "$confirm" != "y" ]; then
  echo "Ok bye. 💁"
  exit 0
fi

if [ $option == "1" ]; then
  for f in lib/*; do
    package=`basename $f`

    if [ "$f" != "lib/bpk-component-boilerplate" ] && [ -d "$f" ] && [ -e "$f/index.js" ]; then
      echo npm owner rm $username react-native-$package
    fi
  done
elif [ $option == "2" ]; then
  echo npm owner rm $username backpack-react-native
else
  echo "Invalid option"
  exit 1
fi

echo "Removed '$username'. Remember to remove them from meta.json.";
