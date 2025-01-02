FROM node:20

WORKDIR /usr/src/course-platform 

COPY ./package.json .
RUN npm install --only=prod