const test = require("node:test");
const assert = require("node:assert");
const { validationResult } = require("express-validator");
const { validateRegister } = require("../src/validations/userValidation");

const runRules = async (body) => {
    const req = { body };
    await Promise.all(validateRegister.map((rule) => rule(req, {}, () => {})));
    return validationResult(req);
};

test("Valid user registration should pass", async () => {
    const errors = await runRules({
        name: "Test User",
        email: "test@example.com",
        password: "password123"
    });
    assert.strictEqual(errors.isEmpty(), true);
});

test("Invalid user registration should fail", async () => {
    const errors = await runRules({
        name: "",
        email: "invalid-email",
        password: "123"
    });
    assert.strictEqual(errors.isEmpty(), false);
});