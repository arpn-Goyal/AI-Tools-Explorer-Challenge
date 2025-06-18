const tools = require('../data/tools');

const getAllTools = (req, res) => {
  const category = req.query.category;
  
  if (category) {
    const filtered = tools.filter(tool => 
      tool.category.toLowerCase() === category.toLowerCase()
    );
    return res.json(filtered);
  }
  res.json(tools);
};

module.exports = { getAllTools };
