const express = require("express");

const {
  protect,
  handleValidationErrors,
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

const router = express.Router();

router.get("/", protect, getMedicines);

router.get("/:id", protect, getMedicineById);

router.post(
  "/",
  protect,
  upload.single("image"),
  medicineValidation,
  handleValidationErrors,
  createMedicine);

router.put(
  "/:id",
   protect,
   upload.single("image"),
   medicineValidation,
   handleValidationErrors,
    updateMedicine);

router.delete("/:id", protect, deleteMedicine);

module.exports = router;