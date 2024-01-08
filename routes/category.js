var express = require("express");
const { model } = require("mongoose");
const { use } = require(".");
var router = express.Router();
var responseData = require("../helper/responseData");
var modelcategory = require("../controllers/category");

router.get("/", async function (req, res, next) {
  console.log(req.query);
  var categoryAll = await modelcategory.getall(req.query);
  responseData.responseReturn(res, 200, true, categoryAll);
});
router.get("/:id", async function (req, res, next) {
  // get by ID
  try {
    var category = await modelcategory.getOne(req.params.id);
    responseData.responseReturn(res, 200, true, category);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay category");
  }
});
router.post("/add", async function (req, res, next) {
  const newcategory = await modelcategory.createcategory({
    name: req.body.name,
    price: req.body.price,
    isDelete: req.body.isDelete,
    order: req.body.order,
  });
  responseData.responseReturn(res, 200, true, newcategory);
});
router.put("/edit/:id", async function (req, res, next) {
  try {
    console.log(req.params.id, req.body);
    var category = await modelcategory.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    responseData.responseReturn(res, 200, true, category);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay category");
  }
});
router.delete("/delete/:id", function (req, res, next) {
  //delete by Id
  try {
    var category = modelcategory.findByIdAndDelete(req.params.id);
    responseData.responseReturn(res, 200, true, "xoa thanh cong");
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay category");
  }
});

module.exports = router;
