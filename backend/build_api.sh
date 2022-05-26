#!/bin/bash
git pull origin development
npm i
npm run build
npm run start
pm2 restart lasyshop-api
