# Exercise 3: docker-compose
In this exercise, you will use docker-compose to run multiple, connected containers in a local development environment.

## Steps

1. Copy the `app` folder from exercise 2 (containing your solution) to this exercise folder.

2. Create a `docker-compose.yaml` file in the exercise folder.

Add a service definition named `api` - based on the `app/Dockerfile` - and launch the single-service stack.

Verify that the API server is running.

Bring down the single-service stack.

3. Add a MySQL service named `mysql` to the stack with the following configuration:

- Image version: `5.7.36`

- Environment variables:

        MYSQL_ROOT_PASSWORD=mypassword
        MYSQL_DATABASE=items

> See [this page](https://docs.docker.com/compose/compose-file/compose-file-v3/#environment) for how to specify environment variables for a service.

- Volume: `mysql_db`, mapped to the container path `/var/lib/mysql`.

> See [this page](https://docs.docker.com/compose/compose-file/compose-file-v3/#volume-configuration-reference) for how to create a volume for a service.

> Note: You don't have to specify any port mapping for the `mysql` service, like you did for the `api` service; why is that?

Also add the following environment variables to the `api` service, allowing it to connect to the `mysql` service:

    MYSQL_HOST=mysql
    MYSQL_USER=root
    MYSQL_PASSWORD=mypassword
    MYSQL_DB=items

Finally, bring this multi-service stack up.

4. The `mysql` service takes somewhat longer to start up, compared to the `api` service.

If you bring up the stack and _quickly_ run `curl http://localhost:8080/items`, you might get the following response:

    curl: (52) Empty reply from server

Why is that?

One way of (potentially) solving this problem is make sure that the `api` service doesn't start _until_ the `mysql` service is running, using the `depends_on` [option](https://docs.docker.com/compose/compose-file/compose-file-v3/#depends_on).

> Note: Specifying this type of "service ordering" is not ideal - you should design and implement your service maximum fault tolerance; remember, in the cloud, everything is constantly changing and subject to failure!

5. For testing purposes, populate the database manually with an item; see the function `storeItem` in `src/persistence/mysql.js` for the SQL statement. 

The `mysql` container contains a MySQL client utility, which can be executed as follows:

        docker exec -it <MYSQL_CONTAINER_ID> mysql -uroot -pmypassword

> Note that `mypassword` must match whatever `MYSQL_ROOT_PASSWORD` is set to.

In the mysql prompt, type `use items` to switch to the items database.

Run the SQL INSERT statement (important: end the statement with a semicolon).

Verify that the API returns the item you've manually created.

### Scaling containers (optional)
Docker Compose creates one container per service by default. Sometimes you want to simulate having multiple containers running for a service, e.g. when testing if a service that is supposed to be _stateless_ is behaving correctly (and this is also more reminiscent of a production environment). 

In this part, you'll extend your `docker-compose.yaml` file:

- Add a service definition for the `web` service, which will accept client requests on port `8080`. 

- The `api` service is now hidden and instead accepts client requests from the `web` service; remove the host port from the `ports` mapping (why is this needed?).

- Ensure that any `api` container that crashes is automatically restarted (see [restart](https://docs.docker.com/compose/compose-file/compose-file-v3/#restart)).

- Create _two_ containers for the `api` service by default (see [replicas](https://docs.docker.com/compose/compose-file/compose-file-v3/#replicas)).

In the `app/src/index.js` file, add "middleware" for the `/items` route to log requests:

```
app.get('/items', (req, _res, next) => {
    console.log('Request path:', req.path);
    next();
}, getItems);
```

Bring the service stack up. Follow the logs for the `api` service. 

Then, test the following:

- Open the web browser and quickly (re)load `http://localhost:8080` several times; in the logs, you should see the corresponding requests load-balanced across both `api` containers.

- Crash one of the `api` containers via

        docker exec -it <api-container-name> kill 1

Run `docker ps` and verify that Docker has restarted the crashed container.
