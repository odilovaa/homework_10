const {Router} = require("express");
const {create, getall} = require("../controller/promocode");

const router = Router();

router.post("/promocode", create);
router.get("/promocode", getall);


module.exports = router;