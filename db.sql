--create db - CREATE DATABASE name;
--list db - \l
--connect to db - \c name
--list tables - \dt

CREATE DATABASE jwt_auth;

--download uuid extension
CREATE EXTENSION "uuid-ossp";

--create table with prisma
npx prisma generate 
npx prisma migrate dev

--create table with query
CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

INSERT INTO users (user_name, user_email, user_password) VALUES ('John', 'email@email.com', 'password');