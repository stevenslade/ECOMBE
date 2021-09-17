// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

Product.belongsTo(Category, {
  foreignKey: 'category_id', 
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Products belongToMany Tags (through ProductTag)
// Tags belongToMany Products (through ProductTag)

Product.belongsToMany(Tag, {
  through: "product_tag",
  as: "tag",
  foreignKey: "product_id",
});

Tag.belongsToMany(Product, {
  through: "product_tag",
  as: "product",
  foreignKey: "tag_id",
});



//This is how sequelize docs are doing this but the context is all wrong
// User.belongsToMany(Profile, { through: Grant });
// Profile.belongsToMany(User, { through: Grant });
// User.hasMany(Grant);
// Grant.belongsTo(User);
// Profile.hasMany(Grant);
// Grant.belongsTo(Profile);









module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
