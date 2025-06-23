# Backend API

Node.js API con TypeORM y PostgreSQL.

## Setup

1. Instala dependencias:
```bash
npm install
```

2. Copia el archivo de entorno a un .env:
```bash
cp env.example .env
```

3. Configura tu base de datos en `.env`

4. Corre el servidor:
```bash
npm run dev
```

## API Endpoints

- `POST /api/productos` - Create producto
- `GET /api/productos` - Get productos with relations
- `POST /api/empresas` - Create empresa
- `GET /api/empresas` - Get empresas
- `POST /api/bancos` - Create banco
- `GET /api/bancos` - Get bancos
- `GET /api/niveles` - Get niveles
