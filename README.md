# Marvelous Movies App API

## Environment variables

Environment variables are stored in .env files for each environment. Only one .env file is loaded depending on the provided NODE_ENV variable. There are also validations applied for the provided variables.

## Database

Before starting the application for the first time you must create the database server and databases for the different environments. Check the .env files for the naming of the databases for the different environments. Check _Database Admin_ section below on how to create the server and the databases.

### Database Admin

You can access the postgres admin on the following url http://localhost:5050/

You can find the credentials to login in the docker-composer.yml file under app-database-admin service.

Follow the below steps to create your database server and databases after starting the Docker containers for first time (it should be the command _docker:dev-start_ in the scripts section).

1. Open PgAdmin in the web browser.
2. Right-click on Servers and select Register -> Server.
3. In the General tab of the Create - Server dialog give the server any name of your choice.
4. In the Connection tab, fill in the following details:
   - Host name/address: app-database (should match the service name in docker-compose.yml file)
   - Port: 5432
   - Database: postgres (this is the maintenance database)
   - Username: postgres
   - Password: postgres
5. Click Save to save the server configuration.
6. Now you can expand Servers and check your databases.
7. Right-click Databases, then Create -> Database to create a new database (check the .env files on how the databases for the different environments are named)
8. After the databases are created you will need to run the migrations, which are responsible for creating the database tables

### Database Migrations

All changes to the database related to the entities (creating/updating/removing tables, columns, etc...) are applied using the migrations.

You should run the migrations related scripts in the container's terminal, not in VS code's terminal. Check the _Scripts_ section for more info.

To apply to the database any newly created pending migrations, run the script command _migration:run_.

## Scripts

This application is using `npm`. If you want to run any of the commands you should run in the terminal the following script pattern:

```
npm run some-command-here
```

| commands                                                                     | short description                        |
| ---------------------------------------------------------------------------- | ---------------------------------------- |
| `test:watch`                                                                 | Run tests in watch mode                  |
| `typeorm`                                                                    | Used by the migrations commands          |
| `migration:generate -- src/config/migrations-config/migrations/SomeNameHere` | Generate new migration file              |
| `migration:run`                                                              | Apply the migrations on the database     |
| `migration:revert`                                                           | Revert the last applied migration        |
| `docker:dev-start`                                                           | Start the containers in development mode |
| `docker:dev-stop`                                                            | Stop the containers                      |
| `docker:prod-start`                                                          | Start the containers in production mode  |
| `docker:prod-stop`                                                           | Stop the containers                      |
| `docker:test`                                                                | Run the unit tests container             |
| `docker:test:e2e`                                                            | Run the e2e tests containers             |

### More detailed scripts descriptions

- _test:watch_ - Run this command in the container's terminal
- _typeorm_ - This command is used by the migrations commands. You don't need to run it separately manually
- _migration:generate -- src/config/migrations-config/migrations/SomeNameHere_ - Will generate new migration in the specified folder directory. Note that for this script we are additionally providing the directory of where to save the migration file. Check the _Database Migrations_ section in this file for more info for the migrations
- _migration:run_ - will use the migration files to update the database
- _migration:revert_ - will revert the latest migration. The order is kept in the database in table called _migrations_, whichever is the latest will be reverted
- _docker:dev-start_ - Start the docker containers in development mode. _app-movies_ service will target _devenv_ stage in the Dockerfile
- _docker:dev-stop_ - Stop the docker containers
- _docker:prod-start_ - Start the docker containers in production mode. Additional _production.yml_ file is used to overrirde the stage _devenv_ with _prodenv_. In the Dockerfile for _prodenv_ stage we will then set NODE_ENV to production
- _docker:prod-stop_ - Stop the docker containers
- _docker:test_ - Run the unit tests container. Separate _docker-compose.test.yml_ file is used for the unit tests, because we don't want to also start the database and pgadmin containers. All database operations are mocked in the tests
- _docker:test:e2e_ - Run the e2e tests containers. Additional _test-e2e.yml_ file is used for the e2e tests to override the stage in _docker-compose.yml_ file. Additional flag _--exit-code-from_ is applied to close stop the containers are the tests are finished

## Rate limiting

App wide 'throttle guard' is provided to control request rates. This avoids too many requests from one source in a short time, keeping the app responsive.

## Additional notes

1. `watchOptions` was added to the file `tsconfig.json` to make the hot reloading working with docker containers. Without it the local files changes are applied to the files in the container, but application still uses the old code.
