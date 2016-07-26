FROM mhart/alpine-node:6.3

COPY api/package.json /flambo/

WORKDIR /flambo

RUN npm install -loglevel warn

CMD /bin/true