const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: ({ model: Product })
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
      include: ({ model: Product })
    });
    if(!oneTag) {
      res.status(404).json({message: "No Tag found."});
    }
    res.status(200).json(oneTag);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try{
    const updateTag = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      
    });
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // update a tag's name by its `id` value

router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(deleteTag)
  } catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
