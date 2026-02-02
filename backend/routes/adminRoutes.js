const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");
const adminController = require("../controllers/adminController");

router.get("/stats", auth, isAdmin, adminController.getStats);
router.get("/users", auth, isAdmin, adminController.getAllUsers);
router.get("/problems", auth, isAdmin, adminController.getAllProblems);
router.delete(
  "/problem/:id",
  auth,
  isAdmin,
  adminController.deleteProblem
);

module.exports = router;
