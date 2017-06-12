# Flambo BOT
#

FROM node:7.6

LABEL description="Flambo BOT"

COPY ["./package.json", "./yarn.lock", "/data/"]

WORKDIR /data

RUN yarn install --prod

COPY ./scripts /data/scripts

CMD ["./node_modules/.bin/hubot", "--name", "flambo"]
