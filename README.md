# Marvelous Movies App API

## Environment variables

Environment variables are stored in .env files for each environment. Only one .env file is loaded depending on the provided NODE_ENV variable. There are also validations applied for the provided variables.

## Database

Before starting the application you must create the database server and databases for the different environments. Check the .env files for the naming of the databases for the different environments.

## Scripts

This application is using `npm`. If you want to run any of the commands you should run in the terminal the following script pattern:

```
npm run some-command-here
```

| commands                                                                     | short description                        |
| ---------------------------------------------------------------------------- | ---------------------------------------- |
| `typeorm`                                                                    | Used by the migrations commands          |
| `migration:generate -- src/config/migrations-config/migrations/SomeNameHere` | Generate new migration file              |
| `migration:run`                                                              | Apply the migrations on the database     |
| `migration:revert`                                                           | Revert the last applied migration        |

### More detailed scripts descriptions

- _typeorm_ - This command is used by the migrations commands. You don't need to run it separately manually
- _migration:generate -- src/config/migrations-config/migrations/SomeNameHere_ - Will generate new migration in the specified folder directory. Note that for this script we are additionally providing the directory of where to save the migration file
- _migration:run_ - will use the migration files to update the database
- _migration:revert_ - will revert the latest migration. The order is kept in the database in table called _migrations_, whichever is the latest will be reverted

## Rate limiting

App wide 'throttle guard' is provided to control request rates. This avoids too many requests from one source in a short time, keeping the app responsive.
