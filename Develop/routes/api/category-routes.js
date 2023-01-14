const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Category');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categories = await Category.findAll({
    include: [
      {
        model: Product,
      }
    ]
  })

  res.json(categories);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categories = await Category.findByPk(req.params.id, {
    include: [
      {
        model: Product,
      }
    ]
  })

  res.json(categories);
});



router.post('/', async (req, res) => {
  // create a new category
  const created = await Category.create({
    name:  req.body.name,
  })

  res.json(created);
});

router.put('/:id', async (req, res) => {
  // update category
  const category = await Category.findByPk(req.params.id);

  const updated = await category.update({
    name: req.body.name
  });

  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const deleted = await Category.destroy({
    where: {
      id: req.params.id
    }
  });

  res.json(deleted)
});

module.exports = router;
