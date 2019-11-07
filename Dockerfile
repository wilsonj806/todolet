# Stage 1: Set up and build
FROM node:10-buster as dev-build

WORKDIR /src

COPY ./package-lock.json .
COPY ./package.json .

RUN npm ci

COPY . .

ARG env=dev

# Make the below conditional. If PROD then build
RUN chmod +x ./docker.sh && ./docker.sh
# RUN npm run build:client && npm run build:server
# ELSE run unit tests
# RUN npm run build:dev && npm run coverage
# THEN build app for staging
# RUN npm run staging:dev && npm run staging:client
# THEN tell Cypress to run E2E tests when we get there
# RUN cypress

# Stage 2 move build files
FROM node:10-buster-slim as prod-build

WORKDIR /app

COPY --from=dev-build /src/package.json .

RUN npm install --only=prod

COPY --from=dev-build /src/assets assets
COPY --from=dev-build /src/dist/app.bundle.js dist/app.bundle.js
COPY --from=dev-build /src/dist/server.bundle.js dist/server.bundle.js

RUN ls

EXPOSE 5000

CMD ["npm", "run", "start"]