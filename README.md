# MediCare Reminder

**MediCare Reminder** is a RESTful API for managing medicines, medication reminders, and medication history.

The project provides secure user authentication, role-based authorization, medicine management, reminder scheduling, medication history tracking, image uploads, data validation, search and filtering, Swagger API documentation, logging, centralized error handling, automated tests, seed data, and Docker support.

---

## Features

- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Role-based authorization
- Protected API routes
- User profile management
- Admin user management
- Medicine CRUD operations
- Medicine image upload
- Medicine validation
- Medicine status management
- Medicine search
- Medicine filtering by type and status
- Medicine pagination
- Reminder management
- Reminder validation
- Reminder ownership authorization
- Reminder search
- Reminder filtering by frequency, active status, and medicine
- Reminder time conflict checking
- Medication dose history
- History ownership and authorization checks
- History filtering by status and medicine
- History search by medicine name
- Request logging
- Global error handling
- 404 Not Found handling
- Swagger API documentation
- Seed data
- Automated unit tests
- Docker support
- Docker Compose support

---

## Technologies

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT (JSON Web Token)**
- **bcrypt**
- **Express Validator**
- **Zod**
- **Multer**
- **Swagger JSDoc**
- **Swagger UI Express**
- **Docker**
- **Docker Compose**
- **Node.js Test Runner**

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
│   └── user.test.js
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
PORT=
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=
```

### Environment Variables Description

| Variable          | Description                                       |
|-------------------|---------------------------------------------------|
| `PORT`            | Port on which the server runs                     |
| `MONGO_URI`       | MongoDB connection string                         |
| `JWT_SECRET`      | Secret key used to generate and verify JWT tokens |
| `JWT_EXPIRES_IN`  | JWT token expiration time                         |

---

# Running the Application

## Start the Server

```bash
npm start
```

The API runs on:

```text
http://localhost:3000
```

## Development Mode

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

- Authentication
- `admin` role

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

---

## Authentication

|Method | Endpoint         | Authentication |
|------ |------------------|----------------|
| POST  | `/auth/register` | No             |
| POST  | `/auth/login`    | No             |
| GET   | `/auth/profile`  | JWT            |
| GET   | `/auth/users`    | JWT + Admin    |

---

# Medicines

| Method | Endpoint         | Authentication |
|--------|------------------|----------------|
| POST   | `/medicines`     | JWT            |
| GET    | `/medicines`     | JWT            |
| GET    | `/medicines/:id` | JWT            |
| PUT    | `/medicines/:id` | JWT            |
| DELETE | `/medicines/:id` | JWT            |

## Create Medicine

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

The image is optional.

## Medicine Search

Medicines can be searched by:

- Medicine name
- Active ingredient

Example:

```http
GET /api/medicines?search=Panadol
```

## Medicine Filtering

Medicines can be filtered by:

- Type
- Status

Example:

```http
GET /api/medicines?type=tablet&status=active
```

## Pagination

Medicine retrieval supports pagination using:

```text
page
limit
```

Example:

```http
GET /api/medicines?page=1&limit=10
```

The response includes pagination information such as:

- Current page
- Total documents
- Total pages
- Number of returned medicines

## Update Medicine

```http
PUT /api/medicines/:id
```

Medicine updates support:

- Name
- Dosage
- Type
- Status
- Description
- Active ingredient
- Optional image upload

The update request uses:

```text
multipart/form-data
```

---

# Reminders

| Method | Endpoint         | Authentication |
|--------|------------------|----------------|
| POST   | `/reminders`     | JWT            |
| GET    | `/reminders`     | JWT            |
| PATCH  | `/reminders/:id` | JWT            |
| DELETE | `/reminders/:id` | JWT            |

## Create Reminder

```http
POST /api/reminders
```

A reminder contains information such as:

- Medicine
- Time
- Frequency
- Dosage
- Specific days
- Active status

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

### Dosage

Reminder dosage contains:

- Quantity
- Unit

Supported dosage units:

```text
tablets
capsules
ml
mg
drops
puffs
```

## Reminder Ownership

When creating a reminder, the system verifies that the selected medicine belongs to the authenticated user.

A user cannot create a reminder for another user's medicine.

## Reminder Conflict Checking

The system checks whether the same user already has a reminder for the same medicine at the same time.

Duplicate reminders are rejected.

## Get User Reminders

```http
GET /api/reminders
```

Reminders can be filtered using:

### Search

Search by medicine name:

```http
GET /api/reminders?search=Panadol
```

### Frequency

```http
GET /api/reminders?frequency=Daily
```

### Active Status

```http
GET /api/reminders?isActive=true
```

or:

```http
GET /api/reminders?isActive=false
```

### Medicine

```http
GET /api/reminders?medicineId=<MEDICINE_ID>
```

Multiple filters can also be combined:

```http
GET /api/reminders?frequency=Daily&isActive=true&search=Panadol
```

Reminders are sorted by time.

## Update Reminder

```http
PATCH /api/reminders/:id
```

The reminder can be updated using:

- Time
- Frequency
- Days
- Dosage
- Active status

If the frequency is changed to:

```text
Specific Days
```

days must be provided.

If the frequency is changed to `Daily` or `Weekly`, the days are cleared.

Only the owner of the reminder can update it.

## Delete Reminder

```http
DELETE /api/reminders/:id
```

Only the owner of the reminder can delete it.

---

# Medication History

| Method | Endpoint       | Authentication |
|--------|----------------|----------------|
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

- User
- Medicine
- Reminder
- Dose status
- Taken time

## Create History

```http
POST /api/history
```

When creating a history record, the system verifies that:

1. The medicine exists.
2. The reminder exists.
3. The reminder belongs to the selected medicine.
4. The history record is associated with the authenticated user.

Example request:

```json
{
  "medicineId": "665abc123456789012345678",
  "reminderId": "665abc123456789012345679",
  "status": "Taken",
  "takenAt": "2026-08-18T08:00:00.000Z"
}
```

## Get History

```http
GET /api/history
```

The authenticated user's history can be filtered by:

- Status
- Medicine ID
- Medicine name search

### Filter by Status

```http
GET /api/history?status=Taken
```

### Filter by Medicine

```http
GET /api/history?medicineId=<MEDICINE_ID>
```

### Search by Medicine Name

```http
GET /api/history?search=Panadol
```

Multiple filters can be combined:

```http
GET /api/history?status=Taken&medicineId=<MEDICINE_ID>&search=Panadol
```

History records are sorted by creation date, with the newest records returned first.

The medicine and reminder information is populated in the response.

## History Authorization

Users can only access their own history records.

When updating a history record, the system checks both:

- History ID
- Authenticated user's ID

Therefore, a user cannot update another user's history record.

## Update History

```http
PATCH /api/history/:id
```

History records can be updated using the fields supported by the History model, such as:

```json
{
  "status": "Missed",
  "takenAt": "2026-08-18T10:00:00.000Z"
}
```

---

# Database

The project uses **MongoDB** with **Mongoose**.

The database connection is implemented in:

```text
src/config/db.js
```

---

## User Model

Stores:

- Name
- Email
- Password
- Role
- Timestamps

Passwords are securely hashed using **bcrypt**.

---

## Medicine Model

Stores:

- User ID
- Medicine name
- Dosage
- Type
- Status
- Image
- Description
- Active ingredient
- Timestamps

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

---

## Reminder Model

Stores:

- User ID
- Medicine ID
- Time
- Frequency
- Days
- Dosage quantity
- Dosage unit
- Active status
- Timestamps

Reminder frequencies include:

```text
Daily
Weekly
Specific Days
```

The Reminder model also contains indexes for efficient queries, including:

```text
userId
userId + medicineId + time
```

---

## History Model

Stores:

- User ID
- Medicine ID
- Reminder ID
- Dose status
- Taken time
- Timestamps

Possible dose statuses:

```text
Taken
Missed
```

---

# Validation

The project uses different validation approaches depending on the module.

## User Validation

User registration and login requests are validated using **Express Validator**.

## Medicine Validation

Medicine creation and updates validate fields such as:

- Name
- Dosage
- Type
- Description
- Active ingredient
- Status

Validation is applied before requests reach the medicine controllers.

## Reminder Validation

Reminder requests are validated according to the reminder validation rules.

Validation includes fields such as:

- Medicine ID
- Time
- Dosage
- Frequency
- Selected days
- Active status

## History Validation

History requests use the project's history validation rules.

Validation errors are handled before requests reach the controllers.

---

# File Upload

The project uses **Multer** for medicine image uploads.

Upload middleware:

```text
src/middlewares/uploadMiddleware.js
```

Medicine creation and update accept files using:

```text
multipart/form-data
```

The image field is:

```text
image
```

The image upload is optional.

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

The project uses:

- **Swagger JSDoc**
- **Swagger UI Express**

Swagger documentation is available at:

```text
http://localhost:3000/api-docs
```

The Swagger API server URL is:

```text
http://localhost:3000/api
```

Swagger documentation covers:

- Authentication
- Medicines
- Reminders
- History

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

## 1. Register a User

```http
POST /api/auth/register
```

## 2. Login

```http
POST /api/auth/login
```

Copy the JWT token returned from the login response.

## 3. Authenticate Protected Requests

Add:

```text
Authorization: Bearer <JWT_TOKEN>
```

## 4. Test Medicines

```text
POST   /api/medicines
GET    /api/medicines
GET    /api/medicines/:id
PUT    /api/medicines/:id
DELETE /api/medicines/:id
```

## 5. Test Reminders

```text
POST   /api/reminders
GET    /api/reminders
PATCH  /api/reminders/:id
DELETE /api/reminders/:id
```

## 6. Test History

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
tests/user.test.js
```

The tests cover basic medicine data validation and user data validation.

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

The seed script creates sample data for:

- User
- Medicine
- Reminder
- History

The generated sample data has the following relationship:

```text
User
 └── Medicine
      └── Reminder
           └── History
```

The seed script also clears the previous data before inserting the sample data.

Run:

```bash
node src/seed/seed.js
```

Make sure the `.env` file is configured and MongoDB is available before running the seed script.

---

# Docker

The project includes Docker support using:

- Dockerfile
- Docker Compose

## Build and Start

```bash
docker compose up --build
```

Docker Compose starts:

- MediCare application
- MongoDB

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

| Team Member      | Responsibility                           |
|------------------|------------------------------------------|
| **Marwan Mohie** | User and Authentication                  |
| **Youssef Sayed**| Medicines and File Upload                |
| **Omar Saeed**   | Search, Filter and Pagination            |
| **Sara Mohsen**  | Reminders Module                         |
| **Nada Mostafa** | History and Logging                      |
| **Hoda Hatem**   | Configuration, Documentation and Testing |

---

# Configuration and Documentation Responsibility

The configuration and documentation work includes:

- MongoDB connection
- Global error handling
- Swagger API documentation
- Postman API testing
- Docker configuration
- Project README
- Environment variable configuration
- Automated testing setup

---

# License

This project was developed for educational purposes as part of the **ITI Final Project**.