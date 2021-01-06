################################################################################
FROM node:lts-alpine as deps-install

WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN npm ci

################################################################################
FROM deps-install as base-with-sources

COPY . .

################################################################################
FROM base-with-sources as build-app

RUN npm run build

################################################################################
FROM node:lts-alpine as final-image

WORKDIR /usr/app
COPY package.json package-lock.json ./
COPY --from=build-app /usr/app/build ./build
COPY --from=build-app /usr/app/scripts/run ./scripts/run
COPY --from=build-app /usr/app/node_modules ./node_modules
