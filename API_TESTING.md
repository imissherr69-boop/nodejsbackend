# Todo API Testing Guide

## Base URL
```
http://localhost:5000
```

## API Endpoints

### 1. Get All Todos (with Search, Filter & Pagination)
**Endpoint:** `GET /todos`

**Query Parameters:**
- `search` (optional): Search by title (case-insensitive)
- `status` (optional): Filter by status (`PENDING` or `DONE`)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example Requests:**

```bash
# Get all todos
curl http://localhost:5000/todos

# Get todos with search
curl "http://localhost:5000/todos?search=belajar"

# Get todos with status filter
curl "http://localhost:5000/todos?status=PENDING"

# Get todos with pagination
curl "http://localhost:5000/todos?page=1&limit=5"

# Combined search, filter & pagination
curl "http://localhost:5000/todos?search=belajar&status=PENDING&page=1&limit=5"
```

### 2. Get Todo by ID
**Endpoint:** `GET /todos/:id`

```bash
curl http://localhost:5000/todos/{id}
```

### 3. Create Todo
**Endpoint:** `POST /todos`

**Request Body:**
```json
{
  "title": "Belajar TypeScript",
  "description": "Mempelajari TypeScript untuk backend",
  "status": "PENDING",
  "priority": "HIGH",
  "dueDate": "2026-05-20T10:00:00Z",
  "tags": ["programming", "learning"]
}
```

**Example Request:**
```bash
curl -X POST http://localhost:5000/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Belajar TypeScript",
    "description": "Mempelajari TypeScript untuk backend",
    "status": "PENDING",
    "priority": "HIGH",
    "tags": ["programming"]
  }'
```

### 4. Update Todo
**Endpoint:** `PUT /todos/:id`

**Request Body:** (All fields are optional)
```json
{
  "title": "Updated Title",
  "status": "DONE",
  "priority": "MEDIUM",
  "isArchived": false
}
```

**Example Request:**
```bash
curl -X PUT http://localhost:5000/todos/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "DONE",
    "priority": "LOW"
  }'
```

### 5. Delete Todo
**Endpoint:** `DELETE /todos/:id`

```bash
curl -X DELETE http://localhost:5000/todos/{id}
```

## Response Status Codes

- `200 OK`: Successful GET, PUT, DELETE
- `201 Created`: Successful POST
- `400 Bad Request`: Validation error
- `404 Not Found`: Todo not found
- `500 Internal Server Error`: Server error

## Response Format

### Success Response
```json
{
  "id": "uuid-string",
  "title": "Todo Title",
  "description": "Todo Description",
  "status": "PENDING",
  "priority": "HIGH",
  "dueDate": "2026-05-20T10:00:00.000Z",
  "tags": ["tag1", "tag2"],
  "isArchived": false,
  "createdAt": "2026-05-11T12:30:00.000Z",
  "updatedAt": "2026-05-11T12:30:00.000Z"
}
```

### Error Response
```json
{
  "message": "Validation Error",
  "errors": [
    {
      "path": ["title"],
      "message": "Title is required"
    }
  ]
}
```

## Swagger Documentation
Access the Swagger UI at: `http://localhost:5000/api-docs`

## Testing with Postman

1. Import the following collection or create requests manually
2. Base URL: `http://localhost:5000`
3. Set `Content-Type: application/json` for POST and PUT requests

### Example Postman Variables
- `base_url`: http://localhost:5000
- `todo_id`: {paste actual todo ID here}
