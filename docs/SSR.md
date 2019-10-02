# Server Side Rendering
## Overview
Ideally we'd have started the app by building everything for server-side rendering. That is not the case however, and this doc serves as planning for porting everything over.

## General Issues
Genearl issues related to porting everything over:
- No longer have the luxury of `react-scripts` to handle image assets and CSS
- No long have the convenience of building our app with the HTML template in the `public` directory

Re the first point: The above means we need to properly build an API route for serving static assets. In addition, we'll need some way to do that when we deploy the app.
- Heroku isn't recommended as they use ephemeral filesystem, which means you lose whatever's not on the slug whenever the dyno restarts
- This also happens to correspond with how we'd need to handle that issue when we deploy

Re the second point: This isn't nearly as bad, it's just slightly reconfiguring the app.

## Requirements to fix asset serving
Below are the requirements to fix how assets are served:
- we need to remove `react-scripts`
- we need to configure a static route
  - preferably put it in the routes directory
  - configure it to serve static assets, so pull everything from `client/public` and stick it into a static folder
- need to find a solution for serving static assets for deployment