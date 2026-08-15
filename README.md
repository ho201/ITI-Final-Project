# MediCare Reminder

**MediCare Reminder** is a RESTful API for managing medicines, medication reminders, and medication history.

The project provides secure user authentication, role-based authorization, medicine management, reminder scheduling, medication history tracking, image uploads, data validation, search and filtering, Swagger API documentation, logging, centralized error handling, automated tests, and Docker support.

---

## Features

* User registration and login
* Password hashing using bcrypt
* JWT-based authentication
* Role-based authorization
* Protected API routes
* User profile management
* Admin user management
* Medicine CRUD operations
* Medicine image upload
* Medicine validation
* Medicine status management
* Medicine search
* Medicine filtering by type and status
* Medicine pagination
* Reminder management
* Reminder validation using Zod
* Reminder time conflict checking
* Medication dose history
* Request logging
* Global error handling
* 404 Not Found handling
* Swagger API documentation
* Seed data
* Automated unit tests
* Docker support
* Docker Compose support

---

## Technologies

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT (JSON Web Token)**
* **bcrypt**
* **Express Validator**
* **Zod**
* **Multer**
* **Swagger JSDoc**
* **Swagger UI Express**
* **Docker**
* **Docker Compose**
* **Node.js Test Runner**

---

## Project Structure

```text
MediCare Reminder/
│
├── src/
│   ├── config/
│   │   ├── config.js
│   │   ├── db.js
│   │   └── jwt.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── mediController.js
│   │   ├── reminderController.js
│   │   └── historyController.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorHandle.js
│   │   ├── index.js
│   │   ├── logger.js
│   │   ├── notFoundMiddleware.js
│   │   ├── reminderMiddleware.js
│   │   ├── uploadMiddleware.js
│   │   └── validationMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Medicine.js
│   │   ├── Reminder.js
│   │   └── History.js
│   │
│   ├── routs/
│   │   ├── authRoutes.js
│   │   ├── medicineRoutes.js
│   │   ├── reminderRoutes.js
│   │   └── historyRoutes.js
│   │
│   ├── seed/
│   │   └── seed.js
│   │
│   ├── swagger/
│   │   ├── swagger.js
│   │   └── swaggerDocs.js
│   │
│   ├── utils/
│   │   └── responseHandler.js
│   │
│   ├── validations/
│   │   ├── userValidation.js
│   │   ├── medicineValidation.js
│   │   ├── reminderValidation.js
│   │   └── history.validation.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests/
│   ├── medicine.test.js
│   └── reminder.test.js
│
├── .env.example
├── .gitignore
├── .dockerignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
└── README.md
```

---

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate to the project directory

```bash
cd MediCare-Reminder
```

### 3. Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory of the project.

Use `.env.example` as a template:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

### Environment Variables Description

| Variable         | Description                                       |
| ---------------- | ------------------------------------------------- |
| `PORT`           | Port on which the server runs                     |
| `MONGO_URI`      | MongoDB connection string                         |
| `JWT_SECRET`     | Secret key used to generate and verify JWT tokens |
| `JWT_EXPIRES_IN` | JWT token expiration time                         |

> **Important:** Never commit your `.env` file or expose secret values in the repository.

---

## Running the Application

### Start the server

```bash
npm start
```

The API runs on:

```text
http://localhost:3000
```

### Development Mode

```bash
npm run dev
```

The development mode uses **Nodemon** to automatically restart the server when files are changed.

---

# Authentication

The application uses **JWT authentication** to protect private API routes.

## Register

```http
POST /api/auth/register
```

Creates a new user account.

## Login

```http
POST /api/auth/login
```

Authenticates a user and returns a JWT token.

## User Profile

```http
GET /api/auth/profile
```

Returns the profile of the currently authenticated user.

## Get All Users

```http
GET /api/auth/users
```

This endpoint requires:

* Authentication
* `admin` role

## Authorization Header

Protected routes require the JWT token in the Authorization header:

```text
Authorization: Bearer <JWT_TOKEN>
```

---

# API Endpoints

The API base URL is:

```text
http://localhost:3000/api
```

## Authentication

| Method | Endpoint         | Authentication |
| ------ | ---------------- | -------------- |
| POST   | `/auth/register` | No             |
| POST   | `/auth/login`    | No             |
| GET    | `/auth/profile`  | JWT            |
| GET    | `/auth/users`    | JWT + Admin    |

---

## Medicines

| Method | Endpoint         | Authentication |
| ------ | ---------------- | -------------- |
| POST   | `/medicines`     | JWT            |
| GET    | `/medicines`     | JWT            |
| GET    | `/medicines/:id` | JWT            |
| PUT    | `/medicines/:id` | JWT            |
| DELETE | `/medicines/:id` | JWT            |

### Create Medicine

```http
POST /api/medicines
```

The endpoint supports medicine image uploads using:

```text
multipart/form-data
```

The image field name is:

```text
image
```

### Medicine Search

Medicines can be searched by:

* Medicine name
* Active ingredient

Example:

```http
GET /api/medicines?search=Panadol
```

### Medicine Filtering

Medicines can be filtered by:

* Type
* Status

Example:

```http
GET /api/medicines?type=tablet&status=active
```

### Pagination

Medicine retrieval supports pagination using:

```text
page
limit
```

Example:

```http
GET /api/medicines?page=1&limit=10
```

The response includes:

* Current page
* Total documents
* Total pages
* Number of returned medicines

---

## Reminders

| Method | Endpoint         | Authentication |
| ------ | ---------------- | -------------- |
| POST   | `/reminders`     | JWT            |
| GET    | `/reminders`     | JWT            |
| PATCH  | `/reminders/:id` | JWT            |
| DELETE | `/reminders/:id` | JWT            |

Reminders contain information such as:

* Medicine
* Time
* Dosage quantity
* Frequency
* Specific days
* Active status

Supported frequencies:

```text
Daily
Weekly
Specific Days
```

For `Specific Days`, the supported days are:

```text
Saturday
Sunday
Monday
Tuesday
Wednesday
Thursday
Friday
```

### Reminder Validation

Reminder data is validated using **Zod**.

Validation includes:

* Medicine ID format
* Reminder time
* Dosage quantity
* Frequency
* Selected days
* Active status during updates

### Reminder Conflict Checking

The reminder controller checks whether the same user already has a reminder for the same medicine at the same time and frequency.

Duplicate reminders are rejected to prevent scheduling conflicts.

---

## Medication History

| Method | Endpoint       | Authentication |
| ------ | -------------- | -------------- |
| POST   | `/history`     | JWT            |
| GET    | `/history`     | JWT            |
| PATCH  | `/history/:id` | JWT            |

Medication history tracks medication doses and their status.

Possible dose statuses include:

```text
Taken
Missed
```

History records are associated with:

* User
* Medicine
* Reminder
* Dose status
* Taken time

Users can only access and update their own history records.

---

# Database

The project uses **MongoDB** with **Mongoose**.

The database connection is implemented in:

```text
src/config/db.js
```

## User Model

Stores:

* Name
* Email
* Password
* Role
* Timestamps

Passwords are securely hashed using **bcrypt** before being stored.

## Medicine Model

Stores:

* User ID
* Medicine name
* Dosage
* Type
* Status
* Image
* Description
* Active ingredient
* Timestamps

Medicine types include:

```text
capsule
tablet
cream
drops
syrup
injection
other
```

Medicine statuses include:

```text
active
completed
suspended
```

## Reminder Model

Stores:

* User ID
* Medicine ID
* Time
* Frequency
* Days
* Dosage quantity
* Active status
* Timestamps

## History Model

Stores:

* User ID
* Medicine ID
* Reminder ID
* Dose status
* Taken time
* Timestamps

---

# Validation

The project uses multiple validation approaches depending on the module.

### User Validation

User registration and login requests are validated using **Express Validator**.

### Medicine Validation

Medicine creation validates:

* Name
* Dosage
* Type
* Description
* Active ingredient

### Reminder Validation

Reminder creation and updates are validated using **Zod**.

### History Validation

History creation and updates use **Express Validator**.

Validation errors are handled before requests reach the controllers.

---

# File Upload

The project uses **Multer** for medicine image uploads.

Upload middleware:

```text
src/middlewares/uploadMiddleware.js
```

Medicine creation accepts files using:

```text
multipart/form-data
```

The image field is:

```text
image
```

---

# Error Handling

The application uses centralized error handling middleware.

Main error handler:

```text
src/middlewares/errorHandle.js
```

A separate middleware handles requests to routes that do not exist:

```text
src/middlewares/notFoundMiddleware.js
```

This provides consistent error responses across the API.

---

# Logging

The project includes a global request logging middleware:

```text
src/middlewares/logger.js
```

The logger is registered globally in:

```text
src/app.js
```

It records incoming HTTP requests to help with monitoring and debugging.

---

# Swagger API Documentation

The project uses **Swagger JSDoc** and **Swagger UI Express** for API documentation.

Swagger documentation is available at:

```text
http://localhost:3000/api-docs
```

The Swagger API server URL is:

```text
http://localhost:3000/api
```

Swagger documentation covers:

* Authentication
* Medicines
* Reminders
* History

Protected endpoints can be tested directly through Swagger using the **Authorize** button.

Use:

```text
Bearer <JWT_TOKEN>
```

for authentication.

---

# Postman Testing

The API can also be tested using Postman.

Recommended testing flow:

### 1. Register a User

```http
POST /api/auth/register
```

### 2. Login

```http
POST /api/auth/login
```

Copy the JWT token returned from the login response.

### 3. Authenticate Protected Requests

Add:

```text
Authorization: Bearer <JWT_TOKEN>
```

### 4. Test Medicines

```text
POST   /api/medicines
GET    /api/medicines
GET    /api/medicines/:id
PUT    /api/medicines/:id
DELETE /api/medicines/:id
```

### 5. Test Reminders

```text
POST   /api/reminders
GET    /api/reminders
PATCH  /api/reminders/:id
DELETE /api/reminders/:id
```

### 6. Test History

```text
POST   /api/history
GET    /api/history
PATCH  /api/history/:id
```

---

# Automated Testing

The project includes automated tests using the built-in **Node.js Test Runner**.

Tests are located in:

```text
tests/
```

Current test files:

```text
tests/medicine.test.js
tests/reminder.test.js
```

The tests cover basic medicine data validation and reminder validation.

Run the test suite using:

```bash
npm test
```

A successful test run should report all tests as passing.

---

# Seed Data

The project contains a seed script:

```text
src/seed/seed.js
```

The seed script can be used to insert sample data into the database.

Run:

```bash
node src/seed/seed.js
```

Make sure the `.env` file is configured and MongoDB is available before running the seed script.

---

# Docker

The project includes Docker support using:

* Dockerfile
* Docker Compose

## Build and Start

```bash
docker compose up --build
```

Docker Compose starts:

* MediCare application
* MongoDB

The application is exposed on:

```text
http://localhost:3000
```

Swagger is available at:

```text
http://localhost:3000/api-docs
```

## Stop Containers

```bash
docker compose down
```

MongoDB data is stored in a Docker volume:

```text
mongo_data
```

---

# Project Team

| Team Member       | Responsibility                           |
| ----------------- | ---------------------------------------- |
| **Marwan Mohie**  | User and Authentication                  |
| **Youssef Sayed** | Medicines and File Upload                |
| **Omar Saeed**    | Search, Filter and Pagination            |
| **Sara Mohsen**   | Reminders Module                         |
| **Nada Mostafa**  | History and Logging                      |
| **Hoda Hatem**    | Configuration, Documentation and Testing |

---

# Configuration and Documentation Responsibility

The configuration and documentation work includes:

* MongoDB connection
* Global error handling
* Swagger API documentation
* Postman API testing
* Docker configuration
* Project README
* Environment variable configuration
* Automated testing setup

---

# License

This project was developed for educational purposes as part of the **ITI Final Project**.
