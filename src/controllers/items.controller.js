// In-memory data store for demonstration
let items = [
  { id: 1, title: 'Learn Express.js', description: 'Understand routes, middleware, and controllers', completed: true },
  { id: 2, title: 'Build a REST API', description: 'Create CRUD endpoints with JSON responses', completed: false }
];

export const getItems = (req, res) => {
  res.json({
    success: true,
    data: items,
    total: items.length
  });
};

export const getItemById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: `Item with id ${id} not found`
    });
  }

  res.json({
    success: true,
    data: item
  });
};

export const createItem = (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Title is required'
    });
  }

  const newItem = {
    id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
    title,
    description: description || '',
    completed: false,
    createdAt: new Date().toISOString()
  };

  items.push(newItem);

  res.status(201).json({
    success: true,
    message: 'Item created successfully',
    data: newItem
  });
};

export const updateItem = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const itemIndex = items.findIndex((i) => i.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Item with id ${id} not found`
    });
  }

  const { title, description, completed } = req.body;

  items[itemIndex] = {
    ...items[itemIndex],
    ...(title !== undefined && { title }),
    ...(description !== undefined && { description }),
    ...(completed !== undefined && { completed }),
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    message: 'Item updated successfully',
    data: items[itemIndex]
  });
};

export const deleteItem = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const itemIndex = items.findIndex((i) => i.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Item with id ${id} not found`
    });
  }

  const deletedItem = items.splice(itemIndex, 1)[0];

  res.json({
    success: true,
    message: 'Item deleted successfully',
    data: deletedItem
  });
};

