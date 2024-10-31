const express = require("express");
const router = express.Router();

const { userController } = require("../controllers/user");
const auth = require("../middleware/auth");

// user routes for public
router.post("/register", userController.register);
router.post("/login", userController.login);

// user routes for authenticated
router.get("/profile", auth, userController.getProfile);
router.put("/profile", auth, userController.updateProfile);
router.get("/stats", auth, userController.getUserStats);

module.exports = router;
