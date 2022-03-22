# Solution to exercise 3.

## Step 1
Copy `app` folder from exercise 2 to this exercise folder.

## Step 2
docker-compose.yaml:

```
services:
  api:
    build: .
    ports:
      - 8080:80
```

Run:

    docker-compose up -d --build

and verify that the API server is running (navigate to `http://localhost:8080/items`).

Run:

    docker-compose down

## Step 3
```
services:
  api:
    build: .
    ports:
      - 8080:80
    environment:
      - MYSQL_HOST=mysql
      - MYSQL_USER=root
      - MYSQL_PASSWORD=supersecret
      - MYSQL_DB=items
      
  mysql:
    image: mysql:5.7
    environment:
      - MYSQL_ROOT_PASSWORD=supersecret
      - MYSQL_DATABASE=items
    volumes:
      - mysql_db:/var/lib/mysql
  
volumes:
  mysql_db:  
```

## Step 4
```
services:
  api:
    build: .
    ports:
      - 8080:80
    environment:
      - MYSQL_HOST=mysql
      - MYSQL_USER=root
      - MYSQL_PASSWORD=mypassword
      - MYSQL_DB=items
    depends_on:
      - mysql
      
  mysql:
    image: mysql:5.7.36
    environment:
      - MYSQL_ROOTPASSWORD=mypassword
      - MYSQL_DATABASE=items
    volumes:
      - mysql_db:/var/lib/mysql
  
volumes:
  mysql_db:
```

## Step 5
docker exec -it CONTAINER_ID mysql -uroot -pmypassword 

mysql> use items
mysql> INSERT INTO todo_items (id, name, completed) VALUES (1, "foo", true);