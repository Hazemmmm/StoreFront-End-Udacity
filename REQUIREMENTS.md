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
