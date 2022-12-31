# Scripts

    "npm run build": compiling typescript files
    "npm run prettier": running prettier
    "npm run lint": running eslint
    "npm run jasmine": running jasmine tests on built files
    "npm run test": building files, applying migrations, changing ENV, and running jasmine tests
    "npm run start": start server using nodemon
    "npm run start_": build server and run index.js


# Endpoints

## 1. Users
    GET "/users" (INDEX)
    GET "/users/:id" (SHOW)
    POST "/users" (CREATE)
    POST "/users/auth" (AUTHORIZE)
    PUT "/users/:id" (EDIT)
    DELETE "/users/:id" (DELETE)
## 2. Products
    GET "/products" (INDEX)
    GET "/products/:id" (SHOW)
    POST "/products" (CREATE)
## 3. Orders
    GET "/orders" (INDEX)
    GET "/orders/:id" (SHOW)
    POST "/orders" (CREATE)
    POST "/orders/:id/products" (ADD_PRODUCT)


# Data Schema

## Users
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    password VARCHAR

## Products
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    price INTEGER,
    category VARCHAR

## Orders
    id SERIAL PRIMARY KEY,
    status VARCHAR(64),
    user_id BIGINT REFERENCES users(id)

## Order-Products
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id BIGINT REFERENCES orders(id),
    product_id BIGINT REFERENCES products(id)