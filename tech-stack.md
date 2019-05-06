# Tech Stack

## General Summary

This doc describes technologies used for the project and the justification for said use. It will cover everything from frontend, to backend, to tooling, and devops type subjects.

## Tooling

#### TypeScript

Probably using it with the frontend code. Not sure if it's worth using on the backend.

In terms of applications for the backend, I could do some of the following:
- type checking middleware
- type aliasing database column values for an ORM
- ensuring that response objects are sent the same way everytime
- for use with `express-validator`, potentially easier implementation of a custom validator

#### Testing

Testing is probably mostly going to be on the frontend side as that's the only one I am familiar with(for now). In addition, we're using Create-React-App to bootstrap the project which means Jest comes installed already.

Jest is syntactically similar to Jasmine and builds off of Jasmine, so learning it shouldn't be too troublesome.

UI "testing" wise, probably going to run [Storybook](https://storybook.js.org/) to help develop components in isolation. Also has an addon that makes snapshot testing with Jest zippier.

### Frontend

React.js/ Redux. React because I've been using it for a while so I'll have a bunch of general components already made and ready to roll. Redux is being used because it allows for centralized state management(if done correctly) and a lot of companies use it in conjunction with React anyways.

Also using Material UI as at this point, I know enough React that there's no point reinventing the wheel with every project.

This also means learning JSS(JavaScript in CSS) since it comes with Material UI. First impressions-wise, it doesn't seem difficult to learn as it's straight CSS and several JSS API methods.

### Backend

#### Required Frameworks

Node.js/ Express.js and MongoDB/ Mongoose for the backend.

The app is fairly simple/ doesn't require heavy duty computations so Node/ Express is sufficient. Also the data is probably going to be fairly simple/ won't need heavy structuring, so MongoDB(a NoSQL database) makes the most sense.

Going to have to hook up Express to MongoDB somehow though, so that's where Mongoose comes in.

#### Additional Libraries

Since user profiles and logins will be involved, we'll need some form of authorization, so we'll use [**Passport.js**](http://www.passportjs.org/).

## Deployment

Deployment will probably use [**Heroku**](https://devcenter.heroku.com/articles/getting-started-with-nodejs). It's free-ish/ cheap and has plenty of documentation.

The project will also almost certainly use a hosted database since we can't just keep running it off of `localhost` forever. We'll probably be using [**mLab**](https://mlab.com/plans/pricing/#plan-type=sandbox) as there's a free plan available.