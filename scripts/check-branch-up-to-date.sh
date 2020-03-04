#!/bin/bash

git remote update 1> /dev/null && git status -uno | grep 'Your branch is behind' 1> /dev/null

# If "Your branch is behind" was found then we have a problem, 
# so we expect a "no lines found" exit code from grep  
if [ $? -ne 1 ]; then 
  exit 1;
fi