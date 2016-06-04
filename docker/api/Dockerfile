FROM node:6

EXPOSE 3000

RUN npm i -g nodemon

ADD entrypoint.sh /
RUN chmod +x entrypoint.sh

CMD ["/entrypoint.sh"]