# url-shortener

Original task description in [README.original.md](./README.original.md).

## Warning

**All of the provided configs & passwords (as seen in docker-compose & Makefile files) should NOT be used "as-is" in production. All of these are simple examples created & committed into this repository to show off basic use cases, and should be used only in local mode for testing purposes.**

## Usage (showcase)

_Available commands:_
- `[sudo] make setup`  
    Sets up the persistent Postgres's Docker volume in `.docker` directory
- `[sudo] make server`  
    Starts the entire app (including DB server, backend, frontend & load-balancer).  
    The app is being served on `localhost:8080`.
- `[sudo] make test`  
    Starts backend & frontend test runners in their respective containers.

All commands are marked with optional `sudo`, indicating that their underlying scripts require higher privileges to run Docker commands (or your user needs to be in the `docker` group on popular Linux-based distros).

## Local dev environment preparation

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

## Implementation details

- Shortened URLs (slugs) are generated as pseudo-random base64-ish strings of length 10. This gives 2^60 possible slugs, which is approx. 10^18 possible values, making it really unlikely that a collision will occur. That's why there's no link creation retry logic anywhere.
- Slugs de-duplication has been left out on purpose. First, it might be desireable by the users to generate different slugs for just one link (eg. for tracking purposes, assuming this project would be extended to support this kind of capability). Second, since the slugs values pool is so huge, there's no need to worry about running out of possible values (excluding malicious usage like DDoS attacks or bots, the security aspect should be handled separately).
