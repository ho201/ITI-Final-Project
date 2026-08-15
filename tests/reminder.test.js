const test = require("node:test");
const assert = require("node:assert");

const { createReminderSchema } =
    require("../src/validations/reminderValidation");

test("Valid reminder should pass", () => {
    const result = createReminderSchema.safeParse({
        medicineId: "507f1f77bcf86cd799439011",
        time: "08:00",
        dosageQuantity: "1 tablet",
        frequency: "Daily"
    });

    assert.strictEqual(result.success, true);
});

test("Invalid reminder should fail", () => {
    const result = createReminderSchema.safeParse({
        medicineId: "123",
        time: "08:00",
        dosageQuantity: "1 tablet",
        frequency: "Daily"
    });

    assert.strictEqual(result.success, false);
});

