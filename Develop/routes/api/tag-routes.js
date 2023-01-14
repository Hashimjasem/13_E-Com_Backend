const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tags = await Tag.findAll({
    include: [
      {
        model: Product
      }
    ]
  })

  res.json(tags);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tags = await Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product,
      }
    ]
  })

  res.json(tags);
});

router.post ('/', async (req, res) => {
  const tags = await Tag.create(req.body)
    .then((newProductTags) => {
      res.json(newProductTags);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tags = await Tag.findByPk(req.params.id)
  const updated = await tags.update({
    name: req.body.name
  })

  res.json(updated)
});

router.delete('/:id', async (req, res) => {
  // delete a Product by its `id` value
  const deleted = await Tag.destroy({
    where: {
      id: req.params.id
    }
  });

  res.json(deleted)
});

module.exports = router;
