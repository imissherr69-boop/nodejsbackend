# Todo Backend API

Production-ready RESTful API backend untuk aplikasi Todo dengan TypeScript, Express.js, PostgreSQL, dan Prisma ORM.

## 🎯 Fitur Utama

- ✅ CRUD Todo operations (Create, Read, Update, Delete)
- 🔍 Search functionality dengan title (case-insensitive)
- 🏷️ Filter by status (PENDING/DONE)
- 📄 Pagination support (page & limit)
- 🔐 Security middleware (Helmet, Rate Limiting)
- 📚 Swagger/OpenAPI documentation
- ✔️ Request validation dengan Zod
- 🪵 Logging dengan Morgan
- ⚡ Hot reload development mode
- 📝 Environment configuration

## 📋 Prerequisites

- Node.js v18+ 
- npm atau yarn
- PostgreSQL 12+

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone <repository-url>
cd todo-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables

Buat file `.env` di root project:
```env
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://postgres:password@localhost:5432/todo_db"
```

### 4. Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# (Optional) Seed database
npx prisma db seed
```

### 5. Development Mode

```bash
npm run dev
```

Server akan running di `http://localhost:5000`

API Documentation: `http://localhost:5000/api-docs`

## 📦 Production Build

### Build untuk Production
```bash
npm run build
```

Hasil build akan disimpan di folder `dist/`

### Run Production
```bash
npm start
```

Atau langsung dengan:
```bash
npm run prod  # build + start
```

## 📖 API Documentation

### Base URL
```
http://localhost:5000
```

### Health Check
```http
GET /
```

Response:
```json
{
  "message": "Todo API is running 🚀",
  "environment": "development",
  "version": "1.0.0"
}
```

### 1. Get All Todos (dengan Search, Filter & Pagination)

```http
GET /todos?search=query&status=PENDING&page=1&limit=10
```

**Query Parameters:**
- `search` (optional): Cari berdasarkan title
- `status` (optional): Filter by status (`PENDING` atau `DONE`)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response (200):**
```json
[
  {
    "id": "uuid-string",
    "title": "Belajar TypeScript",
    "description": "Mempelajari TypeScript untuk backend",
    "status": "PENDING",
    "priority": "HIGH",
    "dueDate": "2026-05-20T10:00:00.000Z",
    "tags": ["programming", "learning"],
    "isArchived": false,
    "createdAt": "2026-05-11T12:30:00.000Z",
    "updatedAt": "2026-05-11T12:30:00.000Z"
  }
]
```

### 2. Get Todo by ID

```http
GET /todos/{id}
```

**Response (200):**
```json
{
  "id": "uuid-string",
  "title": "Belajar TypeScript",
  "description": "Mempelajari TypeScript untuk backend",
  "status": "PENDING",
  "priority": "HIGH",
  "dueDate": "2026-05-20T10:00:00.000Z",
  "tags": ["programming"],
  "isArchived": false,
  "createdAt": "2026-05-11T12:30:00.000Z",
  "updatedAt": "2026-05-11T12:30:00.000Z"
}
```

**Response (404):**
```json
{
  "status": "error",
  "message": "Todo not found"
}
```

### 3. Create Todo

```http
POST /todos
Content-Type: application/json

{
  "title": "Belajar TypeScript",
  "description": "Mempelajari TypeScript untuk backend",
  "status": "PENDING",
  "priority": "HIGH",
  "dueDate": "2026-05-20T10:00:00Z",
  "tags": ["programming", "learning"]
}
```

**Response (201):**
```json
{
  "id": "uuid-string",
  "title": "Belajar TypeScript",
  "description": "Mempelajari TypeScript untuk backend",
  "status": "PENDING",
  "priority": "HIGH",
  "dueDate": "2026-05-20T10:00:00.000Z",
  "tags": ["programming", "learning"],
  "isArchived": false,
  "createdAt": "2026-05-11T12:30:00.000Z",
  "updatedAt": "2026-05-11T12:30:00.000Z"
}
```

**Response (400):**
```json
{
  "status": "error",
  "message": "Validation Error",
  "errors": [
    {
      "path": ["title"],
      "message": "Title is required"
    }
  ]
}
```

### 4. Update Todo

```http
PUT /todos/{id}
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "DONE",
  "priority": "MEDIUM"
}
```

**Response (200):**
```json
{
  "id": "uuid-string",
  "title": "Updated Title",
  "description": "Mempelajari TypeScript untuk backend",
  "status": "DONE",
  "priority": "MEDIUM",
  "dueDate": "2026-05-20T10:00:00.000Z",
  "tags": ["programming"],
  "isArchived": false,
  "createdAt": "2026-05-11T12:30:00.000Z",
  "updatedAt": "2026-05-11T13:45:00.000Z"
}
```

### 5. Delete Todo

```http
DELETE /todos/{id}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Deleted successfully",
  "data": null
}
```

## 🗂️ Project Structure

```
todo-backend/
├── src/
│   ├── app.ts                 # Express app setup
│   ├── server.ts              # Server entry point
│   ├── config/
│   │   ├── environment.ts     # Environment config
│   │   ├── prisma.ts          # Prisma setup
│   ├── middlewares/
│   │   ├── errorHandler.ts    # Error handling
│   │   └── validate.ts        # Request validation
│   ├── modules/
│   │   └── todo/
│   │       ├── controller/
│   │       │   └── todo.controller.ts
│   │       ├── service/
│   │       │   └── todo.service.ts
│   │       ├── repository/
│   │       │   └── todo.repository.ts
│   │       ├── routes/
│   │       │   └── todo.routes.ts
│   │       └── todo.validation.ts
│   ├── docs/
│   │   └── swagger.ts         # Swagger setup
│   └── utils/
│       └── apiResponse.ts     # API response helper
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/
├── dist/                      # Compiled JavaScript (production)
├── .env                       # Environment variables
├── .env.example               # Example env
├── package.json
├── tsconfig.json
└── README.md
```

## 🛡️ Security Features

### 1. Helmet
- Mengatur HTTP headers untuk security
- Proteksi dari XSS, clickjacking, dan serangan lainnya

### 2. Rate Limiting
- Max 100 requests per 15 minutes per IP
- Mencegah abuse dan DDoS attacks

### 3. CORS
- Configured untuk production-ready
- Dapat dikustomisasi di `app.ts`

### 4. Input Validation
- Zod schema validation untuk semua requests
- Type-safe dengan TypeScript

## 📊 Database Schema

### Todo Model
```prisma
model Todo {
  id          String   @id @default(uuid())
  title       String
  description String?
  status      TodoStatus @default(PENDING)
  priority    Priority   @default(MEDIUM)
  dueDate     DateTime?
  tags        String[]
  isArchived  Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

enum TodoStatus {
  PENDING
  DONE
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}
```

## 🧪 Testing API

### Menggunakan cURL
```bash
# Get all todos
curl http://localhost:5000/todos

# Search
curl "http://localhost:5000/todos?search=belajar"

# Filter & Pagination
curl "http://localhost:5000/todos?status=PENDING&page=1&limit=5"

# Create todo
curl -X POST http://localhost:5000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Belajar TypeScript","priority":"HIGH"}'

# Update todo
curl -X PUT http://localhost:5000/todos/{id} \
  -H "Content-Type: application/json" \
  -d '{"status":"DONE"}'

# Delete todo
curl -X DELETE http://localhost:5000/todos/{id}
```

### Menggunakan Postman
1. Import collection atau buat requests manual
2. Set `Content-Type: application/json` untuk POST/PUT
3. Base URL: `http://localhost:5000`
4. Lihat `API_TESTING.md` untuk contoh lengkap

### Swagger UI
Akses di `http://localhost:5000/api-docs`

## 🔧 Configuration

### Environment Variables

```env
# Server
NODE_ENV=development          # development atau production
PORT=5000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/todo_db"
```

### Development Mode
- Hot reload dengan `tsx watch`
- Morgan logging dengan format "dev"
- Detailed error messages

### Production Mode
- Compiled TypeScript (dist/ folder)
- Morgan logging dengan format "combined"
- Helmet security headers aktif
- Rate limiting aktif

## 📦 Dependencies

### Core
- **express**: Web framework
- **typescript**: Type safety
- **prisma**: Database ORM

### Security
- **helmet**: Security headers
- **express-rate-limit**: Rate limiting
- **cors**: CORS handling

### Validation
- **zod**: Schema validation

### Documentation
- **swagger-jsdoc**: JSDoc to OpenAPI
- **swagger-ui-express**: Swagger UI

### Utilities
- **dotenv**: Environment variables
- **morgan**: HTTP logging
- **pg**: PostgreSQL driver

### Development
- **tsx**: TypeScript executor
- **@types/\***: TypeScript types

## 🚨 Error Handling

Semua errors akan di-handle oleh middleware dan return response dengan format:

```json
{
  "status": "error",
  "message": "Error message",
  "errors": []
}
```

Status codes yang digunakan:
- `200 OK`: Success
- `201 Created`: Resource created
- `400 Bad Request`: Validation error
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## 📝 Logging

### Development
```
GET /todos 200 12.345 ms - 256
```

### Production
Format combined dengan lebih detail

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💼 Author

Your Name - [GitHub](https://github.com)

## 🆘 Support

Jika ada issues atau pertanyaan:
1. Check dokumentasi di `/docs`
2. Review API_TESTING.md
3. Create issue di repository

---

**Made with ❤️ using TypeScript + Express + PostgreSQL**
