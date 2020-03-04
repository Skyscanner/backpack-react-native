#!/bin/bash

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

cp .npmignore package.json dist
