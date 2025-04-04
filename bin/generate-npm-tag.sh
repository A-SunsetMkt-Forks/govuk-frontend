#!/bin/sh
set -e

# Get highest tag published on Github
HIGHEST_PUBLISHED_VERSION=$(git tag --list 2>/dev/null | sort -V | tail -n1 2>/dev/null | sed 's/v//g')

# Extract tag version from ./packages/govuk-frontend/package.json
CURRENT_VERSION=$(npm run version --silent --workspace govuk-frontend)

version() { echo "$@" | awk -F. '{ printf("%d%03d%03d\n", $1,$2,$3); }'; }

if [ "$CURRENT_VERSION" = "$HIGHEST_PUBLISHED_VERSION" ]; then
  echo "⚠️ Git tag $TAG already exists. Check you have run \`npm version\` correctly."
  exit 1
elif echo "$CURRENT_VERSION" | grep -q "internal"; then
  NPM_TAG="internal"
elif echo "$CURRENT_VERSION" | grep -q "beta"; then
  NPM_TAG="next"
elif echo "$CURRENT_VERSION" | grep -q -E '^\d+\.\d+\.\d+-\D+(\.\d+)?$'; then
  echo "⚠️ Pre-releases with an identifier other than 'beta' or 'internal' are not allowed, therefore we will not generate an npm tag. Please check your current version."
  exit 1
elif [ $(version "$CURRENT_VERSION") -ge $(version "$HIGHEST_PUBLISHED_VERSION") ]; then
  NPM_TAG="latest"
else
  major_version_num=$(echo "$CURRENT_VERSION" | cut -d. -f1)
  NPM_TAG="latest-$major_version_num"
fi

echo "$NPM_TAG"
