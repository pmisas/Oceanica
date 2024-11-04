-- Crear tabla 'Categoria' si no existe
CREATE TABLE IF NOT EXISTS categoria (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Crear tabla 'Producto' si no existe
CREATE TABLE IF NOT EXISTS producto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    image VARCHAR(255)
);

-- Crear tabla de relación 'producto_categoria' entre Producto y Categoria
CREATE TABLE IF NOT EXISTS producto_categoria (
    producto_id INT NOT NULL,
    categoria_id INT NOT NULL,
    PRIMARY KEY (producto_id, categoria_id),
    FOREIGN KEY (producto_id) REFERENCES producto(id),
    FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);

-- Crear tabla 'Usuario' si no existe
CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    correo VARCHAR(255) UNIQUE NOT NULL,
    hash_password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL
);

-- Crear tabla 'Pedido' si no existe
CREATE TABLE IF NOT EXISTS pedido (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    total DECIMAL(10, 2),
    direccion VARCHAR(255) NOT NULL,
    estado VARCHAR(50),
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

-- Crear tabla 'Item' si no existe
CREATE TABLE IF NOT EXISTS item (
    id SERIAL PRIMARY KEY,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    producto_id INT NOT NULL,
    pedido_id INT NOT NULL,
    FOREIGN KEY (producto_id) REFERENCES producto(id),
    FOREIGN KEY (pedido_id) REFERENCES pedido(id)
);

-- Insertar datos iniciales en la tabla 'Categoria'
INSERT INTO categoria (nombre) VALUES 
    ('playa'),
    ('ropa'),
    ('buceo'),
    ('piscina'),
    ('electrónica'),
    ('mantenimiento'),
    ('deporte');

-- Insertar datos iniciales en la tabla 'Producto'
INSERT INTO producto (nombre, precio, stock, descripcion, image) VALUES
    ('Traje de baño hombre', 240000, 100, 'Traje de baño hombre', 'c0c3a760-3ec4-49c0-9d35-fb9a9d454267_3.webp'),
    ('mascara de buceo', 150900, 50, 'Flotador seguro y cómodo para niños y adultos.', 'c0c3a760-3ec4-49c0-9d35-fb9a9d454267_3.webp'),
    ('Pistola mata tiburones', 450050, 30, 'Pistola pa matar tiburones en malpelo.', 'a0c849db-b98e-4d93-a472-9bfbcc400080_9.webp');

-- Relacionar productos y categorías en la tabla 'producto_categoria'
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES 
    (1, 2), -- Traje de baño -> Ropa
    (2, 3), -- Flotador -> Piscina
    (3, 3); -- Caña de pesca -> Deporte

-- Insertar datos iniciales en la tabla 'Usuario'
INSERT INTO usuario (correo, hash_password, rol) VALUES 
    ('admin@gmail.com', '$2a$10$6.szCTI2l81Oq1dqatocaO/TRdWaqtRiqtppz267oRGMGD1xWcem2', 'ADMIN'),
    ('user@gmail.com', '$2a$10$6.szCTI2l81Oq1dqatocaO/TRdWaqtRiqtppz267oRGMGD1xWcem2', 'USER');

-- Insertar datos iniciales en la tabla 'Pedido'
INSERT INTO pedido (fecha, total, direccion, estado, usuario_id) VALUES
    (CURRENT_DATE, 45.99, '123 Calle Mar, Ciudad', 'PENDIENTE', 2);

-- Insertar datos en la tabla 'Item' relacionados con el pedido y productos
INSERT INTO item (cantidad, precio_unitario, producto_id, pedido_id) VALUES
    (2, 29.99, 1, 1), -- 2 Trajes de baño en el pedido 1
    (1, 15.99, 2, 1); -- 1 Flotador en el pedido 1
