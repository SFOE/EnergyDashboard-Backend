#!/usr/bin/env bash
tsc --build --clean
rm -rf dist
rm -rf functions/data-processing/dist
rm -rf functions/api/dist