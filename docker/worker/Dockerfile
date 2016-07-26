FROM mhart/alpine-node:6.3

RUN apk --no-cache add curl

RUN npm i -g nodemon

ADD entrypoint.sh /
RUN chmod +x entrypoint.sh

CMD ["/entrypoint.sh"]