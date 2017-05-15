FROM node:7.6

COPY ./package.json /data/package.json
COPY ./yarn.lock    /data/yarn.lock

WORKDIR /data

RUN yarn

COPY ./src             /data/src
COPY ./conf            /data/conf
COPY ./index.js        /data/index.js
COPY ./knexfile.js     /data/knexfile.js
COPY ./migrations      /data/migrations
COPY ./seeds           /data/seeds
COPY ./scripts         /data/scripts
COPY ./tests           /data/tests

COPY ./wrapper.sh  /data/wrapper.sh
RUN chmod +x wrapper.sh

CMD ["./wrapper.sh"]
