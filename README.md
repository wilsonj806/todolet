# Another Todo App

## Status

[![GitHub tag (latest SemVer)](https://img.shields.io/github/tag/wilsonj806/another-todo.svg)](https://github.com/wilsonj806/another-todo)
![Current package.json version](https://img.shields.io/github/package-json/v/wilsonj806/another-todo.svg?label=current%20version)
![Top language](https://img.shields.io/github/languages/top/wilsonj806/another-todo.svg)

## General Description

Yet another Todo app, this app will be full stack and will be deployed. In addition, this app will include some extra features beyond the simple, "I added a task and clicked on it to complete it".

## Cloning Instructions

You'll need to have some version of Node.js(and subsequently npm, which is included) installed. Currently running everything on Node v10.10.0/ NPM v6.4.1 but it should work fine on older versions of Node/ NPM.
- if you do need to download Node, you can download it through the below links:
  - [Offical Node site](https://nodejs.org/en/download/)
  - [Node Version Manager Windows(requires more setup)](https://github.com/coreybutler/nvm-windows)
  - [Node Version Manager Mac(requires more setup)](https://github.com/creationix/nvm)

Clone the repo with your favorite SCM or manually download it
  ```
  git clone https://github.com/wilsonj806/speedy-dashboard.git
  ```

Change your working directory to the folder of the newly cloned repo and run ```npm install``` in your command line interface.

## Local Development

Before you start development, you'll need your own **local** `.env` file with the following properties:
  ```
    MONGODB_URI       : the URI for your MongoDB cluster
    MONGODB_URI_LOCAL : the URI for your local MongoDB cluster
    DBNAME            : the name of your database within the cluster
    DBNAME_LOCAL      : the name of your local database
  ```

### Using TypeScript

**NOTE** As this project uses a large amount of TypeScript, a code editor/ IDE with TypeScript/ TSLint support is **STRONGLY** recommended.
- Visual Studio/ Visual Studio Code is recommended, but Sublime, WebStorm, Eclipse and other editors support it as well
  - See the [official site](https://www.typescriptlang.org/index.html#download-links) for more
