# Dockerizing The App
## Overview
This doc goes over the various steps of dockerizing the application. Should be pretty self-explanatory.

## Common commands
Removing dangling images
```
  docker rmi $(docker images -f "dangling=true" -q)
```

## Setting up `.dockerignore
A .dockerignore file serves to tell Docker which files to not copy over to the container when we build it.

Rule of thumb is:
- logs/ runtime data
- version control assets and related files.
- anything that isn't a dependency for the application
- anything that can be generated or retrieved on run time
  - e.g node_modules, build, or dist directories
  - e.g .env files because you set that on a per environment basis

## Docker in staging, dev, and production
So Docker can be used in basically any environment, although there will be differences.

Production only needs the build files, static assets, basically the minimal number of assets required to run the the app.

Staging needs to run unit tests and eventually integration tests, so we'll need to run both the unoptimized build and the optimized build.

Development needs to be able to take advantage of Hot Module Reloading/ needs to be wicked fast.

## Setting up a minimal Dockerfile
A Dockerfile is basically the recipe to build the image for an app. For this app, we need multiple stages as we're compiling and minifying the code. While we could do it in one stage, and remove the unneeded files via gulp, it's faster to just plop the build files into a new image.

So below the bare minimum flow to Dockerize the app:
- Stage 1: set up
  - set working directory
  - copy all files to container
  - run `npm install`
  - run build scripts for **production**
- Stage 2: build production image
  - set working directory to a new directory
  - copy assets over
  - run npm install for the production environment
  - expose port 8080

## Docker Compose


## Docker during development


## TravisCI and Docker
TravisCI should not use **your** Dockerfile and the `.travis.yml` should be viewed as a different `docker-compose.yml` file.

In that respect, we should **not** try to cache Docker images within TravisCI itself.

Reference Github comments on the TravisCI repo:
- [comment 1](https://github.com/travis-ci/travis-ci/issues/5358#issuecomment-169694635)

What we can do is build the final Docker image for Heroku deploy and push it to their container registry. That'll make it so that our Heroku app no longer depends on the complicated build script in `package.json`

## Heroku and Docker
Recommend making a `heroku.yml` and removing the "heroku-prebuild" and "heroku-postbuild" scripts. Like the `.travis.yml` the `heroku.yml` acts similarly to a `docker-compose` file and builds the app using the Dockerfile. It also means we don't have to set up and orchestrate all of our database services, which is very important because we're starting to get a bit in over our heads.