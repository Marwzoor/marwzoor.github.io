#!/bin/sh
# This script deploys a subfolder to gh-pages
npm run build
git subtree push --prefix public origin gh-pages