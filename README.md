![TodoLet Logo](./client/src/assets/Logo-Heading(720x266).png)
# TodoLet
## Status
[![GitHub tag (latest SemVer)](https://img.shields.io/github/tag/wilsonj806/todolet.svg)](https://github.com/wilsonj806/todolet)
![Current package.json version](https://img.shields.io/github/package-json/v/wilsonj806/todolet.svg?label=current%20version)
![Top language](https://img.shields.io/github/languages/top/wilsonj806/todolet.svg)
[![Travis CI for the project](https://img.shields.io/travis/wilsonj806/todolet.svg)](https://travis-ci.org/wilsonj806/todolet)
[![Coverage Status Master](https://coveralls.io/repos/github/wilsonj806/todolet/badge.svg?branch=master)](https://coveralls.io/github/wilsonj806/todolet?branch=master)


## General Description
Yet another Todo app, this app will be full stack and will be deployed. In addition, this app will include some extra features beyond the simple, "I added a task and clicked on it to complete it".

## Additional Docs/ Notes
- [Tech Stack Overview](./docs/TECHSTACK.md)
- [API Route Planning](./docs/routing.md)
- [Client-side State Planning](./docs/CLIENTSTATE.md)
- [App Deployment](./docs/DEPLOYMENT.md)
- [Testing](./docs/TESTING.md)
- [DevOps](./docs/DEVOPS.md)

## Currently Planned
Below is a rough "roadmap" of things to add. At this point, a lot of the below is out of scope of what I intended with the project, but are things worth learning/ doing.
```
  User Update/ Delete => SSR/ Docker => Todos API => Integration Tests/ Caching => Fin
```

A quick explanation:

1) Docker is overkill in a lot of ways, but gives for easier testing environments, and consistent app deployments. It's also really handy to know for jobs.

   Server-side rendering(SSR) is listed as the Heroku app is serving the entire thing. It's lumped with Docker as SSR will involve overhauling the entire app, and it's file structure. Will be pretty ugly.

2) Todos API is the other missing core functionality of the app. Pretty straight-forwards

3) Integration tests are definitely overkill, but if we have Docker up and running, we can make some quick integration tests to validate the app. Caching is arguably vital as there's a lot of repeated requests and if we're doing SSR, then caching should be relatively simple

## Cloning Instructions
You'll need to have some version of Node.js(and subsequently npm, which is included) installed. Currently running everything on Node v10.10.0/ NPM v6.4.1 but it should work fine on older versions of Node/ NPM.
- if you do need to download Node, you can download it through the below links:
  - [Offical Node site](https://nodejs.org/en/download/)
  - [Node Version Manager Windows(requires more setup)](https://github.com/coreybutler/nvm-windows)
  - [Node Version Manager Mac(requires more setup)](https://github.com/creationix/nvm)

Clone the repo with your favorite SCM or manually download it
  ```
    git clone https://github.com/wilsonj806/todolet.git
  ```

Change your working directory to the folder of the newly cloned repo and run ```npm install``` in your command line interface.

## Local Development
Before you start development, you'll need your own **local** `.env` file with the following properties:
  ```
    MONGODB_URI       : the URI for your MongoDB cluster
    MONGODB_URI_LOCAL : the URI for your local MongoDB cluster
    DBNAME            : the name of your database within the cluster
    DBNAME_LOCAL      : the name of your local database
    SECRET            : a string to establish the `express-session` with
  ```

In addition, you'll need some way to test and make complex requests to the API endpoints for the app. [Postman](https://www.getpostman.com/) is mostly what I use for the project, but other tools probably work just as well.

If you are using Postman, here's a link to the [Request Collection](https://www.getpostman.com/collections/aaeeff55faa8e026f8a5) that I use for the project.

To run the server once, use the below script:
```
  npm run start
```

To run the server with file monitoring, use the below script:
```
  npm run server
```

### Using TypeScript

**NOTE** As this project uses a large amount of TypeScript, a code editor/ IDE with TypeScript support is **STRONGLY** recommended.
- Visual Studio/ Visual Studio Code is recommended, but Sublime, WebStorm, Eclipse and other editors support it as well
  - See the [official site](https://www.typescriptlang.org/index.html#download-links) for more
