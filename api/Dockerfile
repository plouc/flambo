# Flambo API
#

FROM node:7.6

LABEL description="Flambo API"

COPY ["./package.json", "./yarn.lock", "/data/"]

WORKDIR /data

RUN yarn install --prod

COPY ./src        /data/src
COPY ./conf       /data/conf
COPY ./migrations /data/migrations
COPY ./seeds      /data/seeds
COPY ./scripts    /data/scripts

COPY ["./index.js", "./knexfile.js", "./wrapper.sh", "/data/"]

RUN chmod +x wrapper.sh

CMD ["./wrapper.sh"]
