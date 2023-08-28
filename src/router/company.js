const {Router} = require("express");
const {create, getall, getbyid} = require("../controller/company");
const { isAdmin, isAuth } = require("../middleware/login");
const router = Router()

router.post("/company", create);
router.get("/company", getall);
router.get("/company/:id", getbyid)

module.exports = router;