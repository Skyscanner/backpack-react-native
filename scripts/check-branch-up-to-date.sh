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

git remote update 1> /dev/null && git status -uno | grep 'Your branch is behind' 1> /dev/null

# If "Your branch is behind" was found then we have a problem, 
# so we expect a "no lines found" exit code from grep  
if [ $? -ne 1 ]; then 
  exit 1;
fi