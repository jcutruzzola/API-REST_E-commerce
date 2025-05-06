# 🛒 API REST - E-commerce Backend con Node.js y Express

Este proyecto es una API RESTful desarrollada con **Node.js** y **Express** que gestiona productos, carritos de compra, sesiones de usuario y vistas en tiempo real. Está orientada a cubrir funcionalidades básicas de un e-commerce backend.

## 🚀 Tecnologías principales

- Node.js
- Express.js
- Handlebars
- Passport.js
- WebSockets (Socket.IO)
- MongoDB (conexión mediante archivo `database.js`)
- Cookie-parser
- Routers modularizados

---

## 📁 Estructura del proyecto

/src ├── routes/ │ ├── product.router.js │ ├── cart.router.js │ ├── views.router.js │ ├── session.router.js │ └── realTimeProducts.router.js ├── views/ ← Vistas Handlebars ├── public/ ← Archivos estáticos ├── config/ │ └── passport.config.js ├── dao/ ← Lógica de persistencia (comentada) ├── utils/ │ └── socket.js ← Configuración WebSocket └── database.js ← Conexión a base de datos MongoDB

---

## 🧩 Funcionalidades principales

- CRUD de productos (`/api/products`)
- CRUD de carritos (`/api/carts`)
- Vistas renderizadas con Handlebars (`/`)
- Vista en tiempo real con WebSocket (`/`)
- Manejo de sesiones (`/api/sessions`)
- Autenticación con Passport
- Middleware para manejo de JSON, formularios y cookies

---

## 🧪 Endpoints destacados

### Productos
- `GET /api/products` → Lista todos los productos
- `POST /api/products` → Crea un nuevo producto
- `PUT /api/products/:id` → Actualiza un producto
- `DELETE /api/products/:id` → Elimina un producto

### Carritos
- `GET /api/carts/:cid` → Obtiene un carrito por ID
- `POST /api/carts/:cid/product/:pid` → Agrega un producto al carrito

### Sesiones
- `POST /api/sessions/login` → Inicia sesión
- `POST /api/sessions/logout` → Cierra sesión
- `POST /api/sessions/register` → Registra un nuevo usuario

### Vistas
- `GET /` → Página principal
- `GET /realtimeproducts` → Lista productos en tiempo real vía WebSocket

---

🔐 Autenticación
Se utiliza Passport.js con estrategia local para login/register. El middleware initializePassport() está inicializado al comienzo del archivo principal.

💬 WebSockets
El archivo utils/socket.js contiene la configuración para el uso de WebSocket con Socket.IO, permitiendo actualizaciones en tiempo real para productos.

✨ Extras
Motor de vistas: Handlebars

Middleware para archivos estáticos y formularios

Cookies para el manejo de sesiones

