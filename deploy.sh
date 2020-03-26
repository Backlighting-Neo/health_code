pm2 kill
pm2 start ts-node -- -P ./server/tsconfig.json ./server/src/index.ts

cd client_admin
yarn build
cd ../

cd client_user
yarn build
cd ../