# Exercise 1: Docker commands
In this exercise, you will use Docker commands to run and access an `nginx` web server.

## Steps
Execute the following steps to complete the exercise:

1. Start a new container, in _detached_ mode, using the following configuration:

- Image: `nginx`
- Name: `mywebserver`
- Container port: `80` 
- Host port: `8080`

Navigate to `http://localhost:8080` to verify that the web server is running.

2. Attach to the running container (using the `sh` command to get a shell).

3. Run the following to install the `curl` package _within the container_:

        apt-get update
        apt-get install curl

Run `curl` (again, _within the container_) to verify that the web server is running.

4. Make a change to the page that is returned by the web server. 

Nginx stores the page at `/usr/share/nginx/html/index.html`.

> Note: To edit the page, install `nano` - a (very) simple text editor. Then, open the page using the editor, make the change and save the file (Ctrl + X).

Verify that your changes to the page have been saved.

Exit the container (using the `exit` command).

Stop the `mywebserver` container and then start it again (using `docker start`); do the page changes remain?

5. When started, a container, by default, will attach to a default "bridge" network that is managed by Docker. Other containers may connect to it, either by name or via its IP address.

Run _and_ attach to a new container using the following configuration:

- Image: `ubuntu`
- Name: `mywebclient`
- Command: `sh`

Install the `iputils-ping` package (_within the container_).

Try pinging the web server, using the web server container's IP address.

> Note: To get the web server container's IP address, open a separate terminal, run `docker inspect` on the container and locate the address in the output.

Exit the `mywebclient` container (using the `exit` command).

6. Remove the `mywebclient` container and its associated image (`ubuntu`).

7. Remove the `mywebserver` container and its associated image (`nginx`).

> Note: Try removing the `nginx` image _before_ removing the container; does it work?