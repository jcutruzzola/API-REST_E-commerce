const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller.js")
const controller = new ProductController();

//Methods

router.get("/", controller.getProductsPaginate);
// router.get("/paginate", controller.getProductsPaginate);
router.get("/:pid", controller.getProductById);
router.post("/", controller.createProduct);
router.put("/:pid", controller.updateProduct);
router.delete("/:pid", controller.deleteProduct);


module.exports = router;
