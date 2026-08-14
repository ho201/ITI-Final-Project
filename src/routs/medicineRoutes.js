const express = require("express");
const upload = require("../middlewares/uploadMiddleware");

const {
    createMedicine,
    getMedicines,
    getMedicineById,
    updateMedicine,
    deleteMedicine
} = require('../controllers/mediController');

const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.put("/:id", protect, updateMedicine);

router.get("/", protect, getMedicines);

router.get("/:id", protect, getMedicineById);

router.delete("/:id", protect, deleteMedicine);

router.post("/", protect, upload.single("image"), createMedicine);
modules.exports = router;