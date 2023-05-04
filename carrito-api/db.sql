CREATE DATABASE carrito; 

CREATE TABLE productos(
  id SERIAL PRIMARY KEY NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  des TEXT NOT NULL,
  imagen TEXT NOT NULL,
  precio DECIMAL(10,2) NOT NULL
);

INSERT INTO productos (nombre, des, imagen, precio)
VALUES ( 'auto 1', 'Mi descripción', 'http://localhost:4000/cadilla.png', 1000);

DELETE FROM productos; 