const category = require("../schema/category");
var Schemacategory = require("../schema/category");

module.exports = {
  getall: function (query) {
    var sort = {};
    var Search = {};
    if (query.sort) {
      if (query.sort[0] == "-") {
        sort[query.sort.substring(1)] = "desc";
      } else {
        sort[query.sort] = "asc";
      }
    }
    if (query.key) {
      Search.name = new RegExp(query.key, "i");
    }
    Search.isDelete = false;
    var limit = parseInt(query.limit) || 2;
    var page = parseInt(query.page) || 1;
    var skip = (page - 1) * limit;
    return Schemacategory.find(Search)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .exec();
  },
  getOne: function (id) {
    return Schemacategory.findById(id);
  },
  getByName: function (name) {
    return Schemacategory.findOne({}).exec();
  },
  createcategory: function (category) {
    return new Schemacategory(category).save();
  },
  findByIdAndUpdate: function (id, category) {
    return Schemacategory.findById(id).updateOne(category);
  },
  findByIdAndDelete: function (id) {
    return Schemacategory.findByIdAndUpdate(id, { isDelete: true }).exec();
  },
};
