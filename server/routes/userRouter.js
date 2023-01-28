const Router = require("express");
const userController = require("../controllers/userController");
const router = new Router();
const UserController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.get("/auth", authMiddleware, UserController.check);
router.delete("/delete", checkRole("ADMIN"), UserController.destroy);
router.put("/update", checkRole("ADMIN"), UserController.uppdate);
module.exports = router;
