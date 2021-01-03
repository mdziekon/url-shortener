# `backend`

Backend service of the project. Provides simple REST API for the shortener.

## Available NPM commands

- `build`  
    _Builds the service in ESM mode. Output files will be available in `/build` directory._
- `start`  
    _Starts the service in development mode via `ts-node`._
- `serve`  
    _Starts the built service via `node`, taking the sources from `/build` directory._
- `lint`  
    _Lints the codebase using ESLint & Prettier._
- `test`  
    _Runs all tests using Jest._
- `ci:lint`  
    _Same as `lint`, but prepared to be run in CI environment._
- `ci:test`  
    _Same as `test`, but prepared to be run in CI environment._
