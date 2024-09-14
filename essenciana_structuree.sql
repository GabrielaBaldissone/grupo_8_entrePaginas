DROP DATABASE IF EXISTS Essenciana;
CREATE DATABASE Essenciana;

USE Essenciana;

-- Tabla usuarios
CREATE TABLE users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50),
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'cliente') NOT NULL DEFAULT 'cliente'
);

-- Tabla categorías
CREATE TABLE categories (
    id_category INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255) NOT NULL
);

-- Tabla productos
CREATE TABLE products (
    id_product INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    image LONGBLOB,
    description TEXT,
    id_category INT,
    FOREIGN KEY (id_category) REFERENCES categories(id_category)
);

-- Tabla órdenes
CREATE TABLE orders (
    id_order INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

-- Tabla productos en las órdenes
CREATE TABLE order_product (
    id_order_product INT AUTO_INCREMENT PRIMARY KEY,
    id_order INT,
    id_product INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_order) REFERENCES orders(id_order),
    FOREIGN KEY (id_product) REFERENCES products(id_product)
);