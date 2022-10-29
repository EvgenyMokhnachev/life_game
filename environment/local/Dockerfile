FROM node:19.0.0-alpine3.15

RUN npm install --global -y webpack webpack-cli mocha ts-node

WORKDIR /app

COPY ./environment/local/entrypoint.sh /entrypoint-copied.sh
RUN chmod +x /entrypoint-copied.sh
