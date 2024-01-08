var express = require("express");
const { model } = require("mongoose");
const { use } = require(".");
var router = express.Router();
var responseData = require("../helper/responseData");
var modelProduct = require("../controllers/product");

router.get("/", async function (req, res, next) {
  console.log(req.query);
  var productAll = await modelProduct.getall(req.query);
  responseData.responseReturn(res, 200, true, productAll);
});
router.get("/:id", async function (req, res, next) {
  // get by ID
  try {
    var product = await modelProduct.getOne(req.params.id);
    responseData.responseReturn(res, 200, true, product);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay product");
  }
});
router.post("/add", async function (req, res, next) {
  const newProduct = await modelProduct.createProduct({
    name: req.body.name,
    price: req.body.price,
    isDelete: req.body.isDelete,
    order: req.body.order,
  });
  responseData.responseReturn(res, 200, true, newProduct);
});
router.put("/edit/:id", async function (req, res, next) {
  try {
    console.log(req.params.id, req.body);
    var product = await modelProduct.findByIdAndUpdate(req.params.id, req.body);

    responseData.responseReturn(res, 200, true, product);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay product");
  }
});
router.delete("/delete/:id", function (req, res, next) {
  //delete by Id
  try {
    var product = modelProduct.findByIdAndDelete(req.params.id);
    responseData.responseReturn(res, 200, true, "xoa thanh cong");
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay product");
  }
});

module.exports = router;
