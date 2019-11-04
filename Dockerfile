# Stage 1: Set up and build
FROM node:10-buster as dev-build

WORKDIR /src

COPY . ./

RUN npm install

RUN npm run build:client && npm run build:server

# Stage 2 move build files
FROM node:10-buster-slim

WORKDIR /app

COPY --from=dev-build /src/package.json .
COPY --from=dev-build /src/assets assets
COPY --from=dev-build /src/dist/app.bundle.js dist/app.bundle.js
COPY --from=dev-build /src/dist/server.bundle.js dist/server.bundle.js

RUN npm install --only=prod

EXPOSE 8080

CMD ["npm", "run", "start"]