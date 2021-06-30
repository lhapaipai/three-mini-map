#!/bin/bash
DEPLOY_DIR=.netlify-examples

PWD=$(pwd)
if [ "$(basename "$PWD")" = "scripts" ]; then
  echo "run with script from root path (where your package.json is located)"
  exit
fi

if [ -d $DEPLOY_DIR ]; then
  rm -rf $DEPLOY_DIR
fi
mkdir $DEPLOY_DIR

for DIR in examples/*; do
  cd "$DIR" || exit
  npm run build
  cd ../..

  NAME=$(basename $DIR)
  cp -r "$DIR/dist" "$DEPLOY_DIR/$NAME"
done
