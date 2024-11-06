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
    ('electronica'),
    ('mantenimiento'),
    ('deporte');

-- Insertar datos iniciales en la tabla 'Producto'
INSERT INTO producto (nombre, precio, stock, descripcion, image) VALUES
    ('Gafas Biofuse 2.0 Adulto Femenino', 289900, 50, 'En Speedo te presentamos la nueva colección de gafas de natación diseñada específicamente para rostros femeninos, incorporando nuestra tecnología Speedo Biofuse®. Las nuevas Gafas Biofuse 2.0 Adulto Femenino ofrecen lo último en comodidad, su sello flexible súper suave ofrece una mayor flexibilidad para un ajuste aún más suave y acolchado alrededor del ojo. Diseñadas con materiales blandos.', '545dd707-83b9-4cb8-a442-d793a8cdc10f_1.webp'),
    ('Set Esnórquel Junior Premium', 407390, 100, 'Sólido, sencillo y robusto. Nuestro Set de Esnórquel JR Premium es el kit perfecto para los jóvenes buceadores. La máscara de buceo tiene resistentes lentes de cristal templado para una visión de alta definición y cómodas juntas de silicona para un ajuste hermético. El tubo de buceo de montaje lateral es fácil de usar y tiene una boquilla ligera para que no haya fatiga.', '0f0c12c8-8d30-4189-a70f-f9fb600bafa4_15.webp'),
    ('Chaleco Salvavidas De Seguridad Para Adultos', 170000, 150, 'exterior de neopreno y relleno de espuma flotante para una máxima comodidad. Cierre con cremallera lateral y 2 cinturones ajustables para un ajuste seguro. Dos grandes sisas permiten una movilidad total y son fáciles de poner y quitar. Excelente chaleco salvavidas de seguridad para deportes acuáticos, como nadar, surfear, navegar o hacer esnórquel.', '2d9e5707-51d3-408c-8eb2-d86421a9e2f9_4.webp'),
    ('Calcetines antideslizantes para piscina', 82000, 172, 'Buscas un accesorio discreto y elegante para tus sesiones de «aquaeróbic», «aquarunning» u otros ejercicios subacuáticos? ¡Eureka! Nuestros calcetines Pool Grip Socks serán tus mejores aliados en cualquier actividad en la que tus pies estén en contacto constante con el fondo de la piscina. Estos cómodos calcetines, fabricados con neopreno elástico.', '7f9b2abb-c626-4617-9e70-9aa48f52efed_16.webp'),
    ('Aletas niños', 165850, 23, 'e¿Tu joven atleta quiere dar patadas más rápidas y fuertes? Nuestras aleta para niños son perfectas para enseñarles a mejorar su técnica. Diseñadas con el talón abierto, son fáciles de poner y dejan los tobillos libres para moverse. Están fabricadas con un material suave para que tu deportista esté totalmente cómodo cuando pruebe esta herramienta de entrenamiento.', '9b0eaa18-a187-4278-8e6f-ed684d736b46_13.webp'),
    ('Bañador Mujer One Next', 260900, 7, 'nuestro bañador One Next tiene el aspecto de un bikini. Confeccionado artísticamente a partir de una sola pieza de tejido, este traje de baño único de una pieza se ajusta a la perfección. Está cortado con un escote alto y una generosa abertura que deja al descubierto la espalda y la cintura delantera. Perfectamente acabado con un ribete en contraste.', '67cea94e-5d84-46bb-8904-b0eb58172b32_2.webp'),
    ('Bomba Filtro Piscina Estructural Intex Bestway 5678 Lit/hora', 370900, 15, 'La bomba Bestway 344323te garantizará que tu pileta cumpla con las condiciones de higiene adecuadas. El movimiento que ejercerá sobre el agua contenida, facilitará la desinfección y filtrado de suciedad y residuos. ¡Disfrutarás de chapuzones placenteros, sumergido en gotas de cristal!.', '82f5f71c-50eb-46a0-8359-fdac173c52ed_11.webp'),
    ('Traje De Buceo Superelástico For Hombre', 350700, 8, 'raje de neopreno Traje de neopreno de cuerpo completo Traje de neopreno de una pieza. Cremallera trasera para ponerlo y quitarlo fácilmente, el traje de baño de longitud completa ofrece protección para todo el cuerpo. Antipinchazos proporciona la mejor protección y protege contra rasguños y picaduras. Estirable, con protección UV y te hace sentir cómodo.', '245f9896-5707-46c9-8ab6-5f375e2da485_8.webp'),
    ('Boya de natación para aguas abiertas 17 L', 172850, 121, 'Nuestra Boya de Natación está diseñada para disfrutar con total seguridad de la natación y el triatlón en aguas abiertas. Su combinación de naranja y amarillo se ve fácilmente en todo momento.', '651df4da-e4b3-4ccf-bfb4-d2bee77daf25_14.webp'),
    ('Goyojo Mini Tanque De Buceo De 0,5 Litros, 5-10 Minutos', 679700, 5, 'Botella de oxígeno de buceo portátil: sumergible en aproximadamente 5 ~ 10 minutos, para que un adulto respire en la superficie aproximadamente 66 aire por la boca, la profundidad bajo el agua varía, el uso del tiempo también variará, instrumento luminoso, resistencia a la profundidad, 80 metros bajo el agua todavía son claramente visibles', 'b50adef5-24a8-44c7-b655-51c2d2c013ec_10.webp'),
    ('Short Hombre Airbrush Graphic', 197500, 12, 'Con reminiscencias del diseño de los 80 y las camisetas personalizadas, nuestro bañador corto Airbrush Graphic para hombre lleva nuestro nombre en una pernera. Cortado con nuestro superlativo tejido MaxLife Eco fabricado con materiales parcialmente reciclados, este bañador aguanta horas de entrenamiento competitivo sin esfuerzo.', 'c0c3a760-3ec4-49c0-9d35-fb9a9d454267_3.webp'),
    ('Gorro natación HD', 48200, 34, 'Muestra tu sentido del humor incluso durante la práctica de natación llevando uno de nuestros gorros HD. Impreso con imágenes de gran realismo, este gorro de piscina es una alternativa divertida al gorro normal. Fabricado con una silicona especial que no se sube mientras nadas, su elegante superficie garantiza un rendimiento hidrodinámico y protege tu pelo del cloro.', 'c8d15a9c-5139-470a-a7c6-4ffdb612e8db_12.webp'),
    ('Chaleco Salvavidas De Seguridad Para Adultos', 750000, 9, 'El Bote Inflable Intex 58330 Explorer 200 es la opción perfecta para disfrutar de días de verano relajados en aguas tranquilas. Diseñado con materiales duraderos y características convenientes, este bote te brinda la libertad de explorar y divertirte en el agua con total seguridad.', 'dbc46c69-d5ce-4dcc-b9fc-4d9dec2b7bb9_5.webp');

-- Relacionar productos y categorías en la tabla 'producto_categoria'
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES 
    (1, 4), 
    (1, 7), 
    (2, 1), 
    (2, 3),
    (3, 7), 
    (3, 1), 
    (4, 2), 
    (4, 4), 
    (5, 7), 
    (5, 2), 
    (6, 4), 
    (6, 2), 
    (7, 6), 
    (8, 2), 
    (8, 3), 
    (9, 1),
    (10, 3),
    (11, 2),
    (11, 4),
    (12, 2),
    (12, 3),
    (13, 1),
    (13, 7);

-- Insertar datos iniciales en la tabla 'Usuario'
INSERT INTO usuario (correo, hash_password, rol) VALUES 
    ('admin@gmail.com', '$2a$10$6.szCTI2l81Oq1dqatocaO/TRdWaqtRiqtppz267oRGMGD1xWcem2', 'ADMIN'),
    ('user@gmail.com', '$2a$10$6.szCTI2l81Oq1dqatocaO/TRdWaqtRiqtppz267oRGMGD1xWcem2', 'USER');

-- Insertar datos iniciales en la tabla 'Pedido'
INSERT INTO pedido (fecha, total, direccion, estado, usuario_id) VALUES
    (CURRENT_DATE, 648600, '123 Calle Mar, Ciudad', 'PENDIENTE', null),
    (CURRENT_DATE, 489390, '456 Calle del Agua, Ciudad', 'PENDIENTE', 2), -- Pedido 2
    (CURRENT_DATE, 501700, '789 Avenida del Sol, Ciudad', 'PENDIENTE', null), -- Pedido 3
    (CURRENT_DATE, 1100700, '321 Calle de la Luna, Ciudad', 'PENDIENTE', null), -- Pedido 4
    (CURRENT_DATE, 950700, '654 Calle del Mar, Ciudad', 'PENDIENTE', null), -- Pedido 5
    (CURRENT_DATE, 640700, '987 Avenida de la Tierra, Ciudad', 'PENDIENTE', null); -- Pedido 6

-- Insertar datos en la tabla 'Item' relacionados con el pedido y productos
INSERT INTO item (cantidad, precio_unitario, producto_id, pedido_id) VALUES
    (1, 260900, 6, 1), -- 1 Trajes de baño en el pedido 1
    (2, 48900, 12, 1), -- 2 gorro en el pedido 1
    (1, 289900, 1, 1); -- 1 gafas en el pedido 1

    -- Pedido 2
INSERT INTO item (cantidad, precio_unitario, producto_id, pedido_id) VALUES
    (1, 407390, 2, 2), -- 1 Set Esnórquel Junior Premium en el pedido 2
    (1, 82000, 4, 2);  -- 1 Calcetines antideslizantes para piscina en el pedido 2

-- Pedido 3
INSERT INTO item (cantidad, precio_unitario, producto_id, pedido_id) VALUES
    (1, 170000, 3, 3), -- 1 Chaleco Salvavidas De Seguridad Para Adultos en el pedido 3
    (2, 165850, 5, 3);  -- 2 Aletas niños en el pedido 3

-- Pedido 4
INSERT INTO item (cantidad, precio_unitario, producto_id, pedido_id) VALUES
    (1, 350700, 8, 4), -- 1 Traje De Buceo Superelástico For Hombre en el pedido 4
    (1, 750000, 11, 4); -- 1 Chaleco Salvavidas De Seguridad Para Adultos en el pedido 4

-- Pedido 5
INSERT INTO item (cantidad, precio_unitario, producto_id, pedido_id) VALUES
    (1, 370900, 7, 5), -- 1 Bomba Filtro Piscina Estructural Intex Bestway en el pedido 5
    (2, 289900, 1, 5);  -- 2 Gafas Biofuse 2.0 Adulto Femenino en el pedido 5

-- Pedido 6
INSERT INTO item (cantidad, precio_unitario, producto_id, pedido_id) VALUES
    (3, 197500, 10, 6), -- 3 Short Hombre Airbrush Graphic en el pedido 6
    (1, 48200, 13, 6);  -- 1 Gorro natación HD en el pedido 6

-- Insertar el nuevo pedido en la tabla 'Pedido'
INSERT INTO pedido (fecha, total, direccion, estado, usuario_id) VALUES
    (CURRENT_DATE, 2362940, '159 Calle Oceánica, Ciudad', 'PENDIENTE', null);

-- Insertar los productos en la tabla 'Item' relacionados con el Pedido 7
INSERT INTO item (cantidad, precio_unitario, producto_id, pedido_id) VALUES
    (2, 289900, 1, 7), -- Gafas Biofuse 2.0 Adulto Femenino
    (1, 407390, 2, 7), -- Set Esnórquel Junior Premium
    (3, 170000, 3, 7), -- Chaleco Salvavidas De Seguridad Para Adultos
    (4, 82000, 4, 7),  -- Calcetines antideslizantes para piscina
    (1, 165850, 5, 7), -- Aletas niños
    (1, 370900, 7, 7); -- Bomba Filtro Piscina Estructural Intex Bestway
