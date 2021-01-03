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
FROM nginx:stable-alpine as final-image

COPY config/nginx/global.default.conf /etc/nginx/conf.d/default.conf

COPY --from=build-app /usr/app/build /usr/share/nginx/html
