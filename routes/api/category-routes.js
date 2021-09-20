const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//CODED - FUNCTIONAL
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CODED - FUNCTIONAL
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // JOIN with products
      include: [{ model: Product }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


//Create a new category
// }
// "category_name" : "newCategory"
// }
//CODED - NOT TESTED
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update a category by its ID
// }
// "category_name" : "updatedCategoryName"
// }
//CODED - NOT TESTED
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id
        }
      });
      res.status(200).json(categoryData);    
  } catch (err) {
    res.status(400).json(err);
  };  
});

//Delete a category by its ID
//CODED NOT TESTED
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }  
});

module.exports = router;