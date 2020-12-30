# `load-balancer`

Main gateway for the project. Redirects all traffic to either frontend client's server or backend service. In addition to that, handles the shortened link's redirection, by fetching the redirection response directly from the backend's API.

_Note: routing to hosts is configured using docker-compose exposed service names instead of real host:port addresses. When running in a different environment, you need to make sure these names are available in your system._

## Exposed ports

- `80`

## Used services

- Frontend web clients:
  - `frontend-srv-1:8080`
  - `frontend-srv-2:8080`
- Backend services:
  - `backend-srv-1:3010`

## Available commands

None, use the provided Dockerfile to build images.
