const express = require('express');
const cors = require('cors');
const PORT = 5000;

const toolsRouter = require('./routes/tools');
const favRouter = require('./routes/favorites');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', toolsRouter);
app.use('/api', favRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});