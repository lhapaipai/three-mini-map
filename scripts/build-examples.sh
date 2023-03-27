#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR=$(dirname "$SCRIPT_DIR")

DEPLOY_DIR="$PROJECT_DIR/.netlify-examples"

if [ -d $DEPLOY_DIR ]; then
  rm -rf $DEPLOY_DIR
fi
mkdir $DEPLOY_DIR

for DIR in "$PROJECT_DIR"/examples/*; do
  cd "$DIR" || exit
  npm run build

  NAME=$(basename $DIR)
  cp -r "$DIR/dist" "$DEPLOY_DIR/$NAME"
done
