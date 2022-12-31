# Environmental Variables (Just for the purpose of submission)
PORT = 3000
ENV = dev

POSTGRES_HOST = 127.0.0.1

POSTGRES_DB = mowear
POSTGRES_USER = mowear_user
POSTGRES_PASSWORD = password123

POSTGRES_TEST_DB = mowear_test
POSTGRES_TEST_USER = mowear_test_user
POSTGRES_TEST_USER_PASSWORD = test123

BCRYPT_PASSWORD = udacity
SALT_ROUNDS = 10

TOKEN_SECRET = tokensecret12!

# Instructions
## 1. Setting up the databases
    1. Connect to the default postgres database as the defualt user
        - "psql -U postgres"
    2. Create users for development and testing
        - "CREATE USER mowear_user WITH PASSWORD password123;"
        - "CREATE USER mowear_test_user WITH PASSWORD test123;"
    3. Create development and testing databases
        - "CREATE DATABASE mowear;"
        - "CREATE DATABASE mowear_test;"
    4. Connect to the database and grant privileges to enable editing the databases by created users
        - For development database
            - "\c mowear"
            - "GRANT ALL PRIVILEGES ON DATABASE mowear TO mowear_user;"
        - For testing database
            - "\c mowear_test"
            - "GRANT ALL PRIVILEGES ON DATABASE mowear_test TO mowear_test_user;"
## 2. Setting up packages/environment
    1. run: "npm install" to download node_modules
    2. Create environmental variables according as instructed above

## 3. Using the app
    1. run: "db-migrate up" to create tables
    2. run: "npm run start" and start exploring endpoints
    3. run: "npm run test" to see the tests for the models and endpoints (38 successful specs)

# Attributions
- https://jwt.io/
- https://www.youtube.com/watch?v=mbsmsi7l3r4&ab_channel=WebDevSimplified
- https://stackoverflow.com/questions/4313323/how-to-change-owner-of-postgresql-database
- https://db-migrate.readthedocs.io/en/latest/Getting%20Started/commands/
- https://groups.google.com/g/jasmine-js/c/INma5VrV2Xs?pli=1