FROM node:17-alpine3.14 as base

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

# docker build -t demo-multistage --target test .
FROM base as test
RUN npm ci
COPY *.js .
RUN npm run test

# docker build -t demo-multistage --target main .
FROM base as main
RUN npm ci --production
COPY index.js .

CMD node index.js
