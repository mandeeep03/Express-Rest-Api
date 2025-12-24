# Express.js REST API - User Management

A simple RESTful API built with Express.js for managing user data with CRUD operations.

## 🚀 Features

- **Server-Side Rendering (SSR)** - HTML list of users
- **REST API endpoints** - Full CRUD operations
- **JSON file storage** - Persistent data storage
- **Express.js** - Fast, minimalist web framework
- **Error handling** - Proper HTTP status codes

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Create the data directory and users file:
```bash
mkdir Data
echo '[]' > Data/users.json
```

## �� Running the Server
```bash
node index.js
```

Server will start at: `http://localhost:2000`

## 📡 API Endpoints

### 1. Home Route
```http
GET /
```
**Response:** "Hello from server"

---

### 2. Server-Side Rendered Users (HTML)
```http
GET /users
```
**Response:** HTML list of user first names

**Example:**
```html
<ul>
  <li>John</li>
  <li>Jane</li>
</ul>
```

---

### 3. Get All Users (JSON)
```http
GET /api/users
```
**Response:**
```json
[
  {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com"
  }
]
```

---

### 4. Create New User
```http
POST /api/users
Content-Type: application/json
```

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com"
}
```

**Response (201 Created):**
```json
{
  "id": 2,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com"
}
```

**Error (400 Bad Request):**
```json
{
  "error": "first_name is required"
}
```

---

### 5. Get Single User
```http
GET /api/users/:id
```

**Example:** `GET /api/users/1`

**Response (200 OK):**
```json
{
  "id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com"
}
```

**Error (404 Not Found):**
```json
{
  "error": "User not found"
}
```

---

### 6. Update User (Partial)
```http
PATCH /api/users/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "first_name": "Jane"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "john@example.com"
}
```

---

### 7. Delete User
```http
DELETE /api/users/:id
```

**Response (200 OK):**
```json
{
  "id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com"
}
```

## 🧪 Testing with cURL

### Get all users:
```bash
curl http://localhost:2000/api/users
```

### Create a new user:
```bash
curl -X POST http://localhost:2000/api/users \
  -H "Content-Type: application/json" \
  -d '{"first_name":"John","last_name":"Doe","email":"john@example.com"}'
```

### Get single user:
```bash
curl http://localhost:2000/api/users/1
```

### Update user:
```bash
curl -X PATCH http://localhost:2000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Jane"}'
```

### Delete user:
```bash
curl -X DELETE http://localhost:2000/api/users/1
```

## 📁 Project Structure
```
.
├── index.js              # Main server file
├── Data/
│   └── users.json       # User data storage
├── package.json         # Dependencies
└── README.md           # Documentation
```

## �� Dependencies
```json
{
  "express": "^4.18.0"
}
```

Install with:
```bash
npm install express
```

## 📝 Sample Data Format (Data/users.json)
```json
[
  {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "gender": "Male",
    "ip_address": "192.168.1.1"
  },
  {
    "id": 2,
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane@example.com",
    "gender": "Female",
    "ip_address": "192.168.1.2"
  }
]
```

## ⚠️ Important Notes

1. **File-based storage**: This API uses a JSON file for storage. For production, use a proper database (MongoDB, PostgreSQL, etc.)

2. **No authentication**: This is a basic example without authentication. Add proper auth for production use.

3. **Data persistence**: Data is written to `users.json` on every create, update, or delete operation.

4. **Error handling**: Basic error handling is implemented. Expand as needed for production.

## 🚨 HTTP Status Codes

- `200 OK` - Successful GET, PATCH, DELETE
- `201 Created` - Successful POST
- `400 Bad Request` - Missing required fields
- `404 Not Found` - User not found
- `500 Internal Server Error` - Server/file system errors

## 🔜 Future Enhancements

- [ ] Add input validation (email format, etc.)
- [ ] Implement database (MongoDB/PostgreSQL)
- [ ] Add authentication & authorization
- [ ] Add pagination for user list
- [ ] Add search/filter functionality
- [ ] Add logging middleware
- [ ] Add CORS configuration
- [ ] Add rate limiting
- [ ] Add unit tests

## 📄 License

MIT

## 👤 Author

Your Name

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

**Built with ❤️ using Express.js**
