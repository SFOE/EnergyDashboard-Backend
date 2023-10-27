#!/usr/bin/env bash
# node modules layer
yarn install --production=true --modules-folder ./dist/node_modules/
mkdir -p dist/node-modules-layer/nodejs
mv dist/node_modules dist/node-modules-layer/nodejs/
# common layer
mkdir -p dist/common-layer/nodejs
mv dist/common/* dist/common-layer/nodejs/
# Copy to deployment folders
cp -r dist functions/data-processing/dist
cp -r dist functions/api/dist
cp -r dist functions/api/dashboard/dist
cp -r dist functions/api/gas/dist
cp -r dist functions/api/preise/dist
cp -r dist functions/api/strom/dist
cp -r dist functions/api/wetter/dist