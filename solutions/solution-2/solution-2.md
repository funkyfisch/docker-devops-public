# Solution to exercise 2.

## Step 1.
```
FROM node:latest

WORKDIR /app

ENV PORT 80

RUN apt-get update
RUN apt-get install python3
RUN apt-get install python-is-python3

COPY package.json ./
COPY src ./

RUN npm install 

CMD ["node", "src/index.js"]
```

## Step 2
docker build -t myapp .

## Step 3
docker run -d -p 8080:80 myapp

## Step 4.
```
// routes.js.

const getItem = async (req, res) => {
  const item = await db.getItem(req.params.id);
  res.send(item);
}

// ...

module.exports = {
  addItem,
  deleteItem,
  getItems,
  updateItem, 

  getItem // <==
}
```

```
// index.js

const {
    getItems,
    addItem,
    updateItem,
    deleteItem,

    getItem // <==
} = require('./routes');

// ...

app.get('/items/:id', getItem);
```

## Step 5
docker build -t myapp .

## Step 6
docker run -d -p 8080:80 myapp

docker stop name_or_id_of_existing_container
docker rm name_or_id_of_existing_container

## Step 7
```
FROM node:latest

WORKDIR /app

ENV PORT 80

RUN apt-get update
RUN apt-get install python3
RUN apt-get install python-is-python3

COPY package.json ./

RUN npm install 

# Move the copying of the source files to _after_ the dependencies.
COPY src/ ./src/

CMD ["npm", "start"]
```

## Step 8
docker run -d -p 8080:80 -v myapp-data:/etc/myapp myapp

## Step 9
docker run -d -p 8080:80 -v "$(pwd)/src:/app/src" myapp   