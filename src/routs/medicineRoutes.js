const express = require("express");

const {
    createMedicine,
    getMedicines,
    getMedicineById,
    updateMedicine,
    deleteMedicine
} = require('../controllers/mediController');

const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/", protect, createMedicine);

router.put("/:id", protect, updateMedicine);

router.get("/", protect, getMedicines);

router.get("/:id", protect, getMedicineById);

router.delete("/:id", protect, deleteMedicine);

modules.exports = router;