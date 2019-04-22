# Tech Stack

## General Description

## Front-end

React.js/ Redux. React because I've been using it for a while so I'll have a bunch of general components already made and ready to roll. Redux is being used because it allows for centralized state management(if done correctly) and a lot of companies use it in conjunction with React anyways.

## Back-end

Node.js/ Express.js and MongoDB for the back-end.

The app is fairly simple/ doesn't require heavy duty computations so Node/ Express is sufficient. Also the data is probably going to be fairly simple/ won't need heavy structuring, so MongoDB(a NoSQL database) makes the most sense.

Going to have to hook up Express to MongoDB somehow though, so that's where Mongoose comes in.

## Tooling

### TypeScript

Probably using it with the front-end code. Not sure if it's worth using on the back-end.

### Testing

Good question, Jest probably

UI "testing" wise, probably going to run [Storybook](https://storybook.js.org/) to help develop components in isolation. Also has an addon that makes snapshot testing with Jest zippier.
