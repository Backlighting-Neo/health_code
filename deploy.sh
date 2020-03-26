cd server
yarn
cd ..
pm2 kill
pm2 start ts-node -- -P ./server/tsconfig.json ./server/src/index.ts

cd client_admin
yarn
yarn build
cd ../

cd client_user
yarn
yarn build
cd ../