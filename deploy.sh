#!/bin/sh
# This script deploys a subfolder to gh-pages
git push origin `git subtree split --prefix public main`:gh-pages --force