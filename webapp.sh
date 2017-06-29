#!/bin/bash
git checkout $1
npm install
bower install
nvm use 5
npm run build

