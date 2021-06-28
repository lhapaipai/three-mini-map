#!/bin/bash

PWD=$(pwd)
if [ $(basename "$PWD") = "scripts" ]; then
  echo "run with script from root path (where your package.json is located)"
  exit
fi

for DIR in examples/*; do
  cd "$DIR" || exit
  npm run build
  cd ../..
done
