/* Replace with your SQL commands */
CREATE TABLE orders(
    id serial PRIMARY KEY,
    status varchar(50) NOT NULL,
    user_id BIGINT REFERENCES users(id) NOT NULL
);