# Docker Workshop
This repository contains the examples and exercises for the Edument Docker Workshop.

## Installation
Ensure that [Docker Desktop](https://www.docker.com/products/docker-desktop) is installed on your system.

## Overview
The examples include:

- `demo-dockerfile`

  A simple NodeJS application and associated Dockerfile for building a Docker image.

  In the demo folder, run:

      // build the image.
      docker build -t demo-dockerfile .

      // run a container (based on the built image).
      docker run -d -p 8080:8080 demo-dockerfile

      // test the server application running within the container.
      curl http://localhost:8080

- `demo-multistage`

  An example of how to introduce [_multiple build stages_](https://docs.docker.com/develop/develop-images/multistage-build/) in a Dockerfile.

  See the `Dockerfile` for how to run a specific stage.

- `demo-multistage-java`

  An example of a multistage build for a Java application.
  
  In order to create a production image that excludes intermediate build files (class files in the case of Java), the `Dockerfile` in this demo uses the `COPY --from=<stage>` flag to build the project and then select only the final JAR file for the production image.

  To create the test image (which also runs tests):

      docker build -t javamultistage-test --target test .

  To create the production image and run the application:

      docker build -t javamultistage-prod --target production .

      docker run javamultistage-prod 

- `demo-docker-compose`

  An example of how to "compose and run multiple application services" using `docker-compose`.

  In the demo folder, run:

      // start up the multiservice stack.
      docker-compose up -d --build

      // stop the multiservice stack.
      docker-compose down

### Exercises
See each exercise's description for what it entails; see the `solutions` folder for a step-by-step walkthrough on completing an exercise.

## Docker Hub Repositories
If you want to push an image to Docker Hub for public access, you'll first have to create a _repository_ (with public visibility) that will store the pushed image.

This [guide](https://docs.docker.com/docker-hub/) provides instructions for creating a repository; assuming Docker is installed on your machine, and you've built a Docker image named `<My Docker ID>/<Image_Name>` _and_ created a Docker Hub repository with the same name, run:

    docker push <My Docker ID>/<Image_Name>

## CI/CD with Github Actions
To automate the building and pushing of Docker images, you may set up a pipeline that executes these steps upon pushing changes to a source code repository, e.g. on Github.

Follow these instructions to set up such a pipeline using Github Actions and Docker Hub:

1. In Docker Hub, create a repository for your image (see the previous section "Docker Hub Repositories").

2. Go to your account and navigate to Account Settings -> Security and click New Access Token; enter a name for your access token (e.g. _github-pipeline_) and click "Generate". **Save the generated token for later use.**

3. Create an (empty) Github repository to host your application source code. 

    You may use the `demo-dockerfile` example as a simple application for this purpose, 
    
    Copy that folder's contents to a separare folder on your machine, and in that folder run:

        git init .
        git commit -a -m "Initial commit"
        
        // make sure you've added the corresponding Github repository as a remote.
        git push -u origin master

4. Once you've pushed the application source code to the Github repository, create the following _secrets_ by navigating to Settings -> Secrets and clicking "New repository secret":

        Name: DOCKER_HUB_USERNAME
        Value: <Your Docker ID>

        Name: DOCKER_HUB_ACCESS_TOKEN
        Value: <Your Generated Access Token>

5. Set up a workflow via Actions -> New workflow and selecting the suggested "Docker image" workflow.

6. Replace the default workflow content with the following:

```yaml
name: Docker Image CI

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:

  build:

    runs-on: ubuntu-latest

    steps:
    - name: Login to Docker Hub
      uses: docker/login-action@v1
      with:
        username: ${{ secrets.DOCKER_HUB_USERNAME }}
        password: ${{ secrets.DOCKER_HUB_ACCESS_TOKEN }}

    - uses: actions/checkout@v2
    - name: Build the Docker image
      run: docker build . --file Dockerfile --tag ${{ secrets.DOCKER_HUB_USERNAME }}/myimage:latest
    
    - name: Publish the Docker image
      run: docker push ${{ secrets.DOCKER_HUB_USERNAME }}/myimage
```

    __Note__: Replace `myimage` in the workflow above with the name you've chosen for your particular image.

    Finally, click Start commit -> Commit new file to create the `.github/workflow/docker-image.yml` file in the Github repository.

7. Make a change to the application code and push it to the Github repository; this will trigger a build of the Docker image. After a moment, your Docker Hub repository should have been updated with the new image.

## CI/CD with Gitlab
See the `demo-gitlab` folder for an example of a multistage Gitlab pipeline (for a NodeJS application).

## Container Orchestration with Kubernetes (K8)
Implementing container based applications typically involves the complex task of managing multiple containers; Kubernetes is a container orchestration platform that you can utilize for deploying and running your application.

The `demo-docker-k8` folder contains K8 YAML files for deploying a simple application and attaching a so-called _LoadBalancer_ service to allow for incoming traffic. 

If you e.g. have dockerized the `demo-dockerfile` and pushed the image (named `myapp` by default in the K8 files, change it to match the name of your image) to Docker Hub, you can launch containers based on that image in a Kubernetes cluster.

Setting up a cluster is beyond the scope of the Docker workshop, but see the Links section below for a tutorial on Kubernetes and how to work with K8 YAML files.

## Links
[Deploy a docker-compose application to AWS ECS](https://www.docker.com/blog/docker-compose-from-local-to-amazon-ecs/)

[Introduction to Kubernetes (by Marc Klefter)](https://youtu.be/ySCgpEI5y70)

## Contact 
Marc Klefter | marc.klefter@edument.se
