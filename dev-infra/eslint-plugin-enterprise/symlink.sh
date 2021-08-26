#!/bin/bash

PACKAGE_NAME="eslint-plugin-enterprise";

echo "[INFO]: starting create symlink..."
mkdir -p ../../node_modules/@angular-ru/
cd ../../node_modules/@angular-ru/ || echo 'not exist ./node_modules/@angular-ru'

if [ -d "../../dev-infra/$PACKAGE_NAME/lib" ]
then
    echo "[INFO]: Directory ../../dev-infra/$PACKAGE_NAME/lib exists."
    rm -rf "$PACKAGE_NAME"
    ln -s -f "../../dev-infra/$PACKAGE_NAME" "$PACKAGE_NAME"
    echo '[INFO]: created symlink'
else
    echo "[ERROR]: Directory ../../dev-infra/$PACKAGE_NAME/lib does not exists"
    echo "skip create symlink, please run 'yarn lerna run build:lib --scope=@angular-ru/$PACKAGE_NAME' before"
fi
