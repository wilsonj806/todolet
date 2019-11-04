# Dockerizing The App
## Overview
This doc goes over the various steps of dockerizing the application. Should be pretty self-explanatory.

## Common commands
Removing dangling images
```
  docker image rm $(docker images -f "dangling=true" -q)
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


## TravisCI and Docker


## Heroku and Docker