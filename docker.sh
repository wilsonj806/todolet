#!/bin/bash
if [ "$env" = "dev" ]
then
  echo this is dev &&
  npm run dev:client
elif [ "$env" = "staging" ]
then
  echo this is staging $env
  ## npm run staging:client && npm run staging:server
elif [ "$env" = "prod" ]
then
  # echo this is production $env
  npm run build:client && npm run build:server
fi