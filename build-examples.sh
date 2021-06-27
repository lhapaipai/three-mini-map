#!/bin/bash

DEPLOY_DIR=.netlify-examples

if [ -d $DEPLOY_DIR ]; then
  rm -rf $DEPLOY_DIR
fi

mkdir $DEPLOY_DIR

for DIR in examples/*; do
  cd "$DIR" || exit

  npm run build
  NAME=$(basename $DIR)
  cp -r "dist" "../../$DEPLOY_DIR/$NAME"
  cd ../..
done
