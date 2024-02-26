FROM node

WORKDIR /FSD_TEST/client
COPY package*.json ./

COPY ./src ./src
COPY ./public ./public

RUN npm install \
    && npm install -g serve \
    && npm run build

EXPOSE 3000

CMD [ "serve", "-s", "build" ]