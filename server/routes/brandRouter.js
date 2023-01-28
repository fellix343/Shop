const Router = require("express");
const router = new Router();
const brandController = require("../controllers/brandController.js");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", brandController.create);
router.get("/all", brandController.getAll);
router.delete("dell", checkRole("ADMIN"), brandController.destroy);
router.delete("/change", checkRole("ADMIN"), brandController.chengeName);

module.exports = router;
