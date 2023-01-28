const Router = require("express");
const router = new Router();
const deviceController = require("../controllers/deviceController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/create", deviceController.create);
router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne);
router.delete("/dell", checkRole("ADMIN"), deviceController.destroy);
router.put("/chenge", checkRole("ADMIN"), deviceController.chengeName);

module.exports = router;
