FROM node:lts

WORKDIR /app
COPY / ./

COPY ./movies-entrypoint.sh /entrypoint.sh
COPY ["package.json","package-lock.json","/app/"]

EXPOSE 3050

RUN npm i babel-cli -g
RUN npm install
RUN chmod +x /entrypoint.sh

ENTRYPOINT /entrypoint.sh