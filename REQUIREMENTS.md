## API Endpoints

#### Products

- getAllProducts [token required]
  - `/api/products/`
  - GET
- getProductsById [token required]
  - `/api/products/:id`
  - GET
- createProduct N[token required] -`/api/products/:id`

  - POST

- deleteProduct N[token required]
  - `/api/products/:id`
  - DELETE
- updateProduct N[token required]
  - `/api/products/:id`
  - POST UPDATE

#### Users

- Index [token required]

  - `/api/users/`
  - GET
  - {
    status: "Sucess",
    message: "Users returned Sucessfully",
    data: list of users
    }

- getById [token required]
  - `/api/users/:id`
  - GET
- createUser N[token required] -`/api/users/:id`

  - POST

- deleteUser N[token required]
  - `/api/users/:id`
  - DELETE
- updateUser N[token required]
  - `/api/users/:id`
  - PATCH
- authenticate N[token required]
  - `/api/authenticate`
  - POST

#### Orders

- getAllorders [token required]
  - `/api/orders/`
  - GET
- getordersByUserId [token required]
  - `/api/orders/users/:id`
  - GET
- getordersById [token required]
  - `/api/orders/:id`
  - GET
- updateOrder N[token required] -`/api/orders/:id`

  - POST

- deleteOrder N[token required]
  - `/api/orders/:id`
  - DELETE
- updateOrder N[token required]
  - `/api/orders/:id`
  - PATCH

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Data Schema

## User Table

CREATE TABLE users(
id SERIAL PRIMARY KEY,
first_name varchar(50) NOT NULL,
last_name varchar(50) NOT NULL,
password varchar(255) NOT NULL,
email varchar(50) UNIQUE
);

# Columns User Table

type User = {
id?: number; // Optional
first_name: string;
last_name: string;
password: string;
email: string;
};

                                      Table "public.users"
   Column   |          Type          | Collation | Nullable |              Default
------------+------------------------+-----------+----------+-----------------------------------
 id         | integer                |           | not null | nextval('users_id_seq'::regclass)
 first_name | character varying(50)  |           | not null | 
 last_name  | character varying(50)  |           | not null | 
 password   | character varying(255) |           | not null | 
 email      | character varying(50)  |           |          |

# Product table

CREATE TABLE products(
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
description VARCHAR(255),
price NUMERIC(17,2) NOT NULL,
category VARCHAR(50) NOT NULL
);

# Columns Product Table

type Product = {
id?: number,
name: string,
description: string,
price: number,
category: string

}

                                      Table "public.products"
   Column    |          Type          | Collation | Nullable |               Default
-------------+------------------------+-----------+----------+--------------------------------------
 id          | integer                |           | not null | nextval('products_id_seq'::regclass)
 name        | character varying(50)  |           | not null |
 description | character varying(255) |           |          |
 price       | numeric(17,2)          |           | not null |
 category    | character varying(50)  |           | not null |


# Order table

CREATE TABLE orders(
id serial PRIMARY KEY,
status varchar(50) NOT NULL,
user_id BIGINT REFERENCES users(id) NOT NULL
);

# Columns Order Table

type Order = {
id?: number; //Optional
status: string;
user_id: number;
};

                                    Table "public.orders"
 Column  |         Type          | Collation | Nullable |              Default
---------+-----------------------+-----------+----------+------------------------------------
 id      | integer               |           | not null | nextval('orders_id_seq'::regclass)
 status  | character varying(50) |           | not null |
 user_id | bigint                |           | not null |

# Order-Products table

CREATE TABLE order_products(
id SERIAL PRIMARY KEY,
quantity INTEGER NOT NULL,
order_id BIGINT REFERENCES orders(id) NOT NULL,
product_id BIGINT REFERENCES products(id) NOT NULL
);

# Columns Order-Products Table

type OrderProduct = {
id?: number;
quantity: number;
order_id: number;
product_id: number;
};

                             Table "public.order_products"
   Column   |  Type   | Collation | Nullable |                  Default
------------+---------+-----------+----------+--------------------------------------------
 id         | integer |           | not null | nextval('order_products_id_seq'::regclass)
 quantity   | integer |           |          |
 order_id   | bigint  |           | not null |
 product_id | bigint  |           | not null |