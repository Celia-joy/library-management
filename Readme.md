# 📚 Library Management System API

A RESTful API built with **Express.js** and **MongoDB** that allows members to register, browse books, and borrow/return copies — with automated overdue email reminders.

---

## 🧠 Business Rules

- A member must **register** and **login** before borrowing any book
- A member can only hold **one book at a time** — they must return it before borrowing another
- Each book has a maximum of **5 copies**, tracked individually (copy-1, copy-2, ...)
- If all copies of a book are borrowed, the next member is **denied access**
- A **limit date** is automatically set when a loan is created
- Members receive an **email notification** if they exceed the return deadline
- Only the **admin** can add books to the database

---

## 🗄️ Data Models

### Member
| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Full name of the member |
| `email` | String | Unique email address |
| `password` | String | Hashed password (bcryptjs) |

### Book
| Field | Type | Description |
|-------|------|-------------|
| `title` | String | Title of the book |
| `author` | String | Author of the book |
| `totalCopies` | Number | Total copies available (max 5) |
| `copyNumber` | Number | Copy identifier (1–5) |

### Loan
| Field | Type | Description |
|-------|------|-------------|
| `member` | ObjectId | Reference to Member |
| `book` | ObjectId | Reference to Book |
| `copyNumber` | Number | Which copy was borrowed |
| `borrowedDate` | Date | When the loan started |
| `limitDate` | Date | Deadline to return the book |
| `returnedDate` | Date | Null until the book is returned |

---

## 🛣️ API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register a new member |
| POST | `/api/auth/login` | Public | Login and receive a JWT token |

### Books
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/books` | Admin only | Add a new book to the database |
| GET | `/api/books` | Member | Get all available books |
| GET | `/api/books/:id` | Member | Get one book with availability info |

### Loans
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/loans` | Member | Borrow a book |
| PUT | `/api/loans/:id/return` | Member | Return a borrowed book |
| GET | `/api/loans` | Member | View your loan history |

---

## 📁 Project Structure

```
library-management/
│
├── config/
│   ├── env.js                    # Loads environment variables
│   └── mailer.js                 # Nodemailer configuration
│
├── Controllers/
│   ├── auth.controller.js        # Register & login logic
│   ├── book.controller.js        # Add, list, and view books
│   └── loan.controller.js        # Borrow, return, and view loans
│
├── Database/
│   └── mongodb.js                # Mongoose connection
│
├── middleware/
│   ├── auth.middleware.js        # JWT verification (protect routes)
│   └── error.middleware.js       # Global error handler
│
├── Models/
│   ├── member.model.js
│   ├── book.model.js
│   └── loan.model.js
│
├── Routes/
│   ├── auth.routes.js
│   ├── book.routes.js
│   └── loan.routes.js
│
├── utils/
│   └── reminder.js               # node-cron job for overdue notifications
│
├── .env.development.local
├── .env.production.local
├── .gitignore
├── app.js                        # Express app entry point
└── package.json
```

---

## ⚙️ Tech Stack

| Package | Purpose |
|---------|---------|
| `express` | Web framework |
| `mongoose` | MongoDB ODM — schemas and queries |
| `dotenv` | Load environment variables from `.env` |
| `bcryptjs` | Hash and compare passwords securely |
| `jsonwebtoken` | Create and verify JWT tokens for auth |
| `nodemailer` | Send overdue reminder emails |
| `node-cron` | Schedule daily overdue loan checks |
| `express-validator` | Validate and sanitize incoming request data |
| `nodemon` | Auto-restart server during development |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/library-management.git
cd library-management
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env.development.local` file in the root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

### 4. Run the development server
```bash
npm run dev
```

The server will start on `http://localhost:5000`

---

## 🔐 Authentication

This API uses **JWT (JSON Web Tokens)** for authentication. After logging in, include the token in the `Authorization` header of protected requests:

```
Authorization: Bearer <your_token_here>
```

---

## 📬 Overdue Notifications

A scheduled job runs **daily** using `node-cron`. It checks all active loans where `limitDate` has passed and `returnedDate` is still `null`, then sends an email reminder to the member via `nodemailer`.

---

## 👤 Author

**Celia-joy**  
Built as a hands-on learning project to master Express.js backend development.
