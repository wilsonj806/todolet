# Server Side Rendering
## Overview
Ideally we'd have started the app by building everything for server-side rendering. That is not the case however, and this doc serves as planning for porting everything over.

## General Issues
Genearl issues related to porting everything over:
- No longer have the luxury of `react-scripts` to handle image assets and CSS
- No long have the convenience of building our app with the HTML template in the `public` directory
- React Router needs adjustments to handle the routing from the server

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

## Notes
### React Router and SSR
Router Router lets you do a bunch of stuff with SSR, but does require several changes.

As we aren't sending static files from the server, we have to account for additional client requests like the below.
```json
{
  Request_URL: "http://localhost:5000/login",
  Request_Method: "GET",
  ...other headers
}

```

This means that we need to add React Router into our route for servering the front end code. For the most part that's pretty straight-forwards.

We'll also need to update out front end code to accomodate the above. Instead of rendering the React DOM, we're hydrating it.
- the reason is that our server is sending **static** markup up, so all we need to do is send and load the bundled JavaScript into the client

In addition, we need to ensure that React renders our Router **before** the app like so:
```js
ReactDOM.hydrate(
  (
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  )
),
document.getElementById('root')
```

This ensures that our Router is executed and "rendered" **before** the app.
- if we don't the app crashes with a "Browser Router history needs a DOM" error
  - presumably this because React Router is getting confused between what the server is rendering and what the client needs

### Redux and SSR
#### Overview
- [Redux && SSR(official docs)](https://redux.js.org/recipes/server-rendering)

Redux can be used alongside server side rendering as well. This lets us pre-fetch state *before* sending the app to the client.

More practically we can:
- load user data from the server into our server rendered app
- load session data from the server

Quick note, we use the global `window` object to load our data in, but that only exists in the browser so we'll need to mock it until it gets to the client.

#### Refactoring
Because we can do all of this stuff on the server side, we'll need to refactor how we handle data flow to take advantage of the server resources.

Currently our login flow looks like this:
```
  client: make a login request => server: validate request => server: respond to client with credentials => client: update state with credentials
```

We can refactor it to do the below
```
  client: make a login request => server: validate request => server: send markup with updated state and any required data => client: load new markup with updated state
```

This is especially helpful when we start adding the Todos API as without the above, our login flow looks like:
```
  client: make a login request => server: validate request => server: respond to client with credentials => client: update state with credentials
    => client: redirect => client: request Todos => server: fetch and send Todos => client: load Todos
```

So if we were to map this flow out as a middleware function chain we'd get:
- Validate credentials
- Save client credentials
- Determine what data needs fetching
- Send client markup with pre-fetched data

Determining what data needs to be fetched can be done in a lot of ways.