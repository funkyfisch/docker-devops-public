const uuid = require('uuid/v4');

const db = require('./persistence');

// ...

const addItem = async (req, res) => {
  const item = {
      id: uuid(),
      name: req.body.name,
      completed: false,
  };

  await db.storeItem(item);
  res.send(item);
};

const deleteItem = async (req, res) => {
  await db.removeItem(req.params.id);
  res.sendStatus(200);
};

const getItems = async (req, res) => {
  const items = await db.getItems();
  res.send(items);
};

const updateItem = async (req, res) => {
  await db.updateItem(req.params.id, {
      name: req.body.name,
      completed: req.body.completed,
  });

  const item = await db.getItem(req.params.id);
  
  res.send(item);
};

// ...

module.exports = {
  addItem,
  deleteItem,
  getItems,
  updateItem
};
