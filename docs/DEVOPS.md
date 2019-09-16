# Dev Ops
## Overview
An overview of DevOps and how it relates to this web app. It's arguably overkill to think about all of this as I'm the only developer working on the project, but in my opinion, it's good to think about how the app is going to be shared to other people, and deployed.

## What is DevOops
So I'm giving my definition of DevOps, other people have their own definitions, but I think mine is similar enough that it'd be fine.

So when you build software, in addition to performing well, your software needs to be able to achieve the below:
- easy to deploy/ install for the end user or whatever server it's going to live on
- easy to set up for other developers
- easy to safely upgrade/ integrate changes

DevOps seeks to standardize/ even automate some of these very simple but important points. It can be as simple as having good documentation for setup and upgrading, to having full blown CICD pipelines with Docker.

The core idea still stays the same though, software needs to be easy for everyone to work on, and should deploy/ install consitently.

## DevOps and this app
In the context of this app, most of the DevOps relevant ideas from automated tests. Here is implemented through TravisCI and a whole bunch of tests, but that's fairly simple to scale with integration tests.

In addition adding Docker might be overkill, but will be helpful to learn at some point anyways and would make deploying the app more consistent.