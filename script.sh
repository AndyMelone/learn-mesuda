#!/bin/sh

yarn predeploy 
npx medusa user -e admin@medusajs.com -p supersecret
yarn dev