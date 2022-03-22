# Exercise 2: Docker images
In this exercise, you will build and run your image for a NodeJS application.

## Steps
Execute the following steps to complete the exercise:

1. Create a `Dockerfile` in the `app` directory with the following configuration and order:

- Base image: `node:latest`

- Working directory: `app`

- Environment variable: `PORT 80`

- Source files (to copy):

      package.json
      src

> Note: A folder, such as `src`, is copied as `COPY folder/ ./folder/`

- Instruction to install package dependencies
- Instruction to run the `npm start`.

> _Note_: Before running these last two instructions, you'll _first_ need to run the following:
>
> RUN apt-get update
>
> RUN apt-get install python3
>
> RUN apt-get install python-is-python3

2. Build the image with the name `myapp`.

3. Start a new container based on the `myapp` image. 

Add one (or more) item(s) to the database via the application's REST API:

    curl -X POST -d '{"name":"foo"}' -H 'Content-Type: application/json' http://localhost:8080/items
    curl -X POST -d '{"name":"bar"}' -H 'Content-Type: application/json' http://localhost:8080/items

Verify that these items have been added.

4. Add a new endpoint to the REST API that allows getting an item via its ID:

- In `app/src/routes.js`, create and export a `getItem` function.

> Hint: Combine the logic in the `deleteItem` and `getItems` functions. Utilize the `db.getItem` function to retrieve an item from the database.

- In `app/src/index.js`, import the `getItem` function and add a route for it: `/items/:id`.

5. Rebuild the image.

6. Rerun the container.

> Note: You'll get an error when running the container again (why?). Fix the problem and rerun the container.

Test the `/items` endpoint first - do the previous items that you created in step 3 still exist?

Add one (or more) item(s) to the database again and verify that the new `/items/:id` endpoint works.

7. You probably noticed that when rebuilding the image in step 5, due to a small change in the application source code, it took a long time, with dependencies being fetched and built anew; remember that when a layer in an image changes, _all downstream layers have to be recreated as well_!

Change the Dockerfile (slightly) to ensure that we can reuse the cached layer with the dependencies.

8. You noticed in step 6 that any created items do not survive removal of the container.

In order to persist data _between_ container lifetimes, _volumes_ are needed. 

- Remove any running and/or stopped containers based on the `myapp` image.

- Create a volume to use with a container:

        docker volume create myapp-data

- Start a new container ("first"), with the following additional flag:

        -v myapp-data:/etc/myapp

- Add a few items, remove the container and start a _second_ container; verify that the REST API returns the items created with the _first_ container.

9. __OPTIONAL__ 

In addition to _named_ volumes, used in the previous step, Docker supports so-called _bind mounts_; this allows you control what host location to mount onto the target location in the container.

This can be useful in development mode, when you don't want rebuild the image every time you make a change to the application source code.

> Note: This assumes your application process is capable of restarting itself after file changes; in our case, the `nodemon` tool enables this for the application.

Run a new container, but this time _bind mount_ the `src` directory; the `-v` flag now looks as follows:

        -v $(pwd)/app/src:/<full container path>

Make a change to `src/routes.js` by adding a `console.log('in getItems)` statement inside the `getItems` function. Verify that the log now outputs the message upon getting items.

10. Clean up your system by removing all created containers and images.
