# Basic Express.js REST API

A clean, modular, and lightweight Express.js API framework built with modern ES Modules.

---

## 📁 Project Structure

```text
Basicapi/
├── src/
│   ├── app.js               # Express app configuration & middleware
│   ├── server.js            # Server entrypoint & port listener
│   ├── routes/
│   │   ├── index.js         # Master API router (/api)
│   │   └── items.routes.js  # Resource routes (/api/items)
│   ├── controllers/
│   │   └── items.controller.js # Route logic & business handlers
│   └── middlewares/
│       ├── errorHandler.js  # Centralized error handler
│       └── notFoundHandler.js # 404 handler for undefined routes
├── test/
│   └── api.test.js          # Automated endpoint tests (Node native test runner)
├── .env                     # Environment variables (PORT, NODE_ENV)
├── .env.example             # Example environment template
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18+ (v20+ recommended)
- **npm**: v9+

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` if not already present:
```bash
cp .env.example .env
```
Default `.env` values:
```env
PORT=3000
NODE_ENV=development
```

### 4. Run the Server

- **Development Mode** (auto-reloads on file changes):
  ```bash
  npm run dev
  ```

- **Production Mode**:
  ```bash
  npm start
  ```

- **Run Automated Tests**:
  ```bash
  npm test
  ```

---

## 📡 API Endpoints

### Base / Health Check
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API status and available links |
| `GET` | `/api/health` | Health check (uptime, timestamp) |

### Items (CRUD Example)
| Method | Endpoint | Description | Sample Request Body |
|---|---|---|---|
| `GET` | `/api/items` | List all items | None |
| `GET` | `/api/items/:id` | Get item by ID | None |
| `POST` | `/api/items` | Create new item | `{"title": "My Task", "description": "Details"}` |
| `PUT` | `/api/items/:id` | Update item | `{"completed": true}` |
| `DELETE` | `/api/items/:id` | Delete item | None |

---

## 🧪 Example Requests

### Get All Items
```bash
curl http://localhost:3000/api/items
```

### Create an Item
```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"title": "Build great software", "description": "Using Express.js framework"}'
```

### Update an Item
```bash
curl -X PUT http://localhost:3000/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### Delete an Item
```bash
curl -X DELETE http://localhost:3000/api/items/1
```

---

## 🧱 How to Add a New Feature / Resource

1. **Create Controller**: Add business logic in `src/controllers/myresource.controller.js`.
2. **Create Router**: Define routes in `src/routes/myresource.routes.js`.
3. **Register Router**: Mount the router in `src/routes/index.js`:
   ```javascript
   import myresourceRoutes from './myresource.routes.js';
   router.use('/myresource', myresourceRoutes);
   ```

