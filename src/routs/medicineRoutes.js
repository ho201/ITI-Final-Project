const express = require("express");

const {
  protect,
  upload
} = require("../middlewares");

const medicineValidation = require("../validations/medicineValidation");

const {
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine
} = require("../controllers/mediController");

const validateSchema = require("../middlewares/validateSchema");

const router = express.Router();

router.get("/", protect, getMedicines);

router.get("/:id", protect, getMedicineById);

router.post(
  "/",
  protect,
  upload.single("image"),
  validateSchema(medicineValidation),
  createMedicine
);

router.put(
  "/:id",
  protect,
  upload.single("image"),
  validateSchema(medicineValidation),
  updateMedicine
);

router.delete("/:id", protect, deleteMedicine);

module.exports = router;