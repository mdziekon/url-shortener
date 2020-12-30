# url-shortener

## Warning

**All of the provided configs & passwords (as seen in docker-compose & Makefile files) should NOT be used "as-is" in production. All of these are simple examples created & commited into this repository to show off basic use cases, and should be used only in local mode for testing purposes.**

## Installation

### _Ubuntu 20.04 LTS_

1. Install [Docker](https://docs.docker.com/engine/install/ubuntu/) & [docker-compose](https://docs.docker.com/compose/install/)
1. Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
1. Install proper version of node (`lts/*`):  
    ```bash
    nvm install
    ```
1. Install `lerna` globally:  
    ```bash
    npm install -g lerna
    ```
1. Bootstrap all services:  
    ```bash
    lerna run bootstrap
    ```

## Services

- `backend`  
    _Main backend service exposing simple REST API. Takes care of the links shortening & persists them in a Postgres DB (currently no other adapters are available)._
- `frontend`  
    _Main frontend client served as a web app._
- `load-balancer`  
    _Main gateway, responsible for all traffic routing. Handles the shortened link redirection._
