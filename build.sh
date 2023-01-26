#!/usr/bin/env bash
# node modules layer
yarn install --production=true --modules-folder ./dist/node_modules/
mkdir -p dist/node-modules-layer/nodejs
mv dist/node_modules dist/node-modules-layer/nodejs/
# common layer
mkdir -p dist/common-layer/nodejs
mv dist/common/* dist/common-layer/nodejs/
