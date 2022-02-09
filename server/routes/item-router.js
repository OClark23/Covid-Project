const express = require('express');

const ItemController = require('../controllers/item-controller');

const router = express.Router();

router.get('/items', ItemController.getItems);
router.get('/item/:id', ItemController.getItemById);
router.post('/item', ItemController.createItem);
router.put('/item/:id', ItemController.updateItem);
router.delete('/item/:id', ItemController.deleteItem);

const app = express();

app.listen(process.env.PORT || 3001, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});

module.exports = router;
