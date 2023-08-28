CREATE DATABASE cashback;

create type status_value as enum('person', 'admin');

CREATE TABLE users(
    id serial primary key,
    username varchar(20) not null,
    full_name varchar(32) not null,
    profession text not null,
    age integer not null,
    password text not null,
    balance integer not null,
    status status_value default 'person',
    created_at timestamp default current_timestamp
);


CREATE TABLE company(
    id serial primary key,
    name varchar(32) not null,
    balance integer not null,
    promocode varchar(30) not null,
    created_at timestamp default current_timestamp
);

CREATE TABLE promocode(
    id serial primary key,
    name varchar(32) not null,
    balance integer not null,
    created_at text not null,
    company_name  INT REFERENCES company(id), 
    owner_id integer references users(id)
);