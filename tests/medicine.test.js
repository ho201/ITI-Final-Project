const test = require("node:test");
const assert = require("node:assert");

test("Medicine name should exist", () => {
    const medicine = {
        name: "Panadol",
        dosage: "500mg"
    };

    assert.ok(medicine.name);
});

test("Medicine dosage should exist", () => {
    const medicine = {
        name: "Panadol",
        dosage: "500mg"
    };

    assert.ok(medicine.dosage);
});

