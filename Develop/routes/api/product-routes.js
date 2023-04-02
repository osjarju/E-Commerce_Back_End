const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


// GET ALL PRODUCTS
router.get('/', (req, res) => {
  Product.findAll({
    include: {
      model: Category,
      attributes: ['id', 'category_name']
    }
  })
    .then(productData => res.json(productData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//GET PRODUCT BY ID
router.get('/:id', (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Category,
      attributes: ['id', 'category_name']
    }
  })
    .then(productData => res.json(productData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//POST PRODUCT
router.post('/', (req, res) => {
  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    tagIds: req.body.tagIds,
    category_id: req.body.category_id

  })
    .then(productData =>
      res.json(productData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UPDATE PRODUCT
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    }
  })
    .then((productData) => {
      if (!productData) {
        res.status(404).json({
          message: 'No product found with this ID'
        });
        return;
      }
      res.json(productData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//DELETE PRODUCT
router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(productData => {
      if (!productData) {
        res.status(404).json({
          message: 'No category matches ID'
        });
        return;
      }
      res.json(productData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
