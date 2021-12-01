FROM node:latest

WORKDIR /app

ENV PORT 80

RUN apt-get update
RUN apt-get install python3
RUN apt-get install python-is-python3

COPY package.json ./
COPY src/ ./src/

RUN npm install 

CMD ["npm", "start"]