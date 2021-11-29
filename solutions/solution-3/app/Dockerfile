FROM node:latest

WORKDIR /app

ENV PORT 80

RUN apt-get update
RUN apt-get install python3
RUN apt-get install python-is-python3

COPY package.json ./

RUN npm install 

COPY src/ ./src/

CMD ["npm", "start"]