#!/usr/bin/env bash
tsc --build --clean
rm -rf dist
rm -rf functions/data-processing/dist
rm -rf functions/api/dist
rm -rf functions/api/dashboard/dist
rm -rf functions/api/gas/dist
rm -rf functions/api/preise/dist
rm -rf functions/api/preise/dis
rm -rf functions/api/strom/dist
rm -rf functions/api/wetter/dist