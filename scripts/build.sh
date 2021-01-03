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

set -e

DEST=$1

if [ -z "$DEST" ]; then
  echo """
Usage:
  build [dest-folder]
"""

  exit 1
fi

if [ -d "$DEST" ]; then
  echo "Folder \"$DEST\" exits. Make sure that's the correct folder and remove it before proceeding"
  exit 1
fi


mkdir -p "$DEST"

cp -r lib/* lib/.npmignore "$DEST"

cp README.md CHANGELOG.md LICENSE dist
