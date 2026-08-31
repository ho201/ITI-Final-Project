const test = require("node:test");
const assert = require("node:assert");
const request = require("supertest");

const mongoose = require("mongoose");
const app = require("../src/app");
const connectDB = require("../src/config/db");

const User = require("../src/models/User");
const Medicine = require("../src/models/Medicine");

// Test user information
const testUser = {
    name: "Medicine Test User",
    email: "medicine-test@example.com",
    password: "password123"
};

// Connect to MongoDB before tests
test.before(async () => {
    await connectDB();
});

// Close MongoDB connection after tests
test.after(async () => {
    await mongoose.connection.close();
});

// Delete test data before each test
test.beforeEach(async () => {

    // Find the test user first
    const user = await User.findOne({
        email: testUser.email
    });

    // Delete medicines belonging to the test user
    if (user) {
        await Medicine.deleteMany({
            userId: user._id
        });
    }

    // Delete the test user
    await User.deleteOne({
        email: testUser.email
    });
});

// Helper function to register and login
const getAuthToken = async () => {

    // Register test user
    await request(app)
        .post("/api/auth/register")
        .send(testUser);

    // Login test user
    const loginResponse = await request(app)
        .post("/api/auth/login")
        .send({
            email: testUser.email,
            password: testUser.password
        });

    // Return JWT token
    return loginResponse.body.data.token;
};

// Test getting medicines without authentication
test("GET /api/medicines - should reject unauthenticated request", async () => {

    const response = await request(app)
        .get("/api/medicines");

    assert.strictEqual(response.statusCode, 401);
});

// Test creating a medicine
test("POST /api/medicines - should create a medicine", async () => {

    const token = await getAuthToken();

    const response = await request(app)
        .post("/api/medicines")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "Panadol",
            dosage: "500mg",
            type: "tablet",
            activeIngredient: "Paracetamol",
            description: "Pain relief medicine"
        });

    assert.strictEqual(response.statusCode, 201);

    assert.ok(response.body.data.medicine);

    assert.strictEqual(
        response.body.data.medicine.name,
        "Panadol"
    );

    assert.strictEqual(
        response.body.data.medicine.dosage,
        "500mg"
    );
});

// Test getting medicines
test("GET /api/medicines - should return user's medicines", async () => {

    const token = await getAuthToken();

    // Create medicine
    await request(app)
        .post("/api/medicines")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "Panadol",
            dosage: "500mg",
            type: "tablet",
            activeIngredient: "Paracetamol"
        });

    // Get medicines
    const response = await request(app)
        .get("/api/medicines")
        .set("Authorization", `Bearer ${token}`);

    assert.strictEqual(response.statusCode, 200);

    assert.ok(response.body.data.medicines);

    assert.strictEqual(
        response.body.data.medicines.length,
        1
    );

    assert.strictEqual(
        response.body.data.medicines[0].name,
        "Panadol"
    );
});

// Test getting medicine by ID
test("GET /api/medicines/:id - should return medicine", async () => {

    const token = await getAuthToken();

    // Create medicine
    const createResponse = await request(app)
        .post("/api/medicines")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "Panadol",
            dosage: "500mg",
            type: "tablet",
            activeIngredient: "Paracetamol"
        });

    const medicineId =
        createResponse.body.data.medicine._id;

    // Get medicine by ID
    const response = await request(app)
        .get(`/api/medicines/${medicineId}`)
        .set("Authorization", `Bearer ${token}`);

    assert.strictEqual(response.statusCode, 200);

    assert.strictEqual(
        response.body.data.medicine._id,
        medicineId
    );
});

// Test updating medicine
test("PUT /api/medicines/:id - should update medicine", async () => {

    const token = await getAuthToken();

    // Create medicine
    const createResponse = await request(app)
        .post("/api/medicines")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "Panadol",
            dosage: "500mg",
            type: "tablet",
            activeIngredient: "Paracetamol"
        });

    const medicineId =
        createResponse.body.data.medicine._id;

    // Update medicine
    const response = await request(app)
        .put(`/api/medicines/${medicineId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "Panadol Extra",
            dosage: "650mg",
            type: "tablet",
            activeIngredient: "Paracetamol"
        });

    assert.strictEqual(response.statusCode, 200);

    assert.strictEqual(
        response.body.data.medicine.name,
        "Panadol Extra"
    );

    assert.strictEqual(
        response.body.data.medicine.dosage,
        "650mg"
    );
});

// Test deleting medicine
test("DELETE /api/medicines/:id - should delete medicine", async () => {

    const token = await getAuthToken();

    // Create medicine
    const createResponse = await request(app)
        .post("/api/medicines")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "Panadol",
            dosage: "500mg",
            type: "tablet",
            activeIngredient: "Paracetamol"
        });

    const medicineId =
        createResponse.body.data.medicine._id;

    // Delete medicine
    const response = await request(app)
        .delete(`/api/medicines/${medicineId}`)
        .set("Authorization", `Bearer ${token}`);

    assert.strictEqual(response.statusCode, 200);

    // Make sure medicine was really deleted
    const deletedMedicine = await Medicine.findById(medicineId);

    assert.strictEqual(deletedMedicine, null);
});