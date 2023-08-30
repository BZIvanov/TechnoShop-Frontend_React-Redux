# Marvelous Movies App API

## Environment variables

Environment variables are stored in .env files for each environment. Only one .env file is loaded depending on the provided NODE_ENV variable. There are also validations applied for the provided variables.

## Rate limiting

App wide 'throttle guard' is provided to control request rates. This avoids too many requests from one source in a short time, keeping the app responsive.
