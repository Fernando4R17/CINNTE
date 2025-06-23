CREATE TABLE niveles (
    id_nivel SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE 
);

CREATE TABLE empresas (
    id_empresa SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    domicilio TEXT,
    telefono VARCHAR(20),
    correo VARCHAR(100),
    id_nivel INT NOT NULL,
    FOREIGN KEY (id_nivel) REFERENCES niveles(id_nivel) ON DELETE RESTRICT
);

CREATE TABLE bancos (
    id_banco SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    id_nivel INT NOT NULL,
    FOREIGN KEY (id_nivel) REFERENCES niveles(id_nivel) ON DELETE RESTRICT
);

CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    alias VARCHAR(100),
    id_empresa INT NOT NULL,
    FOREIGN KEY (id_empresa) REFERENCES empresas(id_empresa) ON DELETE CASCADE
);

INSERT INTO niveles (nombre) VALUES 
('Primario'),
('Secundario'),
('Terciario');

INSERT INTO empresas (nombre, domicilio, telefono, correo, id_nivel) VALUES 
('Empresa Alpha S.A.', 'Calle 123, Ciudad Ejemplo', '6671234567', 'contacto@empresaalpha.com', 1);

INSERT INTO bancos (nombre, id_nivel) VALUES 
('Banco Fuerte', 1);

INSERT INTO productos (codigo, nombre, alias, id_empresa) VALUES 
('PRD-001', 'Producto Estrella', 'Estrella', 1);

SELECT * FROM niveles;
SELECT * FROM empresas;
SELECT * FROM bancos;
SELECT * FROM productos;