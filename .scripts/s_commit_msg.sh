#!/bin/bash
REPO_DIR=$(git rev-parse --show-toplevel)
RED=$'\e[1;31m'
RESET=$'\e[0m'
FORMAT="^(chore|deps|docs|feat|fix|perf|refactor|style|test|release):[[:space:]].+$"
MESSAGE=$(cat $REPO_DIR/$1)

if [[ ! $MESSAGE =~ $FORMAT ]];
  then
    echo "${RED}The commmit message should follow the format:"
    echo "[type]: description"
    echo ""
    echo "[type]:"
    echo " - chore    : changes to auxillary tools"
    echo " - deps     : dependency updates"
    echo " - docs     : documentation only changes"
    echo " - feat     : new feature"
    echo " - fix      : bug fix"
    echo " - perf     : code changes that improves performance"
    echo " - refactor : code changes that neither introduces a new feature or fixes a bug"
    echo " - style    : code changes that do not affect the behavior of the application"
    echo " - test     : code changes that deals with tests${RESET}"
    exit 1
fi
