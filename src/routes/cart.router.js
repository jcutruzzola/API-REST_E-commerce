
const { Router } = require("express")
const router = Router();

const CartController = require("../controllers/cart.controller.js")
const controller = new CartController();

//Routes
router.post("/", controller.newCart);
router.get("/:cid", controller.getCart);
router.post("/:cid/products/:pid", controller.addProducts);
router.delete("/:cid", controller.emptyCart);
router.delete("/:cid/product/:pid", controller.deleteProduct);
router.post("/:cid/purchase", controller.finishPurchase);


module.exports = router;
