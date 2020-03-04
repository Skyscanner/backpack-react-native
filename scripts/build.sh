#!/bin/bash
# Backpack - Skyscanner's Design System
#
# Copyright 2018-2020 Skyscanner Ltd
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

cp -r src/* "$DEST"

# We move js packages up to the root folder so it can be imported direclty, e.g `backpack-react-native/bpk-component-button`
mv "$DEST"/js/* "$DEST"
rm -rf "$DEST"/js

# We link instead of copying because we want the version update to be applied
# to the $DEST folder as well.
#
# The release script will run `npm version <version>` in the root folder and
# then run `npm publish dist`
ln -s $PWD/package.json "$DEST"

cp README.md CHANGELOG.md LICENSE .npmignore dist
