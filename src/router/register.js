const {Router} = require("express");
const {create, getall} = require("../controller/register");
const { isAdmin, isAuth } = require("../middleware/login");
const router = Router()

router.post("/register", isAdmin, create);
router.get("/register", isAuth, getall);

module.exports = router;