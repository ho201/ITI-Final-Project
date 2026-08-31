const test = require("node:test");
const assert = require("node:assert");
const request = require("supertest");

const mongoose = require("mongoose");
const app = require("../src/app");
const connectDB = require("../src/config/db");
const User = require("../src/models/User");

// Connect to MongoDB before running the tests
test.before(async () => {
    await connectDB();
});

// Close database connection after all tests finish
test.after(async () => {
    await mongoose.connection.close();
});

// Delete test user before each test
test.beforeEach(async () => {
    await User.deleteOne({
        email: "testuser@example.com"
    });
});

// Test successful user registration
test("POST /api/auth/register - should register a new user", async () => {

    const response = await request(app)
        .post("/api/auth/register")
        .send({
            name: "Test User",
            email: "testuser@example.com",
            password: "password123"
        });

    assert.strictEqual(response.statusCode, 201);

    assert.strictEqual(
        response.body.message,
        "User registered successfully."
    );

    assert.ok(response.body.data.user);

    assert.strictEqual(
        response.body.data.user.email,
        "testuser@example.com"
    );
});

// Test registration with invalid data
test("POST /api/auth/register - should reject invalid data", async () => {

    const response = await request(app)
        .post("/api/auth/register")
        .send({
            name: "",
            email: "invalid-email",
            password: "123"
        });

    // Validation middleware returns 422
    assert.strictEqual(response.statusCode, 422);
});

// Test duplicate email
test("POST /api/auth/register - should reject duplicate email", async () => {

    // Create the first user
    await request(app)
        .post("/api/auth/register")
        .send({
            name: "Test User",
            email: "testuser@example.com",
            password: "password123"
        });

    // Try to register with the same email
    const response = await request(app)
        .post("/api/auth/register")
        .send({
            name: "Another User",
            email: "testuser@example.com",
            password: "password123"
        });

    assert.strictEqual(response.statusCode, 409);
});

// Test successful login
test("POST /api/auth/login - should login successfully", async () => {

    // Register user first
    await request(app)
        .post("/api/auth/register")
        .send({
            name: "Test User",
            email: "testuser@example.com",
            password: "password123"
        });

    // Login
    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email: "testuser@example.com",
            password: "password123"
        });

    assert.strictEqual(response.statusCode, 200);

    // JWT token should be returned
    assert.ok(response.body.data.token);

    assert.strictEqual(
        response.body.data.user.email,
        "testuser@example.com"
    );
});

// Test login with wrong password
test("POST /api/auth/login - should reject wrong password", async () => {

    // Register user
    await request(app)
        .post("/api/auth/register")
        .send({
            name: "Test User",
            email: "testuser@example.com",
            password: "password123"
        });

    // Try login with wrong password
    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email: "testuser@example.com",
            password: "wrongpassword"
        });

    assert.strictEqual(response.statusCode, 401);
});

// Test protected profile endpoint without token
test("GET /api/auth/profile - should reject request without token", async () => {

    const response = await request(app)
        .get("/api/auth/profile");

    assert.strictEqual(response.statusCode, 401);
});

// Test protected profile endpoint with valid token
test("GET /api/auth/profile - should return user profile", async () => {

    // Register user
    await request(app)
        .post("/api/auth/register")
        .send({
            name: "Test User",
            email: "testuser@example.com",
            password: "password123"
        });

    // Login to get token
    const loginResponse = await request(app)
        .post("/api/auth/login")
        .send({
            email: "testuser@example.com",
            password: "password123"
        });

    const token = loginResponse.body.data.token;

    // Access protected route
    const response = await request(app)
        .get("/api/auth/profile")
        .set("Authorization", `Bearer ${token}`);

    assert.strictEqual(response.statusCode, 200);

    assert.strictEqual(
        response.body.data.user.email,
        "testuser@example.com"
    );
});