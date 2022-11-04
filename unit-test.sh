#!/bin/bash

if [ -z "$@" ]
then
    ./node.sh env TS_NODE_COMPILER_OPTIONS='{"module": "commonjs" }' mocha -r ts-node/register "/app/src/tests/**/*.ts"
else
    ./node.sh env TS_NODE_COMPILER_OPTIONS='{"module": "commonjs" }' mocha -r ts-node/register "/app/$@"
fi
