FROM node:latest

WORKDIR /web

ENV PORT 80

COPY package.json ./

RUN npm install 

COPY src/ ./src/

CMD ["npm", "start"]