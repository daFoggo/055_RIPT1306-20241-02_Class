const express = require("express");
const router = express.Router();

const { userController } = require("../controllers/user");
const auth = require("../middleware/auth");

// special route for verifying token
router.get("/verify-token", auth, (req, res) => {
  // middleware check if there is token
  res.json({
    valid: true,
    user: req.user,
  });
});

// user routes for public
router.post("/auth/register", userController.register);
router.post("/auth/login", userController.login);

// user routes for authenticated
router.get("/profile", auth, userController.getProfile);
router.put("/profile", auth, userController.updateProfile);
router.get("/stats", auth, userController.getUserStats);

module.exports = router;
