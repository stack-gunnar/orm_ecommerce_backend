const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include : [{ model: Product }],
  });
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  try{
    const oneCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!oneCategory) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory =  await Category.create({
      category_name : req.body.category_name
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});
  

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update({
      category_name: req.body.category_name
    },
    {  
      where: {
        id: req.params.id,
      },
    });
    if (!updateCategory[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCatById = await Category.destroy({
      where: {
        id: req.params.id
      },
    });
    res.status(200).json(deleteCatById)
  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
