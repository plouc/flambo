FROM mhart/alpine-node:6.3

RUN apk --no-cache add curl

EXPOSE 3000

RUN npm i -g nodemon

ADD entrypoint.sh /
RUN chmod +x entrypoint.sh

CMD ["/entrypoint.sh"]